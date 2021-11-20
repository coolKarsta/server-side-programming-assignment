/* eslint-disable no-undef */

const request = require('supertest');
const app = require('./app');
const fs = require('fs');

describe('client comment posting', () => {
    test('POST /comments', () => {
        return request(app)
            .post ('/comments')
            .set('Content-type', 'multipart/form-data')
            .field('username', 'Mingyue')
            .field('usercomment','ok')
            .expect(200);
    });

    test('GET /comments status code', () => {
        return request(app)
            .get('/comments')
            .expect(200);
    });

    test('GET /comments content type', () => {
        return request(app)
            .get('/comments')
            .expect('Content-type', /json/);
    });

    test('GET /comments transported data', () => {
        return request(app)
            .get('/comments')
            .expect(/Mingyue/)
            .expect(/ok/);
    });
});

describe('client ideas posting', () => {
    test('POST /ideas', () => {
        return request(app)
            .post ('/upload')
            .set('Content-type', 'multipart/form-data')
            .field('cityname', 'Middlesbrough')
            .field('citysummary','my boyfriend\'s hometown')
            .field('attractions','my boyfriend\'s house')
            .attach('photo',fs.readFileSync('cities/Beijing.jpeg'),'Beijing.jpeg')
            .expect(200);
    });

    test('GET /ideas status code', () => {
        return request(app)
            .get('/ideas')
            .expect(200);
    });

    test('GET /ideas content type', () => {
        return request(app)
            .get('/ideas')
            .expect('Content-type', /json/);
    });

    test('GET /ideas transported data', () => {
        return request(app)
            .get('/ideas')
            .expect(/Middlesbrough/)
            .expect(/my boyfriend's hometown/);
    });
});