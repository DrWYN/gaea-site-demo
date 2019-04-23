import * as React from 'react';

export default (size: number) => (
  <svg viewBox="0 0 1024 1024" width={size} height={size}>
    <path d="M825.606018 647.538283 819.263571 660.258455 827.207981 672.04471 905.327294 787.941807 908.52362 756.858321 769.540324 892.373873 799.04025 888.884996 671.47766 812.883319 660.919793 806.592954 649.583401 811.338837C641.524386 814.712674 633.321491 817.795042 625.041941 820.560337L611.811631 824.979142 608.915804 838.623962 580.996546 970.176486 604.846304 950.857143 408.272431 950.857141 431.938677 969.378097 397.841517 831.672939 394.800523 819.391548 383.007648 814.808062C375.650317 811.948518 368.359849 808.829278 361.19018 805.473457L349.017562 799.775966 337.701214 807.026784 217.88134 883.799985 248.055031 886.871665 109.071736 751.363721 112.710251 781.768288 190.651237 657.409417 197.546671 646.407394 192.26576 634.545545C188.597667 626.306366 185.255827 617.89434 182.266902 609.377882L177.674889 596.293685 164.082002 593.552105 29.201333 566.347718 48.761905 590.247401 48.761905 398.59747 29.96636 422.330022 171.221091 389.086012 183.450436 386.207861 188.204044 374.578423C191.634415 366.18621 195.421037 357.903851 199.530538 349.803328L205.959792 337.130182 198.101254 325.29011 124.686421 214.679584 121.526273 245.488151 259.687038 108.701216 229.912147 112.235203 352.693357 186.524314 363.287226 192.934163 374.712497 188.161388C381.330477 185.396804 388.053308 182.826231 394.835279 180.46681L407.314641 176.12529 410.490432 163.299629 443.437389 30.241004 419.771153 48.761905 616.327194 48.761905 592.477417 29.442474 621.325088 165.37204 624.105103 178.471403 636.651202 183.152979C646.841886 186.955632 656.865493 191.232395 666.627682 195.943104L678.796045 201.814904 690.225485 194.609697 803.674639 123.090468 773.791902 120.057533 914.162801 254.754833 910.479401 224.06547 834.210227 343.81367 827.217813 354.792273 832.449542 366.710857C836.047972 374.908567 839.325363 383.281107 842.252943 391.75287L846.63933 404.446089 859.712006 407.52234 994.034289 439.130935 975.238095 415.398229 975.238095 607.04816 994.798163 583.14858 852.982818 611.75475 840.250379 614.323063 835.279123 626.322974C832.31875 633.468898 829.086927 640.557101 825.606018 647.538283ZM857.803703 635.65433 862.624587 659.553909 1004.439932 630.94774 1024 627.002195 1024 607.04816 1024 415.398229 1024 396.088627 1005.203806 391.665525 870.881523 360.056928 865.296766 383.789634 888.340587 375.826398C884.98377 366.112521 881.22675 356.514699 877.099219 347.111631L854.774381 356.911245 875.338534 370.008819 951.607706 250.260619 962.34231 233.406505 947.924307 219.571255 807.553406 84.873956 793.797813 71.674344 777.670669 81.841021 664.221513 153.36025 677.223499 173.984973 687.819315 152.026842C676.702449 146.662439 665.295885 141.79561 653.698526 137.468057L645.174865 160.310518 669.02464 155.248996 640.176969 19.31943 636.0769 0 616.327194 0 419.771153 0 400.690923 0 396.104919 18.520901 363.157965 151.579527 386.824198 157.439578 378.813118 134.412346C371.096704 137.096855 363.448934 140.021092 355.916838 143.167538L365.314667 165.664463 377.935979 144.804613 255.154767 70.515502 238.88953 60.674174 225.379878 74.049489 87.219113 210.836425 72.972426 224.941449 84.058966 241.644992 157.473798 352.255518 177.787526 338.772813 156.044514 327.742298C151.336434 337.02272 146.99905 346.509743 143.067323 356.128497L165.635683 365.353459 160.050276 341.620907 18.795545 374.864917 0 379.28841 0 398.59747 0 590.247401 0 610.201867 19.560572 614.147083 154.441241 641.351467 159.261622 617.451787 136.256342 625.52569C139.682853 635.288979 143.513008 644.930182 147.71909 654.377779L169.992425 644.461662 149.333613 631.513907 71.392628 755.872779 60.94464 772.543085 75.031143 786.277348 214.014438 921.785293 227.881289 935.305393 244.18813 924.856971 364.008004 848.08377 350.854609 827.555277 340.519036 849.637097C348.675428 853.454763 356.968563 857.002997 365.342891 860.257811L374.17527 837.532937 350.509022 843.392932 384.606182 981.098091 389.192156 999.619046 408.272431 999.619046 604.846304 999.619049 624.595936 999.619049 628.696062 980.299706 656.615319 848.747183 632.765562 843.685572 640.489184 866.810807C649.912247 863.663588 659.243565 860.157199 668.413638 856.318227L658.998519 833.828531 646.519381 854.773745 774.081971 930.775422 790.172006 940.36185 803.581897 927.286545 942.565193 791.770995 957.136469 777.563281 945.761519 760.687509 867.642208 644.790413 847.425094 658.417562 869.244171 669.296841C873.230259 661.302494 876.932843 653.181798 880.328282 644.985685L857.803703 635.65433ZM731.428572 499.809523C731.428572 385.355085 638.644915 292.571428 524.190477 292.571428 409.736036 292.571428 316.952382 385.355085 316.952382 499.809523 316.952382 614.263964 409.736036 707.047618 524.190477 707.047618 553.504879 707.047618 582.005801 700.942889 608.253005 689.28262 620.558583 683.815889 626.102566 669.408589 620.635836 657.10301 615.169107 644.797434 600.761807 639.253451 588.456228 644.720179 568.411953 653.624811 546.651767 658.285715 524.190477 658.285715 436.666494 658.285715 365.714285 587.333506 365.714285 499.809523 365.714285 412.28554 436.666494 341.333333 524.190477 341.333333 611.71446 341.333333 682.666667 412.28554 682.666667 499.809523 682.666667 511.374255 681.431994 522.7624 679.007782 533.847245 676.130985 547.001574 684.462569 559.997374 697.616898 562.874172 710.77123 565.75097 723.767027 557.419386 726.643825 544.265056 729.815238 529.763582 731.428572 514.882835 731.428572 499.809523Z" />
  </svg>
);
