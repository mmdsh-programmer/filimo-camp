var LEVELS = [
  { "ball_speed":50,
     "ball_number":60,
     "num_colors":4,
     "hero_pos":{"x":450,"y":270},
     "bg_image":"bg_game_1",
      "curve_point":[   {"x":-25.2,"y":262.4},{"x":24.8,"y":221.4},{"x":64.8,"y":191.4},{"x":105.1,"y":167.25},{"x":152.1,"y":144.4},{"x":181.65,"y":131},{"x":213.9,"y":118.45},
                        {"x":245.75,"y":106.5},{"x":277.65,"y":95.6},{"x":310.4,"y":85.35},{"x":343.3,"y":76.95},
                        {"x":376.85,"y":70.7},{"x":410.75,"y":66.55},{"x":444.85,"y":63.2},{"x":479.25,"y":60.85},{"x":513.35,"y":59.35},{"x":547.6,"y":59.85},
                        {"x":581.35,"y":63.2},{"x":614.9,"y":71.55},{"x":646.85,"y":82.35},{"x":677.05,"y":99.45},{"x":704.4,"y":118.95},
                            {"x":731.25,"y":141.3},{"x":753.1,"y":167.1},{"x":771,"y":196.1},{"x":782.3,"y":228.05},{"x":783.6,"y":262.1},{"x":769.4,"y":292.45},
                            {"x":738.8,"y":305.9},{"x":706.9,"y":295},{"x":687.1,"y":267.3},{"x":673.65,"y":236.3},{"x":657.7,"y":206.05},
                            {"x":640.1,"y":176.35},{"x":615.55,"y":152.45},{"x":587.05,"y":134.85},{"x":554.85,"y":121.4},{"x":521.2,"y":116.4},
                            {"x":487.65,"y":116.4},{"x":453.6,"y":122.3},{"x":420.2,"y":129},{"x":386.6,"y":135.7},{"x":353.05,"y":144.1},{"x":321.15,"y":155.2},
                            {"x":289.25,"y":167.45},{"x":258.7,"y":183.05},{"x":230.5,"y":201.7},{"x":203.5,"y":222.65},{"x":183.15,"y":250.25},{"x":171.2,"y":282.05},
                            {"x":167.2,"y":315.7},{"x":170.55,"y":349.9},{"x":178.45,"y":383.3},{"x":193.9,"y":413.7},{"x":215.05,"y":440.75},
                            {"x":242.25,"y":460.5},{"x":274.15,"y":472.25},{"x":307.85,"y":478.3},{"x":342.5,"y":481.5},{"x":374.35,"y":483.2},{"x":414.65,"y":484.2},
                            {"x":454.95,"y":484.2},{"x":488.55,"y":482.7},{"x":522.05,"y":479.85},{"x":557.35,"y":474.95},{"x":594.25,"y":467.9},	
                            {"x":627.9,"y":458.85},{"x":661.4,"y":446.8},{"x":688.3,"y":435.2},{"x":718.5,"y":416.75},{"x":735.3,"y":394.85},{"x":735.3,"y":366.35},
                            {"x":715.1,"y":347.9},{"x":689.95,"y":335.65},{"x":663.1,"y":335.65},{"x":636.2,"y":345.9},{"x":614.45,"y":360.15},
                            {"x":589.2,"y":378.6},{"x":559,"y":398.75},{"x":530.5,"y":412.5},{"x":503.6,"y":421.6},{"x":476.75,"y":426.65},{"x":448.2,"y":428.3},
                            {"x":416.3,"y":425.95},{"x":387.8,"y":420.9},{"x":360.95,"y":413.5},{"x":332.05,"y":402.25},{"x":303.8,"y":385.5},
                            {"x":283.35,"y":363.7},{"x":270.45,"y":335.15}
                        ] },

{ "ball_speed":40,
     "ball_number":80,
     "num_colors":5,
     "hero_pos":{"x":450,"y":280},
     "bg_image":"bg_game_2",
      "curve_point":[   {"x":271.65,"y":-62.1},
                        {"x":381.65,"y":-26.1},
                        {"x":464.35,"y":2.85},
                        {"x":547.1,"y":35.6},
                        {"x":583.25,"y":51.8},
                        {"x":617.75,"y":67.8},
                        {"x":650.5,"y":85.05},
                        {"x":679.8,"y":102.3},
                        {"x":709.1,"y":121.25},
                        {"x":734.95,"y":141.6},
                        {"x":765.45,"y":169.7},
                        {"x":790.6,"y":200.7},
                        {"x":804.75,"y":227.05},
                        {"x":809.9,"y":254.8},
                        {"x":803.55,"y":283.45},
                        {"x":788,"y":309.8},
                        {"x":766.3,"y":333.9},
                        {"x":740.3,"y":355.8},
                        {"x":711,"y":376.15},
                        {"x":676.5,"y":396.85},
                        {"x":646.85,"y":412.35},
                        {"x":615.85,"y":427},
                        {"x":577.95,"y":441.8},
                        {"x":545.2,"y":453},
                        {"x":505.55,"y":464.9},
                        {"x":469.35,"y":473.35},
                        {"x":424.55,"y":481.1},
                        {"x":378,"y":485.75},
                        {"x":326.3,"y":484.05},
                        {"x":286.65,"y":477.15},
                        {"x":251.7,"y":463.35},
                        {"x":218.95,"y":439.25},
                        {"x":193.6,"y":408.2},
                        {"x":178.1,"y":375.45},
                        {"x":167.9,"y":343.05},
                        {"x":162.25,"y":306.85},
                        {"x":161.55,"y":263.8},
                        {"x":165.7,"y":227.6},
                        {"x":173.6,"y":194.85},
                        {"x":185,"y":162.1},
                        {"x":203.25,"y":129.35},
                        {"x":223.95,"y":103},
                        {"x":248.05,"y":83.15},
                        {"x":275.65,"y":69.35},
                        {"x":308.4,"y":64.2},
                        {"x":341.15,"y":65.95},
                        {"x":373.9,"y":70.95},
                        {"x":403.15,"y":76.25},
                        {"x":453.15,"y":88.7},
                        {"x":501.4,"y":103.35},
                        {"x":541.05,"y":117.1},
                        {"x":608.25,"y":146.6},
                        {"x":656.35,"y":172.8},
                        {"x":700.1,"y":205.55},
                        {"x":722.35,"y":239.65},
                        {"x":717.55,"y":266.7},
                        {"x":701.35,"y":292.55},
                        {"x":673.75,"y":316.7},
                        {"x":640.85,"y":339.1},
                        {"x":609.8,"y":355.65},
                        {"x":539.15,"y":383.4},
                        {"x":485.75,"y":398.9},
                        {"x":435.75,"y":407.85},
                        {"x":382.3,"y":409.6},
                        {"x":354.75,"y":403.7},
                        {"x":327.15,"y":384.75},
                        {"x":311.65,"y":357.2},
                        {"x":303.05,"y":327.9},
                        {"x":299.6,"y":291.7},
                        {"x":302.85,"y":252.05},
                        {"x":309.6,"y":221.05},
                        {"x":321.65,"y":188.3},
                        {"x":340.6,"y":162.95},
                        {"x":361.3,"y":150.55},
                        {"x":385.4,"y":149.35},
                        {"x":416.45,"y":154.7},
                        {"x":456.75,"y":166.4},
                        {"x":503.5,"y":183.65},
                        {"x":556.9,"y":206.2}
        ] },

{"ball_speed":30,
     "ball_number":100,
     "num_colors":5,
     "hero_pos":{"x":500,"y":200},
     "bg_image":"bg_game_3",
    "curve_point":[  {"x":-88,"y":300.9},
                    {"x":-48,"y":266.9},
                    {"x":2,"y":229.9},
                    {"x":52,"y":193.9},
                    {"x":92,"y":168.9},
                    {"x":141.75,"y":135.95},
                    {"x":183.15,"y":114.2},
                    {"x":253.25,"y":88.25},
                    {"x":304.1,"y":75.65},
                    {"x":367.2,"y":63.9},
                    {"x":421.55,"y":58.95},
                    {"x":460.1,"y":58.95},
                    {"x":505.7,"y":59.65},
                    {"x":542.5,"y":62.65},
                    {"x":582.85,"y":68.8},
                    {"x":619.65,"y":77.05},
                    {"x":658.2,"y":88.95},
                    {"x":695.05,"y":104.75},
                    {"x":731.65,"y":125.75},
                    {"x":759.55,"y":149.25},
                    {"x":781.1,"y":175.55},
                    {"x":795.15,"y":203.4},
                    {"x":803,"y":236.75},
                    {"x":804.95,"y":271.8},
                    {"x":800.9,"y":305.1},
                    {"x":791.1,"y":338.05},
                    {"x":772.85,"y":368.4},
                    {"x":750.4,"y":394.85},
                    {"x":719.05,"y":419.75},
                    {"x":689.25,"y":437.8},
                    {"x":657.7,"y":451.3},
                    {"x":624.4,"y":462.15},
                    {"x":592.3,"y":469.55},
                    {"x":560.55,"y":475.3},
                    {"x":523.75,"y":478.8},
                    {"x":490.45,"y":480.25},
                    {"x":453.65,"y":479.9},
                    {"x":414,"y":476.55},
                    {"x":380.7,"y":471.8},
                    {"x":347.4,"y":465.5},
                    {"x":312.35,"y":455.85},
                    {"x":279.05,"y":443.75},
                    {"x":249.05,"y":428.5},
                    {"x":212.25,"y":402.2},
                    {"x":184.2,"y":368.9},
                    {"x":167.2,"y":337.35},
                    {"x":159.15,"y":302.3},
                    {"x":158.6,"y":268.45},
                    {"x":167.55,"y":240.4},
                    {"x":193.85,"y":222.35},
                    {"x":222.75,"y":226.55},
                    {"x":241.35,"y":251.8},
                    {"x":238.9,"y":281.6},
                    {"x":245.2,"y":311.6},
                    {"x":262.05,"y":343.15},
                    {"x":284.8,"y":366.1},
                    {"x":311.1,"y":384},
                    {"x":353.2,"y":401.5},
                    {"x":407.55,"y":413.8},
                    {"x":458.35,"y":418.85},
                    {"x":509.2,"y":418.85},
                    {"x":558.3,"y":415.2},
                    {"x":609.3,"y":404.3},
                    {"x":647.85,"y":387.85},
                    {"x":684.7,"y":361.9},
                    {"x":708,"y":332.1},
                    {"x":722,"y":298.8},
                    {"x":725.55,"y":269},
                    {"x":715,"y":240.95},
                    {"x":688.7,"y":226.9},
                    {"x":658.75,"y":232.15},
                    {"x":645.95,"y":260.2},
                    {"x":642.8,"y":290.35},
                    {"x":627,"y":317},
                    {"x":600.9,"y":337.2},
                    {"x":571.1,"y":350},
                    {"x":538.3,"y":357.7},
                    {"x":505,"y":360.5},
                    {"x":459.4,"y":360.15},
                    {"x":420.85,"y":355.05},
                    {"x":387.55,"y":345.6},
                    {"x":355.45,"y":329.1},
                    {"x":332,"y":305.8},
                    {"x":318.85,"y":274.4},
                    {"x":317.1,"y":246.35}
    ]}

]                     
