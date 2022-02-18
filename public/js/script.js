//<div class="moviesIn">
//    <button class="movBtn" onclick="showModal()">
//        <div class="item">
//            <div class="poster"><img id = "posterPic" src = {{ poster }}></div>
//            <div class="infoItem">
//                <span id="titleItem">{{ title }}</span> <br><br>
//                <span id="direcItem">{{ director }}</span> <br><br>
//                <span class="descItem"> {{ synopsis }}</span>
//                <br>
//            </div>
//        </div>
//    </button>
//
//    <div class="spacer">
//        <br>
//    </div>
//</div>

$(document).ready(function() {
    function addListBtn(item, parentDiv) {
        var infoItem = document.createElement('div');
        var poster = document.createElement('div');
        var item = document.createElement('div');
        var moviesIn = document.createElement('div');
        var spacer = document.createElement('div');
        
        var br = document.createElement('br');
        var titleItem = document.createElement('span');
        var direcItem = document.createElement('span');
        var descItem = document.createElement('span');
        var posterPic = document.createElement('img');
        var movBtn = document.createElement('button');
        
        $(infoItem).addClass("infoItem");
        $(poster).addClass("poster");
        $(item).addClass("item");
        $(moviesIn).addClass("moviesIn");
        $(spacer).addClass("spacer");
        $(titleItem).addClass("titleItem");
        $(direcItem).addClass("direcItem");
        $(descItem).addClass("descItem");
        $(posterPic).addClass("posterPic");
        $(movBtn).addClass("movBtn");
        
        $(posterPic).attr("src", item.poster);
        $(titleItem).text(item.title);
        $(direcItem).text(item.director);
        $(descItem).text(item.sysnopsis);
        $(movBtn).attr("onlick", "showModal()");
        
        spacer.append(br);
        
        poster.append(posterPic);
        
        infoItem.append(titleItem);
        infoItem.append(br);
        infoItem.append(br);
        infoItem.append(direcItem);
        infoItem.append(br);
        infoItem.append(br);
        infoItem.append(descItem);
        infoItem.append(br);
        
        item.append(poster);
        item.append(infoItem);
        
        movBtn.append(item);
        
        moviesIn.append(movBtn);
        moviesIn.append(spacer);
        
        parentDiv.append(moviesIn);
    };
    
    //<div class="itmContainer">
    //    <a href="/{{ listID }}">
    //        <div class="ltItem">
    //            <img src="assets/sample.jpg" class="listPic">
    //            <div class="ltName">
    //                <h2 class="ltText">
    //                    {{ ltname }}
    //                </h2>
    //            </div>
    //        </div>
    //    </a>
    //</div>
    
    function addItemCont(item, parentDiv) {
        var ltName = document.createElement('div');
        var ltItem = document.createElement('div');
        var itmContainer = document.createElement('div');
        
        var a = document.createElement('a');
        var listPic = document.createElement('img');
        var ltText = document.createElement('h2');
        
        $(ltName).addClass("ltName");
        $(ltItem).addClass("ltItem");
        $(listPic).addClass("listPic");
        $(ltText).addClass("ltText");
        $(itmContainer).addClass("itmContainer");
        
        $(a).attr("href", "/"+item._id);
        $(listPic).attr("src", "assets/poster.png");
        $(ltText).text(item.ltname);
        
        ltName.append(ltText);
        
        ltItem.append(listPic);
        ltItem.append(ltName);
        
        a.append(ltItem);
        
        itmContainer.append(a);
        
        parentDiv.append(itmContainer);
    };
    
    //<div class="resultsCt">
    //    <div class="resultItmCT">
    //        <div class="resultItem">
    //            <div id = "itmPoster">
    //                <img id = "actualPoster" src="assets/sample10.jpg">
    //            </div>
    //            <div id="itmInfo">
    //                <span id="resultItemType">Movie</span><br>
    //                <div class="spacerTitle"></div>
    //                <span id="resultItemTitle">Harry Potter and the Sorcerer's Stone</span> <br>
    //                <span id="resultItemYear">(2001)</span><br><br>
    //                <button id="moreInfo" style="vertical-align: middle;" onclick="showModal()"><span>More Info</span></button>
    //                <button id="addToList" style="vertical-align: middle;" onclick="location.href='list.html'"><span>Add to BingeList</span></button>
    //            </div>
    //        </div>
    //    </div>
    //
    //    <div class="spacer">
    //        <br>
    //    </div>
    //</div>
    
    function addResultsCt(item, parentDiv) {
        var spacerTitle = document.createElement('div');
        var spacerTitle1 = document.createElement('div');
        var spacerTitle2 = document.createElement('div');
        var spacerTitle3 = document.createElement('div');
        var spacerTitle4 = document.createElement('div');
        var spacerTitle5 = document.createElement('div');
        var itmInfo = document.createElement('div');
        var itmPoster = document.createElement('div');
        var resultItem = document.createElement('div');
        var resultItmCT = document.createElement('div');
        var spacer = document.createElement('div');
        
        var form = document.createElement('form');
        var listID = document.createElement('input');
        var movieID = document.createElement('input');
        var poster = document.createElement('input');
        var title = document.createElement('input');
        var year = document.createElement('input');
        var synopsis = document.createElement('input');
        var director = document.createElement('input');
        var submit = document.createElement('input');
        
        var path = location.pathname;
        path = path.replace('/','')
        
        $(form).attr("action", "/add-to-list");
        $(form).attr("method", "post");
        $(listID).attr("type", "hidden");
        $(listID).attr("value", path);
        $(listID).attr("name", "listID")
        
        $(movieID).attr("type", "hidden");
        $(movieID).attr("value", item._id);
        $(movieID).attr("name", "movieID");
        
        $(poster).attr("type", "hidden");
        $(poster).attr("value", item.poster);
        $(poster).attr("name", "poster");
        
        $(title).attr("type", "hidden");
        $(title).attr("value", item.title);
        $(title).attr("name", "title");
        
        $(year).attr("type", "hidden");
        $(year).attr("value", item.year);
        $(year).attr("name", "year");
        
        $(synopsis).attr("type", "hidden");
        $(synopsis).attr("value", item.synopsis);
        $(synopsis).attr("name", "synopsis");
        
        $(director).attr("type", "hidden");
        $(director).attr("value", item.director);
        $(director).attr("name", "director");
        
        $(submit).attr("type", "submit");
        $(submit).attr("id", "addToList");
        $(submit).attr("style", "vertical-align: middle;");
        $(submit).attr("value", "Add to List");
        
        var bigContainer = document.createElement('div');
        
        $(bigContainer).addClass("bigContainer");
        
//        var resultsCt = document.createElement('div');
        
        var resultItemType = document.createElement('span');
        var resultItemTitle = document.createElement('span');
        var resultItemYear = document.createElement('span');
        var moreInfo = document.createElement('span');
        var moreInfoBtn = document.createElement('button');
        var addToList = document.createElement('span');
        var addToListBtn = document.createElement('button');
        var actualPoster = document.createElement('img');
        var br = document.createElement('br');
        
        var formDiv = document.createElement('div');
        
        
//        $(resultsCt).addClass("resultsCt");
        $(resultItmCT).addClass("resultItmCT");
        $(resultItem).addClass("resultItem");
        $(spacerTitle).addClass("spacerTitle");
        $(spacerTitle1).addClass("spacerTitle");
        $(spacerTitle2).addClass("spacerTitle");
        $(spacerTitle3).addClass("spacerTitle");
        $(spacerTitle4).addClass("spacerTitle");
        $(spacerTitle5).addClass("spacerTitle");
        $(spacer).addClass("spacer");
        
        $(formDiv).attr("style", "display: flex;")
        $(itmPoster).attr("id", "itmPoster");
        $(actualPoster).attr("id", "actualPoster");
        $(actualPoster).attr("src", item.poster);
        $(itmInfo).attr("id", "itmInfo");
        $(resultItemType).attr("id", "resultItemType");
        $(resultItemType).text("Movie");
        $(resultItemTitle).attr("id", "resultItemTitle");
        $(resultItemTitle).text(item.title);
        $(resultItemYear).attr("id", "resultItemYear");
        $(resultItemYear).text("("+item.year+")");
        $(moreInfoBtn).attr("id", "moreInfo");
        $(moreInfoBtn).attr("style", "vertical-align: middle;");
        $(moreInfoBtn).attr("onclick", "showInfo(\"" + item._id + "\")");
        $(moreInfo).text("More Info");
//        $(addToListBtn).attr("id", "addToList");
//        $(addToListBtn).attr("style", "vertical-align: middle;");
//        $(addToListBtn).attr("onclick", "location.href=\'" + window.location.href + "/" + item._id + "/add-to-list\'");
//        $(addToList).text("Add to BingeList");
        
        moreInfoBtn.append(moreInfo);
//        addToListBtn.append(addToList);
//        form.append(moreInfoBtn);
        form.append(listID);
        form.append(movieID);
        form.append(poster);
        form.append(title);
        form.append(year);
        form.append(synopsis);
        form.append(director);
        form.append(submit);
        
        itmPoster.append(actualPoster);
        
        itmInfo.append(resultItemType);
        itmInfo.append(br);
        itmInfo.append(spacerTitle1);
        itmInfo.append(resultItemTitle);
        itmInfo.append(br);
        itmInfo.append(spacerTitle2);
        itmInfo.append(resultItemYear);
        itmInfo.append(br);
        itmInfo.append(br);
        itmInfo.append(spacerTitle3);
//        itmInfo.append(spacerTitle);
//        itmInfo.append(moreInfoBtn);
//        itmInfo.append(addToListBtn);
        
        formDiv.append(moreInfoBtn);
        formDiv.append(form);
        itmInfo.append(formDiv);
        
        resultItem.append(itmPoster);
        resultItem.append(itmInfo);
        
        resultItmCT.append(resultItem);
        
        spacer.append(br);
        
//        resultsCt.append(resultItmCT);
//        resultsCt.append(spacer);
        
        bigContainer.append(resultItmCT);
        bigContainer.append(spacer);
        
        parentDiv.append(bigContainer);
    };
    
    function addSpacer(parentDiv) {
        var spacer = document.createElement('div');
        var br = document.createElement('br');
        
        $(spacer).addClass("spacer");
        
        spacer.append(br);
        
        parentDiv.append(spacer);
    };
    
//    function showInfo(id) {
//        $.get('getInfo', function(data, status) {
//            console.log(data);
//            var itemModal = $('#itmModal');
//
//            var movie = data.filter(function(item) { 
//                return item._id === id;
//            });
//
//            movie.forEach((item, i) => {
//                addItemInfoModal(item, itemModal);
//                console.log(item);
//            })
//        });
//        
//        $('#itmModal').attr("style", "display: block;");
//    };
    
    $.get('getLists', function(data, status) {
//        console.log(data);
        var listContainer = $('.ltContainer');
        
        data.forEach((item, i) => {
            addItemCont(item, listContainer);
        });
    });
    
//    $.get('getListMovies', function(data, status) {
//        console.log(data);
//        var movieContainer = $('.moviesCt');
//        
//        data.forEach((item, i) => {
//            addListBtn(item, movieContainer);
//        });
//    })
    
    $.get('getMovies', function(data, status) {
//        console.log(data);
        var movieContainer = $('.resultsCt');
        var itemModal = $('#itmModal');
        
        data.forEach((item, i) => {
            addResultsCt(item, movieContainer);
            
//            addItemInfoModal(item, itemModal);
//            console.log(item);
        });
    });
    
    $("#searchBox").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        
        $(".ltContainer .itmContainer").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
        
        $(".result .bigContainer").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
    
//    function addItemToList(id) {
//        var newItem = {
//            listID: 
//            movieID: 
//        }
//        
//        $.post('addToList', newStudent, function (data, status) {
//            var movieListContainer = $('.moviesIn');
//            addListBtn(data, movieListContainer);
//        });
//    }
//    
    
    
    
    
//<div id="itmModal" class="modal">
//    <!-- Modal content -->
//    <div class="modal-content">
//        <span class="close">&times;</span>
//        <div class="itmModalIn">
//            <div class="headerMd"> 
//                <div class="posterMd"><img id = "posterPicMd" src = "assets/sample.jpg"></div>
//                <div class="infoItemMd">
//                    <span id="titleItemMd">Avengers: Endgame</span> <br>
//                    <span id="direcItemMd">Director: </span> <br> 
//                    <br>
//                    <button class="react" onclick="location.href='http://www.google.com'"> <img id="shk" src="assets/reactSHK.png"> </button>
//                    <button class="react" onclick="location.href='http://www.google.com'"> <img id="cry" src="assets/reactCRY.png"> </button>
//                    <button class="react" onclick="location.href='http://www.google.com'"> <img id="eww" src="assets/reactEWW.png"> </button>
//                    <button class="react" onclick="location.href='http://www.google.com'"> <img id="luv" src="assets/reactLUV.png"> </button>
//                    <br><br>
//                    <button id="addToList" style="vertical-align: middle;" onclick="location.href='list.html'"><span>Add to BingeList</span></button>
//                </div>
//            </div>
//
//            <div class="descCtMd">
//                <h3 id="synopsis">Synopsis:</h3>
//                <p id="descItemMd">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
//                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
//                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
//                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
//            </div>
//        </div>
//    </div>
//</div>
    
//    function addItemInfoModal(item, parentDiv) {
//        var modal_content = document.createElement('div');
//        var itmModalIn = document.createElement('div');
//        var headerMd = document.createElement('div');
//        var posterMd = document.createElement('div');
//        var infoItemMd = document.createElement('div');
////        var direcItemMd = document.createElement('div');
//        var descCtMd = document.createElement('div');
//        
//        var br1 = document.createElement('br');
//        var br2 = document.createElement('br');
//        var br3 = document.createElement('br');
//        var br4 = document.createElement('br');
//        var br5 = document.createElement('br');
//        
//        var close = document.createElement('span');
//        var posterPicMd = document.createElement('img');
//        var titleItemMd_text = document.createElement('span');
//        var direcItemMd_text = document.createElement('span');
//        var react1 = document.createElement('button');
//        var react1img = document.createElement('img');
//        var react2 = document.createElement('button');
//        var react2img = document.createElement('img');
//        var react3 = document.createElement('button');
//        var react3img = document.createElement('img');
//        var react4 = document.createElement('button');
//        var react4img = document.createElement('img');
//        var addToList = document.createElement('button');
//        var addToList_text = document.createElement('span');
//        var synopsis = document.createElement('h3');
//        var descItemMd = document.createElement('p')
//        
//        $(modal_content).addClass("modal-content");
//        $(itmModalIn).addClass("itmModalIn");
//        $(headerMd).addClass("headerMd");
//        $(posterMd).addClass("posterMd");
//        $(infoItemMd).addClass("infoItemMd");
//        $(descCtMd).addClass("infoItemMd");
//        $(react1).addClass("react");
//        $(react2).addClass("react");
//        $(react3).addClass("react");
//        $(react4).addClass("react");
//        
//        $(close).addClass("close");
//        $(close).text("×");
//        $(posterPicMd).attr("src", item.poster);
//        $(posterPicMd).attr("id", "posterPicMd");
//        $(titleItemMd_text).attr("id", "titleItemMd");
//        $(direcItemMd_text).attr("id", "direcItemMd");
//        $(titleItemMd_text).text(item.title);
//        $(direcItemMd_text).text(item.director);
//        $(react1).attr("onclick", "location.href=window.location.href/" + item._id + "/react1");
//        $(react2).attr("onclick", "location.href=window.location.href/" + item._id + "/react2");
//        $(react3).attr("onclick", "location.href=window.location.href/" + item._id + "/react3");
//        $(react4).attr("onclick", "location.href=window.location.href/" + item._id + "/react4");
//        $(react1img).attr("id", "shk");
//        $(react2img).attr("id", "cry");
//        $(react3img).attr("id", "eww");
//        $(react4img).attr("id", "luv");
//        $(react1img).attr("src", "assets/reactSHK.png");
//        $(react2img).attr("src", "assets/reactCRY.png");
//        $(react3img).attr("src", "assets/reactEWW.png");
//        $(react4img).attr("src", "assets/reactLUV.png");
//        $(addToList).attr("id", "addToList");
//        $(addToList).attr("style", "vertical-align: middle;");
//        $(addToList).attr("onclick", "location.href=window.location.href/" + item._id + "/add-to-list");
//        $(addToList_text).text("Add to BingeList");
//        $(synopsis).attr("id", "sysnopsis");
//        $(synopsis).text("Synopsis:");
//        $(descItemMd).attr("id", "descItemMd");
//        $(descItemMd).text(item.synopsis);
//        
//        posterMd.append(posterPicMd);
//        
//        react1.append(react1img);
//        react2.append(react2img);
//        react3.append(react3img);
//        react4.append(react4img);
//        
//        addToList.append(addToList_text);
//        
//        infoItemMd.append(titleItemMd_text);
//        infoItemMd.append(br1);
//        infoItemMd.append(direcItemMd_text);
//        infoItemMd.append(br2);
//        infoItemMd.append(br3);
//        infoItemMd.append(react1);
//        infoItemMd.append(react2);
//        infoItemMd.append(react3);
//        infoItemMd.append(react4);
//        infoItemMd.append(br4);
//        infoItemMd.append(br5);
//        infoItemMd.append(addToList);
//        
//        descCtMd.append(synopsis);
//        descCtMd.append(descItemMd);
//        
//        headerMd.append(posterMd);
//        headerMd.append(infoItemMd);
//        
//        itmModalIn.append(headerMd);
//        itmModalIn.append(descCtMd);
//        
//        modal_content.append(close);
//        modal_content.append(itmModalIn);
//        
//        parentDiv.append(modal_content);
//    };
});
