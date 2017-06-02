/**
 * Created by mrsharky on 6/23/16.
 */

var RawColorMaps = [
	{
		FullName: "Matlab|Seasons|Autumn",
		BuildFunction:"HEX",
		Function: "customColorMap",
		Values: [
			"#FF0000", "#FF0400", "#FF0800", "#FF0C00", "#FF1000", "#FF1400", "#FF1800", "#FF1C00", "#FF2000", "#FF2400", "#FF2800", "#FF2D00", "#FF3100",
			"#FF3500", "#FF3900", "#FF3D00", "#FF4100", "#FF4500", "#FF4900", "#FF4D00", "#FF5100", "#FF5500", "#FF5900", "#FF5D00", "#FF6100", "#FF6500",
			"#FF6900", "#FF6D00", "#FF7100", "#FF7500", "#FF7900", "#FF7D00", "#FF8200", "#FF8600", "#FF8A00", "#FF8E00", "#FF9200", "#FF9600", "#FF9A00",
			"#FF9E00", "#FFA200", "#FFA600", "#FFAA00", "#FFAE00", "#FFB200", "#FFB600", "#FFBA00", "#FFBE00", "#FFC200", "#FFC600", "#FFCA00", "#FFCE00",
			"#FFD200", "#FFD700", "#FFDB00", "#FFDF00", "#FFE300", "#FFE700", "#FFEB00", "#FFEF00", "#FFF300", "#FFF700", "#FFFB00", "#FFFF00"
		]
	},{
		FullName: "Matlab|Seasons|Winter",
		BuildFunction:"HEX",
		Function: "customColorMap",
		Values: [
			"#0000FF", "#0004FD", "#0008FB", "#000CF9", "#0010F7", "#0014F5", "#0018F3", "#001CF1", "#0020EF", "#0024ED", "#0028EB", "#002DE9", "#0031E7",
			"#0035E5", "#0039E3", "#003DE1", "#0041DF", "#0045DD", "#0049DB", "#004DD9", "#0051D7", "#0055D5", "#0059D2", "#005DD0", "#0061CE", "#0065CC",
			"#0069CA", "#006DC8", "#0071C6", "#0075C4", "#0079C2", "#007DC0", "#0082BE", "#0086BC", "#008ABA", "#008EB8", "#0092B6", "#0096B4", "#009AB2",
			"#009EB0", "#00A2AE", "#00A6AC", "#00AAAA", "#00AEA8", "#00B2A6", "#00B6A4", "#00BAA2", "#00BEA0", "#00C29E", "#00C69C", "#00CA9A", "#00CE98",
			"#00D296", "#00D794", "#00DB92", "#00DF90", "#00E38E", "#00E78C", "#00EB8A", "#00EF88", "#00F386", "#00F784", "#00FB82", "#00FF80"
		]
	},{
		FullName: "Matlab|Seasons|Summer",
		BuildFunction:"HEX",
		Function: "customColorMap",
		Values: [
			"#008066", "#048266", "#088466", "#0C8666", "#108866", "#148A66", "#188C66", "#1C8E66", "#209066", "#249266", "#289466", "#2D9666", "#319866",
			"#359A66", "#399C66", "#3D9E66", "#41A066", "#45A266", "#49A466", "#4DA666", "#51A866", "#55AA66", "#59AC66", "#5DAE66", "#61B066", "#65B266",
			"#69B466", "#6DB666", "#71B866", "#75BA66", "#79BC66", "#7DBE66", "#82C066", "#86C266", "#8AC466", "#8EC666", "#92C866", "#96CA66", "#9ACC66",
			"#9ECE66", "#A2D066", "#A6D266", "#AAD466", "#AED766", "#B2D966", "#B6DB66", "#BADD66", "#BEDF66", "#C2E166", "#C6E366", "#CAE566", "#CEE766",
			"#D2E966", "#D7EB66", "#DBED66", "#DFEF66", "#E3F166", "#E7F366", "#EBF566", "#EFF766", "#F3F966", "#F7FB66", "#FBFD66", "#FFFF66"
		]
	}, {
		FullName: "Matlab|Seasons|Spring",
		BuildFunction:"HEX",
		Function: "customColorMap",
		Values: [
			"#FF00FF", "#FF04FB", "#FF08F7", "#FF0CF3", "#FF10EF", "#FF14EB", "#FF18E7", "#FF1CE3", "#FF20DF", "#FF24DB", "#FF28D7", "#FF2DD2", "#FF31CE",
			"#FF35CA", "#FF39C6", "#FF3DC2", "#FF41BE", "#FF45BA", "#FF49B6", "#FF4DB2", "#FF51AE", "#FF55AA", "#FF59A6", "#FF5DA2", "#FF619E", "#FF659A",
			"#FF6996", "#FF6D92", "#FF718E", "#FF758A", "#FF7986", "#FF7D82", "#FF827D", "#FF8679", "#FF8A75", "#FF8E71", "#FF926D", "#FF9669", "#FF9A65",
			"#FF9E61", "#FFA25D", "#FFA659", "#FFAA55", "#FFAE51", "#FFB24D", "#FFB649", "#FFBA45", "#FFBE41", "#FFC23D", "#FFC639", "#FFCA35", "#FFCE31",
			"#FFD22D", "#FFD728", "#FFDB24", "#FFDF20", "#FFE31C", "#FFE718", "#FFEB14", "#FFEF10", "#FFF30C", "#FFF708", "#FFFB04", "#FFFF00"
		]
	}, {
		FullName: "Matlab|Jet",
		BuildFunction:"HEX",
		Function: "customColorMap",
		Values: [
			"#00008F", "#00009F", "#0000AF", "#0000BF", "#0000CF", "#0000DF", "#0000EF", "#0000FF", "#0010FF", "#0020FF", "#0030FF", "#0040FF", "#0050FF",
			"#0060FF", "#0070FF", "#0080FF", "#008FFF", "#009FFF", "#00AFFF", "#00BFFF", "#00CFFF", "#00DFFF", "#00EFFF", "#00FFFF", "#10FFEF", "#20FFDF",
			"#30FFCF", "#40FFBF", "#50FFAF", "#60FF9F", "#70FF8F", "#80FF80", "#8FFF70", "#9FFF60", "#AFFF50", "#BFFF40", "#CFFF30", "#DFFF20", "#EFFF10",
			"#FFFF00", "#FFEF00", "#FFDF00", "#FFCF00", "#FFBF00", "#FFAF00", "#FF9F00", "#FF8F00", "#FF8000", "#FF7000", "#FF6000", "#FF5000", "#FF4000",
			"#FF3000", "#FF2000", "#FF1000", "#FF0000", "#EF0000", "#DF0000", "#CF0000", "#BF0000", "#AF0000", "#9F0000", "#8F0000", "#800000"
			]
	}, {
		FullName: "Matlab|Hsv",
		BuildFunction:"HEX",
		Function: "customColorMap",
		Values: [
			"#FF0000", "#FF1800", "#FF3000", "#FF4800", "#FF6000", "#FF7800", "#FF8F00", "#FFA700", "#FFBF00", "#FFD700", "#FFEF00", "#F7FF00", "#DFFF00",
			"#C7FF00", "#AFFF00", "#97FF00", "#80FF00", "#68FF00", "#50FF00", "#38FF00", "#20FF00", "#08FF00", "#00FF10", "#00FF28", "#00FF40", "#00FF58",
			"#00FF70", "#00FF87", "#00FF9F", "#00FFB7", "#00FFCF", "#00FFE7", "#00FFFF", "#00E7FF", "#00CFFF", "#00B7FF", "#009FFF", "#0087FF", "#0070FF",
			"#0058FF", "#0040FF", "#0028FF", "#0010FF", "#0800FF", "#2000FF", "#3800FF", "#5000FF", "#6800FF", "#8000FF", "#9700FF", "#AF00FF", "#C700FF",
			"#DF00FF", "#F700FF", "#FF00EF", "#FF00D7", "#FF00BF", "#FF00A7", "#FF008F", "#FF0078", "#FF0060", "#FF0048", "#FF0030", "#FF0018"
		]
	}, {
		FullName: "Matlab|Hot",
		BuildFunction:"HEX",
		Function: "customColorMap",
		Values: [
			"#0B0000", "#150000", "#200000", "#2B0000", "#350000", "#400000", "#4A0000", "#550000", "#600000", "#6A0000", "#750000", "#800000", "#8A0000",
			"#950000", "#9F0000", "#AA0000", "#B50000", "#BF0000", "#CA0000", "#D50000", "#DF0000", "#EA0000", "#F40000", "#FF0000", "#FF0B00", "#FF1500",
			"#FF2000", "#FF2B00", "#FF3500", "#FF4000", "#FF4A00", "#FF5500", "#FF6000", "#FF6A00", "#FF7500", "#FF8000", "#FF8A00", "#FF9500", "#FF9F00",
			"#FFAA00", "#FFB500", "#FFBF00", "#FFCA00", "#FFD500", "#FFDF00", "#FFEA00", "#FFF400", "#FFFF00", "#FFFF10", "#FFFF20", "#FFFF30", "#FFFF40",
			"#FFFF50", "#FFFF60", "#FFFF70", "#FFFF80", "#FFFF8F", "#FFFF9F", "#FFFFAF", "#FFFFBF", "#FFFFCF", "#FFFFDF", "#FFFFEF", "#FFFFFF"
		]
	}, {
		FullName: "Matlab|Cool",
		BuildFunction:"HEX",
		Function: "customColorMap",
		Values: [
			"#00FFFF", "#04FBFF", "#08F7FF", "#0CF3FF", "#10EFFF", "#14EBFF", "#18E7FF", "#1CE3FF", "#20DFFF", "#24DBFF", "#28D7FF", "#2DD2FF", "#31CEFF", "#35CAFF", "#39C6FF", "#3DC2FF", "#41BEFF", "#45BAFF", "#49B6FF", "#4DB2FF", "#51AEFF", "#55AAFF", "#59A6FF", "#5DA2FF", "#619EFF", "#659AFF",
			"#6996FF", "#6D92FF", "#718EFF", "#758AFF", "#7986FF", "#7D82FF", "#827DFF", "#8679FF", "#8A75FF", "#8E71FF", "#926DFF", "#9669FF", "#9A65FF",
			"#9E61FF", "#A25DFF", "#A659FF", "#AA55FF", "#AE51FF", "#B24DFF", "#B649FF", "#BA45FF", "#BE41FF", "#C23DFF", "#C639FF", "#CA35FF", "#CE31FF",
			"#D22DFF", "#D728FF", "#DB24FF", "#DF20FF", "#E31CFF", "#E718FF", "#EB14FF", "#EF10FF", "#F30CFF", "#F708FF", "#FB04FF", "#FF00FF"
		]
	}, {
		FullName: "Matlab|Bone",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: [
			"#000001", "#040406", "#07070B", "#0B0B10", "#0E0E15", "#12121A", "#15151F", "#191923", "#1C1C28", "#20202D", "#232332", "#272737", "#2B2B3C",
			"#2E2E41", "#323246", "#35354A", "#39394F", "#3C3C54", "#404059", "#43435E", "#474763", "#4A4A68", "#4E4E6C", "#515171", "#555675", "#595B78",
			"#5C607C", "#606580", "#636A83", "#676F87", "#6A748A", "#6E788E", "#717D91", "#758295", "#788798", "#7C8C9C", "#80919F", "#8396A3", "#879BA6",
			"#8A9FAA", "#8EA4AE", "#91A9B1", "#95AEB5", "#98B3B8", "#9CB8BC", "#9FBDBF", "#A3C1C3", "#A6C6C6", "#ACCACA", "#B2CDCD", "#B7D1D1", "#BDD5D5",
			"#C2D8D8", "#C8DCDC", "#CDDFDF", "#D3E3E3", "#D8E6E6", "#DEEAEA", "#E3EDED", "#E9F1F1", "#EEF4F4", "#F4F8F8", "#F9FBFB", "#FFFFFF"
		]
	},{
		FullName: "Matlab|Copper",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: [
			"#000000", "#050302", "#0A0604", "#0F0906", "#140D08", "#19100A", "#1E130C", "#23160E", "#281910", "#2E1C12", "#332014", "#382316", "#3D2618",
			"#42291A", "#472C1C", "#4C2F1E", "#513320", "#563622", "#5B3924", "#603C26", "#653F28", "#6A422A", "#6F462C", "#74492E", "#794C30", "#7E4F32",
			"#845234", "#895536", "#8E5938", "#935C3A", "#985F3C", "#9D623E", "#A26540", "#A76842", "#AC6C44", "#B16F46", "#B67248", "#BB754B", "#C0784D",
			"#C57B4F", "#CA7E51", "#CF8253", "#D48555", "#DA8857", "#DF8B59", "#E48E5B", "#E9915D", "#EE955F", "#F39861", "#F89B63", "#FD9E65", "#FFA167",
			"#FFA469", "#FFA86B", "#FFAB6D", "#FFAE6F", "#FFB171", "#FFB473", "#FFB775", "#FFBB77", "#FFBE79", "#FFC17B", "#FFC47D", "#FFC77F"
		]
	},{    // 01
		FullName: "Color Brewer 2.0|Diverging|Zero Centered|11-class BrBG",
		BuildFunction: "HEX",
		Function: "customColorMapWithMidpoint",
		Values: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"]
	},{    // 02
		FullName: "Color Brewer 2.0|Diverging|Zero Centered|11-class PiYG",
		BuildFunction: "HEX",
		Function: "customColorMapWithMidpoint",
		Values: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"]
	},{    // 03
		FullName: "Color Brewer 2.0|Diverging|Zero Centered|11-class PRGn",
		BuildFunction: "HEX",
		Function: "customColorMapWithMidpoint",
		Values: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"]
	},{    // 04
		FullName: "Color Brewer 2.0|Diverging|Zero Centered|11-class PuOr",
		BuildFunction: "HEX",
		Function: "customColorMapWithMidpoint",
		Values: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"]
	},{    // 05
		FullName: "Color Brewer 2.0|Diverging|Zero Centered|11-class RdBu",
		BuildFunction: "HEX",
		Function: "customColorMapWithMidpoint",
		Values: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"]
	},{    // 06
		FullName: "Color Brewer 2.0|Diverging|Zero Centered|11-class RdGy",
		BuildFunction: "HEX",
		Function: "customColorMapWithMidpoint",
		Values: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"]
	},{    // 07
		FullName: "Color Brewer 2.0|Diverging|Zero Centered|11-class RdYlBu",
		BuildFunction: "HEX",
		Function: "customColorMapWithMidpoint",
		Values: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"]
	},{    // 08
		FullName: "Color Brewer 2.0|Diverging|Zero Centered|11-class RdYlGn",
		BuildFunction: "HEX",
		Function: "customColorMapWithMidpoint",
		Values: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]
	},{    // 09
		FullName: "Color Brewer 2.0|Diverging|Zero Centered|11-class Spectral",
		BuildFunction: "HEX",
		Function: "customColorMapWithMidpoint",
		Values: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"]
	},{    // 01
		FullName: "Color Brewer 2.0|Diverging|Non Centered|11-class BrBG",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"]
	},{    // 02
		FullName: "Color Brewer 2.0|Diverging|Non Centered|11-class PiYG",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"]
	},{    // 03
		FullName: "Color Brewer 2.0|Diverging|Non Centered|11-class PRGn",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"]
	},{    // 04
		FullName: "Color Brewer 2.0|Diverging|Non Centered|11-class PuOr",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"]
	},{    // 05
		FullName: "Color Brewer 2.0|Diverging|Non Centered|11-class RdBu",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"]
	},{    // 06
		FullName: "Color Brewer 2.0|Diverging|Non Centered|11-class RdGy",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"]
	},{    // 07
		FullName: "Color Brewer 2.0|Diverging|Non Centered|11-class RdYlBu",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"]
	},{    // 08
		FullName: "Color Brewer 2.0|Diverging|Non Centered|11-class RdYlGn",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]
	},{    // 09
		FullName: "Color Brewer 2.0|Diverging|Non Centered|11-class Spectral",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"]
	},{    // 01
		FullName: "Color Brewer 2.0|Sequential|Multi-hue|9-class BuGn",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"]
	},{    // 02
		FullName: "Color Brewer 2.0|Sequential|Multi-hue|9-class BuPu",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"]
	},{    // 03
		FullName: "Color Brewer 2.0|Sequential|Multi-hue|9-class GnBu",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"]
	},{    // 04
		FullName: "Color Brewer 2.0|Sequential|Multi-hue|9-class OrRd",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]
	},{    // 05
		FullName: "Color Brewer 2.0|Sequential|Multi-hue|9-class PuBu",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"]
	},{    // 06
		FullName: "Color Brewer 2.0|Sequential|Multi-hue|9-class PuBuGn",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"]
	},{    // 07
		FullName: "Color Brewer 2.0|Sequential|Multi-hue|9-class PuRd",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"]
	},{    // 08
		FullName: "Color Brewer 2.0|Sequential|Multi-hue|9-class RdPu",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"]
	},{    // 09
		FullName: "Color Brewer 2.0|Sequential|Multi-hue|9-class YlGn",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"]
	},{    // 10
		FullName: "Color Brewer 2.0|Sequential|Multi-hue|9-class YlGnBu",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"]
	},{    // 11
		FullName: "Color Brewer 2.0|Sequential|Multi-hue|9-class YlOrBr",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]
	},{    // 12
		FullName: "Color Brewer 2.0|Sequential|Multi-hue|9-class YlOrRd",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"]
	},{    // 01
		FullName: "Color Brewer 2.0|Sequential|Single-hue|9-class Blues",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"]
	},{    // 02
		FullName: "Color Brewer 2.0|Sequential|Single-hue|9-class Greens",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"]
	},{    // 03
		FullName: "Color Brewer 2.0|Sequential|Single-hue|9-class Greys",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"]
	},{    // 04
		FullName: "Color Brewer 2.0|Sequential|Single-hue|9-class Oranges",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"]
	},{    // 05
		FullName: "Color Brewer 2.0|Sequential|Single-hue|9-class Purples",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"]
	},{    // 06
		FullName: "Color Brewer 2.0|Sequential|Single-hue|9-class Reds",
		BuildFunction: "HEX",
		Function: "customColorMap",
		Values: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"]
	}, {
		FullName: "Other|Blackbody Radiation",
		BuildFunction: "xorgb",
		Function: "customColorMap",
		Values: [{x: 0.0, o: 1.0, r: 0.0, g: 0.0, b: 0.0},
			{x: 0.4, o: 1.0, r: 1.0, g: 0.0, b: 0.0},
			{x: 0.75, o: 1.0, r: 1.0, g: 1.0, b: 0.0},
			{x: 1.0, o: 1.0, r: 1.0, g: 1.0, b: 1.0}]
	}, {
		FullName: "Other|Cool to Warm",
		BuildFunction: "xorgb",
		Function: "customColorMap",
		Values: [{x: 0, o: 1.0, r: 0.231372549, g: 0.2980392157, b: 0.7529411765},
			{x: 0.03125, o: 1.0, r: 0.2666666667, g: 0.3529411765, b: 0.8},
			{x: 0.0625, o: 1.0, r: 0.3019607843, g: 0.4078431373, b: 0.8431372549},
			{x: 0.09375, o: 1.0, r: 0.3411764706, g: 0.4588235294, b: 0.8823529412},
			{x: 0.125, o: 1.0, r: 0.3843137255, g: 0.5098039216, b: 0.9176470588},
			{x: 0.15625, o: 1.0, r: 0.4235294118, g: 0.5568627451, b: 0.9450980392},
			{x: 0.1875, o: 1.0, r: 0.4666666667, g: 0.6039215686, b: 0.968627451},
			{x: 0.21875, o: 1.0, r: 0.5098039216, g: 0.6470588235, b: 0.9843137255},
			{x: 0.25, o: 1.0, r: 0.5529411765, g: 0.6901960784, b: 0.9960784314},
			{x: 0.28125, o: 1.0, r: 0.5960784314, g: 0.7254901961, b: 1},
			{x: 0.3125, o: 1.0, r: 0.6392156863, g: 0.7607843137, b: 1},
			{x: 0.34375, o: 1.0, r: 0.6823529412, g: 0.7882352941, b: 0.9921568627},
			{x: 0.375, o: 1.0, r: 0.7215686275, g: 0.8156862745, b: 0.9764705882},
			{x: 0.40625, o: 1.0, r: 0.7607843137, g: 0.8352941176, b: 0.9568627451},
			{x: 0.4375, o: 1.0, r: 0.8, g: 0.8509803922, b: 0.9333333333},
			{x: 0.46875, o: 1.0, r: 0.8352941176, g: 0.8588235294, b: 0.9019607843},
			{x: 0.5, o: 1.0, r: 0.8666666667, g: 0.8666666667, b: 0.8666666667},
			{x: 0.53125, o: 1.0, r: 0.8980392157, g: 0.8470588235, b: 0.8196078431},
			{x: 0.5625, o: 1.0, r: 0.9254901961, g: 0.8274509804, b: 0.7725490196},
			{x: 0.59375, o: 1.0, r: 0.9450980392, g: 0.8, b: 0.7254901961},
			{x: 0.625, o: 1.0, r: 0.9607843137, g: 0.768627451, b: 0.6784313725},
			{x: 0.65625, o: 1.0, r: 0.968627451, g: 0.7333333333, b: 0.6274509804},
			{x: 0.6875, o: 1.0, r: 0.968627451, g: 0.6941176471, b: 0.5803921569},
			{x: 0.71875, o: 1.0, r: 0.968627451, g: 0.6509803922, b: 0.5294117647},
			{x: 0.75, o: 1.0, r: 0.9568627451, g: 0.6039215686, b: 0.4823529412},
			{x: 0.78125, o: 1.0, r: 0.9450980392, g: 0.5529411765, b: 0.4352941176},
			{x: 0.8125, o: 1.0, r: 0.9254901961, g: 0.4980392157, b: 0.3882352941},
			{x: 0.84375, o: 1.0, r: 0.8980392157, g: 0.4392156863, b: 0.3450980392},
			{x: 0.875, o: 1.0, r: 0.8705882353, g: 0.3764705882, b: 0.3019607843},
			{x: 0.90625, o: 1.0, r: 0.8352941176, g: 0.3137254902, b: 0.2588235294},
			{x: 0.9375, o: 1.0, r: 0.7960784314, g: 0.2431372549, b: 0.2196078431},
			{x: 0.96875, o: 1.0, r: 0.7529411765, g: 0.1568627451, b: 0.1843137255},
			{x: 1, o: 1.0, r: 0.7058823529, g: 0.01568627451, b: 0.1490196078}]
	}, {
		FullName: "Other|Gray scale",
		BuildFunction: "xorgb",
		Function: "customColorMap",
		Values: [{x: 0.0, o: 1.0, r: 0.0, g: 0.0, b:0.0 },
			{x: 1.0, o: 1.0, r: 1.0, g: 1.0, b:1.0 }]
	}, {
		FullName: "Other|Spatial Contrast Mesh 3 scale",
		BuildFunction: "xorgb",
		Function: "customColorMap",
		Values: [{x: 0, o: 1, r: 0.07514311, g: 0.468049805, b: 1},
			{x: 0.03125, o: 1, r: 0.247872569, g: 0.498782363, b: 1},
			{x: 0.0625, o: 1, r: 0.339526309, g: 0.528909511, b: 1},
			{x: 0.09375, o: 1, r: 0.409505078, g: 0.558608486, b: 1},
			{x: 0.125, o: 1, r: 0.468487184, g: 0.588057293, b: 1},
			{x: 0.15625, o: 1, r: 0.520796675, g: 0.617435078, b: 1},
			{x: 0.1875, o: 1, r: 0.568724526, g: 0.646924167, b: 1},
			{x: 0.21875, o: 1, r: 0.613686735, g: 0.676713218, b: 1},
			{x: 0.25, o: 1, r: 0.656658579, g: 0.707001303, b: 1},
			{x: 0.28125, o: 1, r: 0.698372844, g: 0.738002964, b: 1},
			{x: 0.3125, o: 1, r: 0.739424025, g: 0.769954435, b: 1},
			{x: 0.34375, o: 1, r: 0.780330104, g: 0.803121429, b: 1},
			{x: 0.375, o: 1, r: 0.821573924, g: 0.837809045, b: 1},
			{x: 0.40625, o: 1, r: 0.863634967, g: 0.874374691, b: 1},
			{x: 0.4375, o: 1, r: 0.907017747, g: 0.913245283, b: 1},
			{x: 0.46875, o: 1, r: 0.936129275, g: 0.938743558, b: 0.983038586},
			{x: 0.5, o: 1, r: 0.943467973, g: 0.943498599, b: 0.943398095},
			{x: 0.53125, o: 1, r: 0.990146732, g: 0.928791426, b: 0.917447482},
			{x: 0.5625, o: 1, r: 1, g: 0.88332677, b: 0.861943246},
			{x: 0.59375, o: 1, r: 1, g: 0.833985467, b: 0.803839606},
			{x: 0.625, o: 1, r: 1, g: 0.788626485, b: 0.750707739},
			{x: 0.65625, o: 1, r: 1, g: 0.746206642, b: 0.701389973},
			{x: 0.6875, o: 1, r: 1, g: 0.70590052, b: 0.654994046},
			{x: 0.71875, o: 1, r: 1, g: 0.667019783, b: 0.610806959},
			{x: 0.75, o: 1, r: 1, g: 0.6289553, b: 0.568237474},
			{x: 0.78125, o: 1, r: 1, g: 0.591130233, b: 0.526775617},
			{x: 0.8125, o: 1, r: 1, g: 0.552955184, b: 0.485962266},
			{x: 0.84375, o: 1, r: 1, g: 0.513776083, b: 0.445364274},
			{x: 0.875, o: 1, r: 1, g: 0.472800903, b: 0.404551679},
			{x: 0.90625, o: 1, r: 1, g: 0.428977855, b: 0.363073592},
			{x: 0.9375, o: 1, r: 1, g: 0.380759558, b: 0.320428137},
			{x: 0.96875, o: 1, r: 0.961891484, g: 0.313155629, b: 0.265499262},
			{x: 1, o: 1, r: 0.916482116, g: 0.236630659, b: 0.209939162}]
	}
]


/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
	var r, g, b;

	if(s == 0){
		r = g = b = l; // achromatic
	}else{
		var hue2rgb = function hue2rgb(p, q, t){
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		};

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}
	return [r, g, b];
}

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

function rainbowColormapCreator(minValue, maxValue, currValue){
	var hue = 240.0/360.0 - ((currValue - minValue)/(maxValue - minValue))* (240.0/360.0);
	return hslToRgb(hue, 1.0, 0.5);
}

function coolWarmColormap(minValue, maxValue, currValue){
	var midpoint = [0.865, 0.865, 0.865];
	var valueScaled = (currValue - minValue)/(maxValue - minValue);
	var lowerColor;
	var upperColor;
	var percentFade;
	if (valueScaled < 0.5)
	{
		lowerColor = [0.320, 0.299, 0.754];
		upperColor = midpoint;
		percentFade = valueScaled/0.5;
	}
	else // value Scaled >= 0.5
	{
		lowerColor = midpoint;
		upperColor = [0.706, 0.016, 0.150];
		percentFade = (valueScaled-0.5)/(0.5);
	}
	var diffRed = upperColor[0] - lowerColor[0];
	var diffGreen = upperColor[1] - lowerColor[1];
	var diffBlue = upperColor[2] - lowerColor[2];

	diffRed = (diffRed * percentFade) + lowerColor[0];
	diffGreen = (diffGreen * percentFade) + lowerColor[1];
	diffBlue = (diffBlue * percentFade) + lowerColor[2];

	return [diffRed, diffGreen, diffBlue];
}

function coolWarmColormapWithMidpoint(minValue, maxValue, currValue, midpointValue, colorScheme){
	var midpoint = [0.865, 0.865, 0.865];
	var lowColor;
	var highColor;
	switch(colorScheme)
	{
		case 1:
			lowColor = [0.320, 0.299, 0.754];
			highColor = [0.706, 0.016, 0.150];
			break;
		case 2:
			lowColor = [0.436, 0.308, 0.631];
			highColor = [0.759, 0.334, 0.046];
			break;
		case 3:
			lowColor = [0.085, 0.532, 0.201];
			highColor = [0.436, 0.308, 0.631];
			break;
		case 4:
			lowColor = [0.217, 0.626, 0.910];
			highColor = [0.677, 0.492, 0.093];
			break;
		case 5:
			lowColor = [0.085, 0.532, 0.201];
			highColor = [0.758, 0.214, 0.233];
			break;
		default:
			lowColor = [0.320, 0.299, 0.754];
			highColor = [0.706, 0.016, 0.150];
			break;
	}

	var valueScaled = (currValue - minValue)/(maxValue - minValue);
	var midpointValueScaled = (midpointValue - minValue)/(maxValue - minValue);

	var lowerColor;
	var upperColor;
	var percentFade;
	if (valueScaled < midpointValueScaled)
	{
		lowerColor = lowColor;
		upperColor = midpoint;
		percentFade = valueScaled/midpointValueScaled;
	}
	else // value Scaled >= 0.5
	{
		lowerColor = midpoint;
		upperColor = highColor;
		percentFade = (valueScaled-midpointValueScaled)/(midpointValueScaled);
	}
	var diffRed = upperColor[0] - lowerColor[0];
	var diffGreen = upperColor[1] - lowerColor[1];
	var diffBlue = upperColor[2] - lowerColor[2];

	diffRed = (diffRed * percentFade) + lowerColor[0];
	diffGreen = (diffGreen * percentFade) + lowerColor[1];
	diffBlue = (diffBlue * percentFade) + lowerColor[2];

	return [diffRed, diffGreen, diffBlue];
}

function grayscaleColormap(minValue, maxValue, currValue){
	var valueScaled = (currValue - minValue)/(maxValue - minValue);
	var lowerColor = [1.0, 1.0, 1.0];
	var upperColor = [0.0, 0.0, 0.0];
	var percentFade = valueScaled;

	var diffRed = upperColor[0] - lowerColor[0];
	var diffGreen = upperColor[1] - lowerColor[1];
	var diffBlue = upperColor[2] - lowerColor[2];

	diffRed = (diffRed * percentFade) + lowerColor[0];
	diffGreen = (diffGreen * percentFade) + lowerColor[1];
	diffBlue = (diffBlue * percentFade) + lowerColor[2];

	return [diffRed, diffGreen, diffBlue];
}

function createColorMapFromHexValues(hexValues) {
	var colorsMap = [];
	var currColor;
	for (var counter = 0; counter < hexValues.length; counter++)
	{
		currColor = hexToRgb(hexValues[counter]);
		colorsMap.push({x: (counter / (hexValues.length-1)), o: 1.0, r: currColor.r/255, g: currColor.g/255, b: currColor.b/255 });
	}
	return colorsMap;
}

function createColorMapFromXORGB(xorgb) {
	var colorsMap = [];
	var currColor;
	for (var i = 0; i < xorgb.length; i++) {
		currColor = xorgb[i];
		colorsMap.push({x: currColor.x, o: currColor.o, r: currColor.r, g: currColor.g, b: currColor.b});
	}
	return colorsMap;
}

function reverseColorMap(colorMap) {
	var colorsMap = [];
	var currColor;
	for (var counter = colorMap.length-1; counter >= 0; counter--)
	{
		currColor = colorMap[counter];
		colorsMap.push({x: 1-currColor.x, o: currColor.o, r: currColor.r, g: currColor.g, b: currColor.b });
	}
	return colorsMap;
}

var ColorMaps = [];
var ColorMenuItems = {};
var ColorMenuData = [];

function GetColorMap (colorMapName) {
	return ColorMaps.filter(function (obj) {
		return obj.FullName == colorMapName;
	})[0].ColorMap;
}

function GetLocationOfColorMap (fullName) {
	return ColorMaps.map(function(e) { return e.FullName; }).indexOf(fullName);
}

// Function comes from slightly modifying:
// http://stackoverflow.com/questions/18184380/create-a-dynamic-unordered-list-using-a-javascript-function
function generateColorMapList(data) {
	var i, item, ref = {}, counts = {};
	function ul() {return document.createElement('ul');}
	function li(element) {
		var e = document.createElement('li');
		if (!element.hasOwnProperty('ColorMap')) {
			e.appendChild(document.createTextNode(element['name']));
		} else {
			e.appendChild(document.createElement('div'));
			e.childNodes[0].setAttribute('ColorMap', element.ColorMap);
			e.childNodes[0].setAttribute('FullName', element.FullName);
			e.childNodes[0].setAttribute('Name', element.Name);

			// Draw small preview gradient in menu
			{
				var w = 20, h = 16;
				var child = e.childNodes[0].appendChild(document.createElement('span'));

				var key = d3.select(child).append("svg").attr("width", w).attr("height", h);
				var gradientId = element.FullName.replaceAll(" ", "_").replaceAll("|", "_");
				var legend = key.append("defs").append("svg:linearGradient").attr("id", gradientId)
						.attr("x1", "0").attr("y1", "0").attr("x2", "0").attr("y2", "1");//.attr("spreadMethod", "pad");

				for (var currPercentage = 0; currPercentage <= 1.0; currPercentage += 0.05) {
					var offsetString = (currPercentage * 100).toString() + "%";
					var currColors;
					currColors = customColorMapByPercentage(element.ColorMap, 0.0, 1.0, 1.0 - currPercentage);
					var colorsHex = rgbToHex(Math.round(currColors[0]*255),
							Math.round(currColors[1]*255),
							Math.round(currColors[2]*255));
					legend.append("stop").attr("offset", offsetString).attr("stop-color", colorsHex).attr("stop-opacity", 1);
				}
				key.append("rect").attr("x", 0).attr("y", 0).attr("width", w-4).attr("height", h)
						.style("fill", "url(#" + gradientId + ")");//.attr("transform", "translate(0,10)");
			}
			e.childNodes[0].appendChild(document.createTextNode(element['name']));
		}
		return e;
	}

	ref[0] = ul();
	ref[0].setAttribute("id", "colormapMenu");
	counts[0] = 1;
	for (i = 0; i < data.length; ++i) {
		var currNode = ref[data[i].parentId].appendChild(li(data[i])); // create <li>
		ref[data[i].id] = ul(); // assume + create <ul>
		//ref[data[i].parentId].appendChild(ref[data[i].id]);
		currNode.appendChild(ref[data[i].id]);
		counts[data[i].id] = 0;
		counts[data[i].parentId] += 1;
	}
	for (i in counts) {// for every <ul>
		if (counts[i] === 0) {// if it never had anything appened to it
			ref[i].parentNode.removeChild(ref[i]); // remove it
			//ref[data[i].id].setAttribute("dbName", data[i].DatabaseStore);
		}
	}
	return ref[0];
}


function createColorMaps() {

	// Load Color Maps from json "RawColorMaps"
	for (var i = 0; i < RawColorMaps.length; i++ ) {
		var curr = RawColorMaps[i];
		var currColorMap;
		if (curr.BuildFunction == "HEX") {
			currColorMap = createColorMapFromHexValues(curr.Values);
		} else if (curr.BuildFunction == "xorgb"){
			currColorMap = createColorMapFromXORGB(curr.Values);
		}
		ColorMaps.push({
			FullName: curr.FullName,
			ColorMap: currColorMap,
			Function: curr.Function
		});
		ColorMaps.push({
			FullName: curr.FullName + " Inverse",
			ColorMap: reverseColorMap(currColorMap),
			Function: curr.Function
		});
	}

	// Rainbow Colormap
	{
		var rainbowColormap = [];
		for (var currPercentage = 0.0; currPercentage < 1.01; currPercentage +=0.01)
		{
			var currValue = rainbowColormapCreator(0.0, 1.0, currPercentage);
			var r = currValue[0];
			var g = currValue[1];
			var b = currValue[2];
			rainbowColormap.push({x: currPercentage, o: 1.0, r: r, g: g, b: b});
		}
		ColorMaps.push({
			FullName: "Other|Rainbow",
			ColorMap: rainbowColormap,
			Function: "customColorMap"
		});
		ColorMaps.push({
			FullName: "Other|Rainbow Inverse",
			ColorMap: reverseColorMap(rainbowColormap),
			Function: "customColorMap"
		});
	}

	// All these color maps came from: http://www.paraview.org/ParaView3/index.php/Default_Color_Map
	{
		// Blackbody Radiation
		// Cool to Warm
		// Gray Scale
		// Spatial Contrast
	}

	// Resort the colormap alphabetically
	ColorMaps.sort(function(a,b){
		var x = a.FullName < b.FullName? -1:1;
		return x;
	});

	// Organize the structure into something "nice" so we can load it properly
	var currId = 0;
	ColorMenuItems.id = 0;
	for (var counter = 0; counter < ColorMaps.length; counter++) {
		var datasetStructure = ColorMaps[counter].FullName.split("|");
		var currStructure = datasetStructure;
		var currMenu = ColorMenuItems;
		var parentId = 0;

		for (var structCounter = 0; structCounter < currStructure.length; structCounter++) {
			var currProperty = currStructure[structCounter];
			if(!currMenu.hasOwnProperty(currProperty)) {
				currMenu[currProperty] = {};
				currMenu[currProperty].id = ++currId;
				currMenu[currProperty].parentId = parentId;
				if (structCounter === currStructure.length - 1) {
					ColorMenuData.push({
						id: currId,
						parentId: parentId,
						name: currProperty,
						FullName: ColorMaps[counter].FullName,
						ColorMap: ColorMaps[counter].ColorMap,
						Function: ColorMaps[counter].Function
					});
				} else {
					ColorMenuData.push({
						id: currId,
						parentId: parentId,
						name: currProperty
					});
				}
			}
			parentId = currMenu[currProperty].id;
			currMenu = currMenu[currProperty];
		}
	}
	return colorMaps;
}

var colorMaps = createColorMaps();

function customColorMap(colormap, minValue, maxValue, currValue){
	var valueScaled = (currValue - minValue)/(maxValue - minValue);

	if (currValue < minValue) {
		var lowerColor = [colormap[0].r, colormap[0].g, colormap[0].b];
		var upperColor = [colormap[0].r, colormap[0].g, colormap[0].b];
		var percentFade = 1.0;
	} else if (currValue > maxValue) {
		var curLoc = colormap.length-1;
		var lowerColor = [colormap[curLoc].r, colormap[curLoc].g, colormap[curLoc].b];
		var upperColor = [colormap[curLoc].r, colormap[curLoc].g, colormap[curLoc].b];
		var percentFade = 1.0;
	} else {
		for (var i = 1; i < colormap.length; i++) {
			if (valueScaled >= colormap[i - 1].x && valueScaled <= colormap[i].x) {
				var lowerColor = [colormap[i - 1].r, colormap[i - 1].g, colormap[i - 1].b];
				var upperColor = [colormap[i].r, colormap[i].g, colormap[i].b];
				var percentFade = (valueScaled - colormap[i - 1].x) / (colormap[i].x - colormap[i - 1].x);
				break;
			} else if (i == colormap.length - 1 && valueScaled > colormap[i].x) {

				break;
			}
		}
	}

	var diffRed = upperColor[0] - lowerColor[0];
	var diffGreen = upperColor[1] - lowerColor[1];
	var diffBlue = upperColor[2] - lowerColor[2];

	diffRed = (diffRed * percentFade) + lowerColor[0];
	diffGreen = (diffGreen * percentFade) + lowerColor[1];
	diffBlue = (diffBlue * percentFade) + lowerColor[2];

	return [diffRed, diffGreen, diffBlue];
}

function customColorMapWithMidpoint(colormap, minValue, midpoint, maxValue, currValue){

	var valueScaled;
	if (currValue < midpoint) {
		valueScaled = (currValue - minValue)/(midpoint - minValue)/2.0;
	} else if (currValue > midpoint) {
		valueScaled = (currValue - midpoint)/(maxValue - midpoint)/2.0 + 0.5;
	} else {
		valueScaled = 0.5;
	}

	if (currValue < minValue) {
		var lowerColor = [colormap[0].r, colormap[0].g, colormap[0].b];
		var upperColor = [colormap[0].r, colormap[0].g, colormap[0].b];
		var percentFade = 1.0;
	} else if (currValue > maxValue) {
		var curLoc = colormap.length-1;
		var lowerColor = [colormap[curLoc].r, colormap[curLoc].g, colormap[curLoc].b];
		var upperColor = [colormap[curLoc].r, colormap[curLoc].g, colormap[curLoc].b];
		var percentFade = 1.0;
	} else {
		for (var i = 1; i < colormap.length; i++) {
			if (valueScaled >= colormap[i - 1].x && valueScaled <= colormap[i].x) {
				var lowerColor = [colormap[i - 1].r, colormap[i - 1].g, colormap[i - 1].b];
				var upperColor = [colormap[i].r, colormap[i].g, colormap[i].b];
				var percentFade = (valueScaled - colormap[i - 1].x) / (colormap[i].x - colormap[i - 1].x);
			}
		}
	}
	var diffRed = upperColor[0] - lowerColor[0];
	var diffGreen = upperColor[1] - lowerColor[1];
	var diffBlue = upperColor[2] - lowerColor[2];

	diffRed = (diffRed * percentFade) + lowerColor[0];
	diffGreen = (diffGreen * percentFade) + lowerColor[1];
	diffBlue = (diffBlue * percentFade) + lowerColor[2];

	return [diffRed, diffGreen, diffBlue];
}

function customColorMapWithMidpointByPercentage(colormap, minValue, midpoint, maxValue, percentage)
{
	var currValue = ((maxValue - minValue)*percentage ) + minValue;
	return customColorMapWithMidpoint(colormap, minValue, midpoint, maxValue, currValue);
}

function customColorMapByPercentage(colormap, minValue, maxValue, percentage)
{
	var currValue = ((maxValue - minValue)*percentage ) + minValue;
	return customColorMap(colormap, minValue, maxValue, currValue);
}