"use strict";

const staticCacheName = 'restaurant-reviews-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/restaurant.html',
  'css/styles.css',
  'data/restaurants.json',
  'favicon.ico',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'js/sw_register.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  'https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/8.10.0/lazyload.min.js'
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
        return cache.addAll(urlsToCache);
      }).catch(function(err) {
          console.log(err);
      })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request).then(function (response) {
        return caches.open(staticCacheName).then(function (cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(function (err) {
        throw err;
      });
    })
  );
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-reviews-') && cacheName != staticCacheName;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
