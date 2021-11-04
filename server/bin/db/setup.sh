#!/bin/bash
mysql -root -123456 --default-character-set=utf8 <<EOF
create database order character set utf8;
use order
source init.sql; // 初始化 sql 建表 
EOF
cmd /k