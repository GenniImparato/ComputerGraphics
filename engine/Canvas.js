var Canvas = 
{
    init: function()
    {
        var canvas = document.getElementById("canvas");

        try
        {
            gl = canvas.getContext("webgl2");
        } 
        catch(e)
        {
            console.log(e);
        }

        if(gl)
        {
            window.onresize = Canvas.onResize;
            Canvas.onResize();

            gl.enable(gl.CULL_FACE);
  			gl.enable(gl.DEPTH_TEST);
  			gl.cullFace(gl.BACK);

  			//gl.enable(gl.BLEND);
  			//gl.blendFunc(gl.ONE_MINUS_SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }
        else
            alert("Error: WebGL not supported by your browser!");

    },


    onResize: function() 
    {
        // set canvas dimensions
        var canvas = document.getElementById("canvas");

        canvas.width  = window.innerWidth - 16;
        canvas.height = window.innerHeight - 20;
    
        var w = canvas.clientWidth;
        var h = canvas.clientHeight;

        aspectRatio = w/h;

        perspectiveMatrix = utils.MakePerspective(60, aspectRatio, 0.1, 1000.0);
        
        gl.viewport(0.0, 0.0, w, h);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);   
    },
}