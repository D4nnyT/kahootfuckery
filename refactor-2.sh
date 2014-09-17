#!/bin/bash
grasp -e 'if($a1) { $a2; } else { if($b1) { $b2; } else { $c1; } }' -R 'if({{a1}}){ {{a2}} } else if({{b1}}) { {{b2}} } else { {{c1}} }' -i controller.min.1.3.60.js
js-beautify -rt controller.min.1.3.60.js
