#!/bin/bash
npm run i
composer install
php json.php
npm run start
php -S localhost:3001