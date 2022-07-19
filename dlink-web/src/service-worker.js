/*
 *
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */


/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
/* globals workbox */
workbox.core.setCacheNameDetails({
  prefix: 'antd-pro',
  suffix: 'v5',
});
// Control all opened tabs ASAP
workbox.clientsClaim();

/**
 * Use precaching list generated by workbox in build process.
 * https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.precaching
 */
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

/**
 * Register a navigation route.
 * https://developers.google.com/web/tools/workbox/modules/workbox-routing#how_to_register_a_navigation_route
 */
workbox.routing.registerNavigationRoute('/index.html');

/**
 * Use runtime cache:
 * https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.routing#.registerRoute
 *
 * Workbox provides all common caching strategies including CacheFirst, NetworkFirst etc.
 * https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.strategies
 */

/** Handle API requests */
workbox.routing.registerRoute(/\/api\//, workbox.strategies.networkFirst());

/** Handle third party requests */
workbox.routing.registerRoute(
  /^https:\/\/gw\.alipayobjects\.com\//,
  workbox.strategies.networkFirst(),
);
workbox.routing.registerRoute(
  /^https:\/\/cdnjs\.cloudflare\.com\//,
  workbox.strategies.networkFirst(),
);
workbox.routing.registerRoute(/\/color.less/, workbox.strategies.networkFirst());

/** Response to client after skipping waiting with MessageChannel */
addEventListener('message', (event) => {
  const replyPort = event.ports[0];
  const message = event.data;
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => {
          replyPort.postMessage({
            error: null,
          });
        },
        (error) => {
          replyPort.postMessage({
            error,
          });
        },
      ),
    );
  }
});
