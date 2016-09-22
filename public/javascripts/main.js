function init_nano_scroll(){
  $(".nano").nanoScroller()
}
function init_layout(){
  var p_layout_list = $("body.layout-list")
  var p_layout_detail = $("body.layout-detail")

  if(p_layout_list.length == 1){
    var p_header = p_layout_list.find("section.header")
    var p_header_main_wrapper = p_header.find(".header-wrapper");
    var p_header_action = p_header.find(".action-wrapper")
    var p_header_action_content = p_header_action.find(".action-content")
    var p_header_action_trigger =p_header_action.find(".action-trigger")
    var p_blank_layer = p_layout_list.find("section.blank-layer")
    var p_content = p_layout_list.find("section.content")

    function expand(status){
      if(status){
        p_header_action_content.css({"margin-top": 0})
        p_header_action.attr("expand", 1)
        p_header_action_trigger.text("Filter")
        p_blank_layer.removeClass("hidden")
      } else {
        p_header_action_content.css({
          "margin-top": p_header_action_content.outerHeight() * -1
        })
        p_header_action.attr("expand", 0)
        p_header_action_trigger.text("Click here to filter your recipe")
        p_blank_layer.addClass("hidden")
      }
    }

    p_header_action_trigger.unbind().on("click", function(){
      if(p_header_action.attr("expand") == 0){
        expand(true)
      } else {
        expand(false)
      }
    })
    expand(false)
    setTimeout(function(){
      p_content.css({"opacity":1,"padding-top":p_header.outerHeight()})
    }, 500)
  } else if(p_layout_detail.length == 1){
    var p_header = p_layout_detail.find("section.header")
    var p_content = p_layout_detail.find("section.content")

    setTimeout(function(){
      p_content.css({"opacity":1,"padding-top":p_header.outerHeight()})
    }, 500)
  }
}
$(function(){
  init_nano_scroll()
  init_layout()
});
