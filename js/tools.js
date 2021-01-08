getMatType = {
    //dirts
    "minecraft:dirt/dirt": "single",
    "minecraft:dirt/coarse_dirt": "single", //coarse dirt
    //foliage
    "minecraft:grass": "multi",
    "minecraft:dirt/podzol": "multi",
    "minecraft:mycelium": "multi",
    //falling blocks
    "minecraft:sand/sand": "single",
    "minecraft:glass": "single",
    "minecraft:sand/red_sand": "single", //red sand
    "minecraft:gravel": "single",
    //stones
    "minecraft:stone/stone": "single",
    "minecraft:stone/granite": "single",
    "minecraft:stone/smooth_granite": "single",
    "minecraft:stone/diorite": "single",
    "minecraft:stone/smooth_diorite": "single",
    "minecraft:stone/andesite": "single",
    "minecraft:stone/smooth_andesite": "single",
    "minecraft:cobblestone": "single",
    "minecraft:mossy_cobblestone": "single",
    "minecraft:stonebrick/stonebrick": "single",
    "minecraft:stonebrick/mossy_stonebrick": "single",
    "minecraft:stonebrick/cracked_stonebrick": "single",
    "minecraft:stonebrick/chiseled_stonebrick": "single",
    "minecraft:bedrock": "single",
    "appliedenergistics2:sky_stone_block": "single",
    "appliedenergistics2:smooth_sky_stone_block": "single",
    "appliedenergistics2:sky_stone_brick": "single",
    "appliedenergistics2:sky_stone_small_brick": "single",
    //ores
    "minecraft:sandstone/type:sandstone": "multi",
    "minecraft:sandstone/type:smooth_sandstone": "multi",
    "minecraft:sandstone/type:chiseled_sandstone": "multi",
    //ores
    "minecraft:gold_ore": "single",
    "minecraft:iron_ore": "single",
    "minecraft:coal_ore": "single",
    "minecraft:lapis_ore": "single",
    "minecraft:diamond_ore": "single",
    "minecraft:lit_redstone_ore": "single",
    "minecraft:redstone_ore": "single",
    "minecraft:emerald_ore": "single",
    "mysttmtgravitymod:gravityore/type:stone": "single",
    "appliedenergistics2:quartz_ore": "single",
    "appliedenergistics2:charged_quartz_ore": "single",
    "aroma1997sdimension:miningore/type:sticky_ore": "single", //slime ore
    "minecraft:slime": "single", //slime block
    "aroma1997sdimension:miningore/type:clay_ore": "single", //clay ore
    "minecraft:clay": "single", //clay block
    //precious blocks
    "minecraft:gold_block": "single",
    "minecraft:iron_block": "single",
    "minecraft:coal_block": "single",
    "minecraft:lapis_block": "single",
    "minecraft:diamond_block": "single",
    "minecraft:redstone_block": "single",
    "minecraft:emerald_block": "single",
    //wood
    "minecraft:log/oak": "multi",
    "minecraft:log/spruce": "multi",
    "minecraft:log/birch": "multi",
    "minecraft:log/jungle": "multi",
    "minecraft:log2/acacia": "multi",
    "minecraft:log2/dark_oak": "multi",
    //planks
    "minecraft:planks/oak": "single",
    "minecraft:planks/spruce": "single",
    "minecraft:planks/birch": "single",
    "minecraft:planks/jungle": "single",
    "minecraft:planks/acacia": "single",
    "minecraft:planks/dark_oak": "single",
    //leaves
    "minecraft:leaves/oak": "single",
    "minecraft:leaves/spruce": "single",
    "minecraft:leaves/birch": "single",
    "minecraft:leaves/jungle": "single",
    "minecraft:leaves2/acacia": "single",
    "minecraft:leaves2/dark_oak": "single",
    //
    "minecraft:furnace": "multi",
    "minecraft:lit_furnace": "multi",
    "minecraft:crafting_table": "multi",
    //ocean temple
    "minecraft:prismarine/prismarine": "single",
    "minecraft:prismarine/prismarine_bricks": "single",
    "minecraft:prismarine/dark_prismarine": "single",
    "minecraft:sea_lantern": "single",
    "minecraft:sponge": "single",
};
MatTypeClay = {
    "minecraft:hardened_clay": "single",
    "minecraft:stained_hardened_clay/color:silver": "single",
    "minecraft:stained_hardened_clay/color:brown": "single",
    "minecraft:stained_hardened_clay/color:gray": "single",
    "minecraft:stained_hardened_clay/color:black": "single",
    "minecraft:stained_hardened_clay/color:cyan": "single",
    "minecraft:stained_hardened_clay/color:white": "single",
    "minecraft:stained_hardened_clay/color:pink": "single",
    "minecraft:stained_hardened_clay/color:red": "single",
    "minecraft:stained_hardened_clay/color:orange": "single",
    "minecraft:stained_hardened_clay/color:yellow": "single",
    "minecraft:stained_hardened_clay/color:lime": "single",
    "minecraft:stained_hardened_clay/color:green": "single",
    "minecraft:stained_hardened_clay/color:blue": "single",
    "minecraft:stained_hardened_clay/color:light_blue": "single",
    "minecraft:stained_hardened_clay/color:magenta": "single",
    "minecraft:stained_hardened_clay/color:purple": "single",
}
getMatType = Object.assign({},getMatType,MatTypeClay)

getTexAll = {
    //dirts
    "minecraft:dirt/dirt": "textures/minecraft/dirt.png",
    "minecraft:dirt/coarse_dirt": "textures/minecraft/coarse_dirt.png",
    //falling blocks
    "minecraft:sand/sand": "textures/minecraft/sand.png",
    "minecraft:glass": "textures/minecraft/glass.png",
    "minecraft:sand/red_sand": "textures/minecraft/red_sand.png",
    "minecraft:gravel": "textures/minecraft/gravel.png",
    //stones
    "minecraft:stone/stone": "textures/minecraft/stone.png",
    "minecraft:stone/granite": "textures/minecraft/stone_granite.png",
    "minecraft:stone/smooth_granite": "textures/minecraft/stone_granite_smooth.png",
    "minecraft:stone/diorite": "textures/minecraft/stone_diorite.png",
    "minecraft:stone/smooth_diorite": "textures/minecraft/stone_diorite_smooth.png",
    "minecraft:stone/andesite": "textures/minecraft/stone_andesite.png",
    "minecraft:stone/smooth_andesite": "textures/minecraft/stone_andesite_smooth.png",
    "minecraft:cobblestone": "textures/minecraft/cobblestone.png",
    "minecraft:mossy_cobblestone": "textures/minecraft/cobblestone_mossy.png",
    "minecraft:stonebrick/stonebrick":"textures/minecraft/stonebrick.png",
    "minecraft:stonebrick/mossy_stonebrick": "textures/minecraft/stonebrick_mossy.png",
    "minecraft:stonebrick/cracked_stonebrick": "textures/minecraft/stonebrick_cracked.png",
    "minecraft:stonebrick/chiseled_stonebrick": "textures/minecraft/stonebrick_carved.png",
    "minecraft:bedrock": "textures/minecraft/bedrock.png",
    "appliedenergistics2:sky_stone_block": "textures/appliedenergistics2/sky_stone_block.png",
    "appliedenergistics2:smooth_sky_stone_block": "textures/appliedenergistics2/smooth_sky_stone_block.png",
    "appliedenergistics2:sky_stone_brick": "textures/appliedenergistics2/sky_stone_brick.png",
    "appliedenergistics2:sky_stone_small_brick": "textures/appliedenergistics2/sky_stone_small_brick.png",
    //ores
    "minecraft:gold_ore": "textures/minecraft/gold_ore.png",
    "minecraft:iron_ore": "textures/minecraft/iron_ore.png",
    "minecraft:coal_ore": "textures/minecraft/coal_ore.png",
    "minecraft:lapis_ore": "textures/minecraft/lapis_ore.png",
    "minecraft:diamond_ore": "textures/minecraft/diamond_ore.png",
    "minecraft:lit_redstone_ore": "textures/minecraft/redstone_ore.png",
    "minecraft:redstone_ore": "textures/minecraft/redstone_ore.png",
    "minecraft:emerald_ore": "textures/minecraft/emerald_ore.png",
    "mysttmtgravitymod:gravityore/type:stone": "textures/mysttmtgravitymod/gravityore_stone3.png",
    "appliedenergistics2:quartz_ore": "textures/appliedenergistics2/quartz_ore.png",
    "appliedenergistics2:charged_quartz_ore": "textures/appliedenergistics2/quartz_ore.png",
    "aroma1997sdimension:miningore/type:sticky_ore": "textures/aroma1997sdimension/stickyore.png",
    "minecraft:slime": "textures/minecraft/slime.png",
    "aroma1997sdimension:miningore/type:clay_ore": "textures/aroma1997sdimension/clayore.png",
    "minecraft:clay": "textures/minecraft/clay.png",
    //precious blocks
    "minecraft:gold_block": "textures/minecraft/gold_block.png",
    "minecraft:iron_block": "textures/minecraft/iron_block.png",
    "minecraft:coal_block": "textures/minecraft/coal_block.png",
    "minecraft:lapis_block": "textures/minecraft/lapis_block.png",
    "minecraft:diamond_block": "textures/minecraft/diamond_block.png",
    "minecraft:redstone_block": "textures/minecraft/redstone_block.png",
    "minecraft:emerald_block": "textures/minecraft/emerald_block.png",
    //wood
    "minecraft:planks/oak": "textures/minecraft/planks_oak.png",
    "minecraft:planks/spruce": "textures/minecraft/planks_spruce.png",
    "minecraft:planks/birch": "textures/minecraft/planks_birch.png",
    "minecraft:planks/jungle": "textures/minecraft/planks_jungle.png",
    "minecraft:planks/acacia": "textures/minecraft/planks_acacia.png",
    "minecraft:planks/dark_oak": "textures/minecraft/planks_big_oak.png",
    //leaves
    "minecraft:leaves/oak": "textures/minecraft/special/leaves_oak.png",
    "minecraft:leaves/spruce": "textures/minecraft/special/leaves_spruce.png",
    "minecraft:leaves/birch": "textures/minecraft/special/leaves_birch.png",
    "minecraft:leaves/jungle": "textures/minecraft/special/leaves_jungle.png",
    "minecraft:leaves2/acacia": "textures/minecraft/special/leaves_acacia.png",
    "minecraft:leaves2/dark_oak": "textures/minecraft/special/leaves_big_oak.png",
    //ocean temple
    "minecraft:prismarine/prismarine": "textures/minecraft/special/prismarine_rough.png",
    "minecraft:prismarine/prismarine_bricks": "textures/minecraft/prismarine_bricks.png",
    "minecraft:prismarine/dark_prismarine": "textures/minecraft/prismarine_dark.png",
    "minecraft:sea_lantern": "textures/minecraft/special/sea_lantern.png",
    "minecraft:sponge": "textures/minecraft/sponge.png",
};
TexAllClay = {
    "minecraft:hardened_clay": "textures/minecraft/hardened_clay.png",
    "minecraft:stained_hardened_clay/color:silver": "textures/minecraft/hardened_clay_stained_silver.png",
    "minecraft:stained_hardened_clay/color:brown": "textures/minecraft/hardened_clay_stained_brown.png",
    "minecraft:stained_hardened_clay/color:gray": "textures/minecraft/hardened_clay_stained_gray.png",
    "minecraft:stained_hardened_clay/color:black": "textures/minecraft/hardened_clay_stained_black.png",
    "minecraft:stained_hardened_clay/color:cyan": "textures/minecraft/hardened_clay_stained_cyan.png",
    "minecraft:stained_hardened_clay/color:white": "textures/minecraft/hardened_clay_stained_white.png",
    "minecraft:stained_hardened_clay/color:pink": "textures/minecraft/hardened_clay_stained_pink.png",
    "minecraft:stained_hardened_clay/color:red": "textures/minecraft/hardened_clay_stained_red.png",
    "minecraft:stained_hardened_clay/color:orange": "textures/minecraft/hardened_clay_stained_orange.png",
    "minecraft:stained_hardened_clay/color:yellow": "textures/minecraft/hardened_clay_stained_yellow.png",
    "minecraft:stained_hardened_clay/color:lime": "textures/minecraft/hardened_clay_stained_lime.png",
    "minecraft:stained_hardened_clay/color:green": "textures/minecraft/hardened_clay_stained_green.png",
    "minecraft:stained_hardened_clay/color:blue": "textures/minecraft/hardened_clay_stained_blue.png",
    "minecraft:stained_hardened_clay/color:light_blue": "textures/minecraft/hardened_clay_stained_light_blue.png",
    "minecraft:stained_hardened_clay/color:magenta": "textures/minecraft/hardened_clay_stained_magenta.png",
    "minecraft:stained_hardened_clay/color:purple": "textures/minecraft/hardened_clay_stained_purple.png",
}
getTexAll = Object.assign({},getTexAll,TexAllClay)


getTexLeft = {
    //stone
    "minecraft:sandstone/type:sandstone": "textures/minecraft/sandstone_normal.png",
    "minecraft:sandstone/type:smooth_sandstone": "textures/minecraft/sandstone_smooth.png",
    "minecraft:sandstone/type:chiseled_sandstone": "textures/minecraft/sandstone_carved.png",
    //foliage
    "minecraft:grass": "textures/minecraft/special/grass_side.png",
    "minecraft:dirt/podzol": "textures/minecraft/dirt_podzol_side.png",
    "minecraft:mycelium": "textures/minecraft/mycelium_side.png",
    //wood
    "minecraft:log/oak": "textures/minecraft/log_oak.png",
    "minecraft:log/spruce": "textures/minecraft/log_spruce.png",
    "minecraft:log/birch": "textures/minecraft/log_birch.png",
    "minecraft:log/jungle": "textures/minecraft/log_jungle.png",
    "minecraft:log2/acacia": "textures/minecraft/log_acacia.png",
    "minecraft:log2/dark_oak": "textures/minecraft/log_big_oak.png",
    //
    "minecraft:crafting_table": "textures/minecraft/crafting_table_side.png",
    "minecraft:furnace": "textures/minecraft/furnace_side.png",
    "minecraft:lit_furnace": "textures/minecraft/furnace_side.png",
};
getTexRight = {
    //stone
    "minecraft:sandstone/type:sandstone": "textures/minecraft/sandstone_normal.png",
    "minecraft:sandstone/type:smooth_sandstone": "textures/minecraft/sandstone_smooth.png",
    "minecraft:sandstone/type:chiseled_sandstone": "textures/minecraft/sandstone_carved.png",
    //foliage
    "minecraft:grass": "textures/minecraft/special/grass_side.png",
    "minecraft:dirt/podzol": "textures/minecraft/dirt_podzol_side.png",
    "minecraft:mycelium": "textures/minecraft/mycelium_side.png",
    //wood
    "minecraft:log/oak": "textures/minecraft/log_oak.png",
    "minecraft:log/spruce": "textures/minecraft/log_spruce.png",
    "minecraft:log/birch": "textures/minecraft/log_birch.png",
    "minecraft:log/jungle": "textures/minecraft/log_jungle.png",
    "minecraft:log2/acacia": "textures/minecraft/log_acacia.png",
    "minecraft:log2/dark_oak": "textures/minecraft/log_big_oak.png",
    //
    "minecraft:crafting_table": "textures/minecraft/crafting_table_side.png",
    "minecraft:furnace": "textures/minecraft/furnace_side.png",
    "minecraft:lit_furnace": "textures/minecraft/furnace_side.png",
};
getTexTop = {
    //stone
    "minecraft:sandstone/type:sandstone": "textures/minecraft/sandstone_top.png",
    "minecraft:sandstone/type:smooth_sandstone": "textures/minecraft/sandstone_top.png",
    "minecraft:sandstone/type:chiseled_sandstone": "textures/minecraft/sandstone_top.png",
    //foliage
    "minecraft:grass": "textures/minecraft/special/grass_top.png",
    "minecraft:dirt/podzol": "textures/minecraft/dirt_podzol_top.png",
    "minecraft:mycelium": "textures/minecraft/mycelium_top.png",
    //wood
    "minecraft:log/oak": "textures/minecraft/log_oak.png",
    "minecraft:log/spruce": "textures/minecraft/log_spruce.png",
    "minecraft:log/birch": "textures/minecraft/log_birch.png",
    "minecraft:log/jungle": "textures/minecraft/log_jungle.png",
    "minecraft:log2/acacia": "textures/minecraft/log_acacia.png",
    "minecraft:log2/dark_oak": "textures/minecraft/log_big_oak.png",
    //
    "minecraft:crafting_table": "textures/minecraft/crafting_table_top.png",
    "minecraft:furnace": "textures/minecraft/furnace_top.png",
    "minecraft:lit_furnace": "textures/minecraft/furnace_top.png",
};
getTexBottom = {
    //stone
    "minecraft:sandstone/type:sandstone": "textures/minecraft/sandstone_bottom.png",
    "minecraft:sandstone/type:smooth_sandstone": "textures/minecraft/sandstone_top.png",
    "minecraft:sandstone/type:chiseled_sandstone": "textures/minecraft/sandstone_top.png",
    //foliage
    "minecraft:grass": "textures/minecraft/dirt.png",
    "minecraft:dirt/podzol": "textures/minecraft/dirt.png",
    "minecraft:mycelium": "textures/minecraft/dirt.png",
    //wood
    "minecraft:log/oak": "textures/minecraft/log_oak.png",
    "minecraft:log/spruce": "textures/minecraft/log_spruce.png",
    "minecraft:log/birch": "textures/minecraft/log_birch.png",
    "minecraft:log/jungle": "textures/minecraft/log_jungle.png",
    "minecraft:log2/acacia": "textures/minecraft/log_acacia.png",
    "minecraft:log2/dark_oak": "textures/minecraft/log_big_oak.png",
    //
    "minecraft:crafting_table": "textures/minecraft/planks_oak.png",
    "minecraft:furnace": "textures/minecraft/furnace_top.png",
    "minecraft:lit_furnace": "textures/minecraft/furnace_top.png",
};
getTexFront = {
    //stone
    "minecraft:sandstone/type:sandstone": "textures/minecraft/sandstone_normal.png",
    "minecraft:sandstone/type:smooth_sandstone": "textures/minecraft/sandstone_smooth.png",
    "minecraft:sandstone/type:chiseled_sandstone": "textures/minecraft/sandstone_carved.png",
    //foliage
    "minecraft:grass": "textures/minecraft/special/grass_side.png",
    "minecraft:dirt/podzol": "textures/minecraft/dirt_podzol_side.png",
    "minecraft:mycelium": "textures/minecraft/mycelium_side.png",
    //wood
    "minecraft:log/oak": "textures/minecraft/log_oak_top.png",
    "minecraft:log/spruce": "textures/minecraft/log_spruce_top.png",
    "minecraft:log/birch": "textures/minecraft/log_birch_top.png",
    "minecraft:log/jungle": "textures/minecraft/log_jungle_top.png",
    "minecraft:log2/acacia": "textures/minecraft/log_acacia_top.png",
    "minecraft:log2/dark_oak": "textures/minecraft/log_big_oak_top.png",
    //
    "minecraft:crafting_table": "textures/minecraft/crafting_table_front.png",
    "minecraft:furnace": "textures/minecraft/furnace_front_off.png",
    "minecraft:lit_furnace": "textures/minecraft/furnace_front_on.png",
};
getTexBack = {
    //stone
    "minecraft:sandstone/type:sandstone": "textures/minecraft/sandstone_normal.png",
    "minecraft:sandstone/type:smooth_sandstone": "textures/minecraft/sandstone_smooth.png",
    "minecraft:sandstone/type:chiseled_sandstone": "textures/minecraft/sandstone_carved.png",
    //foliage
    "minecraft:grass": "textures/minecraft/special/grass_side.png",
    "minecraft:dirt/podzol": "textures/minecraft/dirt_podzol_side.png",
    "minecraft:mycelium": "textures/minecraft/mycelium_side.png",
    //wood
    "minecraft:log/oak": "textures/minecraft/log_oak_top.png",
    "minecraft:log/spruce": "textures/minecraft/log_spruce_top.png",
    "minecraft:log/birch": "textures/minecraft/log_birch_top.png",
    "minecraft:log/jungle": "textures/minecraft/log_jungle_top.png",
    "minecraft:log2/acacia": "textures/minecraft/log_acacia_top.png",
    "minecraft:log2/dark_oak": "textures/minecraft/log_big_oak_top.png",
    //
    "minecraft:crafting_table": "textures/minecraft/crafting_table_side.png",
    "minecraft:furnace": "textures/minecraft/furnace_side.png",
    "minecraft:lit_furnace": "textures/minecraft/furnace_side.png",
};


irrelevantBlocks = [
    "minecraft:tallgrass/type:tall_grass",
    "minecraft:tallgrass/type:fern",
    "minecraft:deadbush",
    "minecraft:snow_layer",
    "minecraft:vine",
    "minecraft:double_plant/double_grass",
    "minecraft:double_plant/double_fern",
];


facingOffsets = {
    "minecraft:sticky_piston": 2,
    "minecraft:piston": 2,
    "minecraft:unpowered_comparator": 2,
    "minecraft:unpowered_repeater": 2,
    "minecraft:furnace": 2,
    "minecraft:chest": 2,
    "minecraft:dropper": 2,
    "minecraft:dispenser": 2,
}
terracottaOffsets = {
    "minecraft:white_glazed_terracotta": 2,
    "minecraft:orange_glazed_terracotta": 2,
    "minecraft:white_glazed_terracotta": 2,
    "minecraft:magenta_glazed_terracotta": 2,
    "minecraft:light_blue_glazed_terracotta": 2,
    "minecraft:yellow_glazed_terracotta": 2,
    "minecraft:lime_glazed_terracotta": 2,
    "minecraft:pink_glazed_terracotta": 2,
    "minecraft:gray_glazed_terracotta": 2,
    "minecraft:silver_glazed_terracotta": 2,
    "minecraft:cyan_glazed_terracotta": 2,
    "minecraft:purple_glazed_terracotta": 2,
    "minecraft:blue_glazed_terracotta": 2,
    "minecraft:brown_glazed_terracotta": 2,
    "minecraft:green_glazed_terracotta": 2,
    "minecraft:red_glazed_terracotta": 2,
    "minecraft:black_glazed_terracotta": 2,
}
facingOffsets = Object.assign({}, facingOffsets, terracottaOffsets);