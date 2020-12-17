#!/bin/sh
cd /Users/wanghaoyu/Desktop/nodejs/blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log