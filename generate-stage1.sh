#!/bin/bash

echo "curl -v https://kahoot.it/" > stage1.txt
echo "" >> stage1.txt
curl -v https://kahoot.it/ &>> stage1.txt
