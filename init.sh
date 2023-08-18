#!/bin/bash
php json.php
nohup php -S localhost:3001 &
npm run build &
nohup serve -s build -l 3000