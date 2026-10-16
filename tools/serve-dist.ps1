param([switch]$NoOpen)

$ErrorActionPreference = 'Stop'

$siteRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\dist'))
if (-not (Test-Path -LiteralPath (Join-Path $siteRoot 'index.html') -PathType Leaf)) {
    throw 'No se encontro dist\index.html.'
}

$port = 4173
while ($port -lt 4200) {
    try {
        $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)
        $listener.Start()
        break
    } catch {
        $port++
    }
}

if (-not $listener.Server.IsBound) {
    throw 'No se encontro un puerto local disponible.'
}

$url = "http://127.0.0.1:$port/#/inicio"
Write-Host " Sitio disponible en: $url" -ForegroundColor Cyan
Write-Host ' Presiona Ctrl+C para cerrar.' -ForegroundColor DarkGray
if (-not $NoOpen) { Start-Process $url }

$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'
    '.js'   = 'text/javascript; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
    '.webp' = 'image/webp'
    '.woff' = 'font/woff'
    '.woff2'= 'font/woff2'
}

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        try {
            $stream = $client.GetStream()
            $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
            $requestLine = $reader.ReadLine()
            while ($reader.ReadLine()) { }

            if (-not $requestLine) { continue }
            $requestTarget = ($requestLine -split ' ')[1]
            $requestPath = [System.Uri]::UnescapeDataString(($requestTarget -split '\?')[0])
            if ($requestPath -eq '/') { $requestPath = '/index.html' }

            $relativePath = $requestPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
            $filePath = [System.IO.Path]::GetFullPath((Join-Path $siteRoot $relativePath))
            $insideRoot = $filePath.StartsWith($siteRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)

            if ($insideRoot -and (Test-Path -LiteralPath $filePath -PathType Leaf)) {
                $body = [System.IO.File]::ReadAllBytes($filePath)
                $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
                $contentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { 'application/octet-stream' }
                $status = '200 OK'
            } else {
                $body = [System.Text.Encoding]::UTF8.GetBytes('404 - Archivo no encontrado')
                $contentType = 'text/plain; charset=utf-8'
                $status = '404 Not Found'
            }

            $header = "HTTP/1.1 $status`r`nContent-Type: $contentType`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($body, 0, $body.Length)
            $stream.Flush()
        } catch {
            Write-Host " Solicitud omitida: $($_.Exception.Message)" -ForegroundColor DarkGray
        } finally {
            $client.Close()
        }
    }
} finally {
    $listener.Stop()
}
