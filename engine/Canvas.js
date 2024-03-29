var Canvas = 
{
    init: function()
    {
        canvas = document.getElementById("canvas");
        document.body.style.overflow = 'hidden';

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

  			gl.enable(gl.BLEND);
  			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }
        else
            alert("Error: WebGL not supported by your browser!");
    },


    onResize: function() 
    {
        // set canvas dimensions
        var canvas = document.getElementById("canvas");

        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.left = "0";
        canvas.style.top = "0";
        canvas.style.position = "absolute";
    
        var w = canvas.clientWidth;
        var h = canvas.clientHeight;

        aspectRatio = w/h;
        
        Canvas.makePerspectiveMatrix();
        
        gl.viewport(0.0, 0.0, w, h);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);   
    },

    makePerspectiveMatrix: function()
    {
        perspectiveMatrix = utils.MakePerspective(60, aspectRatio, 0.1, 2000.0);
    }
}