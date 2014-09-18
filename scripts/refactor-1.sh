#!/bin/bash
grasp -e '$a = $b ? $c : $d;' -R 'if({{b}}){ {{a}}={{c}}; } else { {{a}}={{d}}; }' -i controller.min.1.3.60.js
