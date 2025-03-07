
function transposeChord(originalKey, targetKey, chord) {
  if (!chord || typeof chord !== "string") {
    return "Invalid chord format";
  }

  var scales_sharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  var scales_flat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  
  var scales = scales_sharp;

  // 計算原調與目標調之間的半音變化
  var originalIndex = scales.indexOf(originalKey);
  var targetIndex = scales.indexOf(targetKey);
  var semitoneShift = targetIndex - originalIndex;

  // 修正正則表達式，正確解析和弦結構
  var match = chord.match(/^([A-G#b]+)(m|m7|maj7?|dim|aug|sus[24]?|add[9]|[0-9]*)?(\/([A-G#b]+))?$/);
  if (!match) {
    return "Invalid chord format";
  }

  var root = match[1]; // 和弦的根音
  var chordType = match[2] || ""; // 和弦類型（如 m7、add9）
  var bass = match[4]; // 低音（可選）

  // 轉換根音
  var rootIndex = scales.indexOf(root);
  if (rootIndex === -1) {
    scales = scales_flat;
    rootIndex = scales.indexOf(root);
  }
  if (rootIndex === -1) {
    return "Invalid chord root";
  }

  var newRootIndex = (rootIndex + semitoneShift + scales.length) % scales.length;
  var newRoot = scales[newRootIndex];

  // 轉換低音（如果有）
  var newBass = "";
  if (bass) {
    var bassIndex = scales.indexOf(bass);
    if (bassIndex === -1) {
      scales = scales_flat;
      bassIndex = scales.indexOf(bass);
    }
    if (bassIndex !== -1) {
      var newBassIndex = (bassIndex + semitoneShift + scales.length) % scales.length;
      newBass = scales[newBassIndex];
    }
  }

  // 組合新和弦
  return newBass ? `${newRoot}${chordType}/${newBass}` : `${newRoot}${chordType}`;
}


// 更新頁面和弦
function updateChords(originalKey, targetKey) {
  var chordElements = document.querySelectorAll(".tf");

  for (var i = 0; i < chordElements.length; i++) {
    var element = chordElements[i];
    var originalChord = element.textContent.trim();

    if (!originalChord) {
      continue;
    }

    var transposedChord = transposeChord(originalKey, targetKey, originalChord);
console.log("originalKey:" + originalKey + "_TO_" + targetKey + "_RESULT_" + originalChord + "_TO_" + transposedChord);

    if (transposedChord !== "Invalid chord format" && transposedChord !== "Invalid chord root") {
      
	  
	  //element.textContent = originalChord + " [" + transposedChord + "]";
	  //element.textContent = "[" + transposedChord + "]";
	  element.textContent = transposedChord;
    }
  }
}


//window.addEventListener("load", function () {
  
  //remove add
	var adventiseWindow = document.getElementById("viptoneWindow");
	if (adventiseWindow){
		adventiseWindow.style.visibility = "hidden";
	}
	setTimeout(function(){
		//移掉廣告
      $('div[id^="adGeek-slot-div"],.adsbygoogle,.GoogleActiveViewInnerContainer,.mys-wrapper').remove();
	  $("section.header").prevAll().first().remove();
		console.log("remove ad~");
			
		console.log("ready to handle click ky");
		//Keys function
	  $(".keys>.ks> span").click(function(event) {
		console.log("key click event");
		//var okey = $($(".keys>.ks>span.select")[0]).attr("key");
		var okey = $($(".plays>.capo>span.select")[0]).attr("key");
		var tkey = $(this).attr("key");
		
		
		console.log("tkey:" + tkey);
		
		$(".keys>.ks >span.select").removeClass("select");
		$('.keys>.ks >span[key="' + tkey + '"]').addClass("select");
		console.log("original key:" + $($(".capo>.select")[0]).attr("key"));
		console.log("target key:" + tkey);
		// 停止事件的預設行為和傳遞
		event.preventDefault();  // 防止原本的點擊行為
		event.stopImmediatePropagation();  // 停止事件冒泡

		// 執行 window.postMessage
		window.postMessage({
		 action: "callupdateChords",
		 oKey: okey, // 第一個參數
		 tKey: tkey  // 第二個參數
		}, "*");

		$(".alertwin .box button").click();
		
		window.showLoginAlert = function() {
			console.log("pass");
		};
		console.log("showLoginAlert 已被覆蓋");

	  });
	  console.log("after handle click ky");
		//Capo/Play function
	  $(".capo > span").click(function(event) {
		console.log("click event");
		var okey = $($(".capo>.select")[0]).attr("key");
		var tkey = $(this).attr("key");
		console.log("tkey:" + tkey);
		
		$(".capo>.select").removeClass("select");
		$('.capo>span[key="' + tkey + '"]').addClass("select");
		console.log("original key:" + $($(".capo>.select")[0]).attr("key"));
		console.log("target key:" + tkey);
		// 停止事件的預設行為和傳遞
		event.preventDefault();  // 防止原本的點擊行為
		event.stopImmediatePropagation();  // 停止事件冒泡

		// 執行 window.postMessage
		window.postMessage({
		 action: "callupdateChords",
		 oKey: okey, // 第一個參數
		 tKey: tkey  // 第二個參數
		}, "*");

		$(".alertwin .box button").click();
		
		window.showLoginAlert = function() {
			console.log("pass");
		};
		console.log("showLoginAlert 已被覆蓋");

	  });
	  
	}, 3000);
//});
