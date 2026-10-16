import test from 'node:test'
import assert from 'node:assert/strict'
import { quizQuestions } from '../src/data/quiz.js'
import { secondTermLabs } from '../src/data/laboratories.js'
import { scoreQuiz } from '../src/lib/network.js'
test('banco de veinte preguntas: opciones únicas, respuesta válida y cobertura equilibrada', () => {
  assert.equal(quizQuestions.length, 20)
  assert.equal(new Set(quizQuestions.map(q => q.prompt)).size, 20)
  for (const q of quizQuestions) { assert.equal(new Set(q.options).size, 4); assert.ok(q.answer >= 0 && q.answer < 4); assert.ok(q.explanation.length > 40) }
  assert.deepEqual(Object.fromEntries(['Concepto', 'Aplicación', 'Razonamiento'].map(level => [level, quizQuestions.filter(q => q.level === level).length])), { Concepto: 7, Aplicación: 7, Razonamiento: 6 })
  for (let answer = 0; answer < 4; answer++) assert.equal(quizQuestions.filter(q => q.answer === answer).length, 5)
  assert.equal(scoreQuiz(quizQuestions, quizQuestions.map(q => q.answer)).percent, 100)
  assert.equal(scoreQuiz(quizQuestions, quizQuestions.map(q => (q.answer + 1) % 4)).correct, 0)
  assert.equal(scoreQuiz(quizQuestions, quizQuestions.map((q, i) => i < 13 ? q.answer : (q.answer + 1) % 4)).percent, 65)
})
test('cuatro guías completas no afirman evidencia inexistente y separan direccionamientos', () => {
  assert.equal(secondTermLabs.length, 4)
  for (const lab of secondTermLabs) {
    for (const key of ['context', 'objective', 'source', 'topology', 'explanation']) assert.ok(lab[key].length > 20)
    for (const key of ['equipment', 'addresses', 'steps', 'commands', 'expected', 'pending']) assert.ok(lab[key].length)
    assert.deepEqual(lab.evidence, [])
  }
  assert.equal(secondTermLabs[0].addresses[0][1], '192.168.10.10')
  assert.equal(secondTermLabs[1].addresses[0][1], '192.168.10.1')
})
