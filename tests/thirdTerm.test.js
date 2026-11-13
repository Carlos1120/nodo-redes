import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateSubnet, shortenIpv6, selectRoute } from '../src/lib/thirdTerm.js'

test('calcula el ejemplo /26 y cambia de bloque al variar el prefijo', () => {
  assert.deepEqual(calculateSubnet('192.168.10.75', 26), {
    mask: '255.255.255.192', wildcard: '0.0.0.63', network: '192.168.10.64',
    broadcast: '192.168.10.127', first: '192.168.10.65', last: '192.168.10.126',
    hosts: 62, block: 64, binary: '11000000.10101000.00001010.01001011',
  })
  assert.equal(calculateSubnet('192.168.10.75', 27).network, '192.168.10.64')
  assert.equal(calculateSubnet('192.168.10.75', 27).broadcast, '192.168.10.95')
  assert.equal(calculateSubnet('192.168.10.256', 26), null)
})

test('abrevia IPv6 y escoge la ruta más específica', () => {
  assert.equal(shortenIpv6('2001:0DB8:ACAD:0010:0000:0000:0000:0001'), '2001:DB8:ACAD:10::1')
  assert.equal(shortenIpv6('0000:0000:0000:0000:0000:0000:0000:0001'), '::1')
  assert.equal(shortenIpv6('2001:bad'), null)
  const routes = [{ network: '0.0.0.0/0', via: 'default' }, { network: '192.168.20.0/24', via: 'R2' }]
  assert.equal(selectRoute('192.168.20.10', routes).via, 'R2')
  assert.equal(selectRoute('8.8.8.8', routes).via, 'default')
})
