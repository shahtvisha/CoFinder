//var $ = require('jQuery');
// $("<h1>test passes</h1>").appendTo("body");
// console.log($("body").html());
//console.log($)
$(".addToCart").click(function (obj) {
    obj.preventDefault();
    console.log("CLICK")
    var result = $(this).attr("for"); // captures ID
    console.log(result)


    $.post("/cart-action", {productid:result}, function(res){
        console.log("Res from cart-action")
        console.log(res)

    })
})

$(".delete-from-cart").click(function (obj) {
    var currentAn = $(this);
    var proID= $(this).attr("for")
    $.post("/delete-product", {proValue: proID}, function(res){
        currentAn.parent().parent().fadeOut(1000);
    })

});

$(".domRecord").click(function (obj) {
    obj.preventDefault();
    //prevent default behaviour of anchor tag
    // alert()
    var ans = $(this).attr("for");
    // console.log(ans);

    var rec = { projectDomain: ans };
    // console.log(rec);

    $.post("/filter-project", rec, function (res) {
        console.log(res);
        var answer = res['msg'];
        console.log(answer);

        if (answer.length > 0) {
            content = ``;
            answer.forEach(function (val) {
                content = content+ `
                <div class="container">
                  <div class="row">
                     <div class="col-md-4">
                        <div class="card" style="width: 18rem;">   
                        <div class="card-body">          
     
                      <h5 class="card-title"><b>${val.projectName}</b></h5>
                      <p class="card-text">${val.projectDesc}</p> 
                      <b><p>Domain :</p></b>
                      <p class="card-text">${val.projectDomain}</p>
                      <b><p>Deadline :</p></b>
                      <p class="card-text">${val.projectDeadline}</p>
                      <b>Project Head:</b>
                      <p class="card-text">${val.projectHeadName}</p>
                      <a href="#" class="btn btn-primary addToCart" id="addToCart" for="${val._id}">Connect</a>
                      <br />
                      <p></p>
                      <a href="#" class="btn btn-primary" id="" for="">View ReadMe/Overview</a>
                    </div>
                  </div> 
                  </div>
                  </div>
                  </div>
                  <br />
                  <br />`


            });
            $(".project-cont").html(content)
        }
        else {
            $(".project-cont").html("No Data")
        }
    });
})

