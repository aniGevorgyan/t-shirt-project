import * as fabric from "fabric";

export class FabricCanvasHandlers {
  public left1 = 0;
  public top1 = 0 ;
  public scale1x = 0 ;
  public scale1y = 0 ;
  public width1 = 0 ;
  public height1 = 0 ;
  public constructor(protected canvas: fabric.Canvas) {}
  public createImageFromCenter(src: string) {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const image = new fabric.Image(img, {
        centeredRotation: true,
        centeredScaling: true,
        scaleY: 0.5,
        scaleX: 0.5,
        perPixelTargetFind: false
      });

      this.canvas.add(image);
    }
  }

  public onObjectMoving(e: any) {
    var obj = e.target;
    // if object is too big ignore
    if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
      return;
    }
    obj.setCoords();
    // top-left  corner
    if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
      obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
      obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
    }
    // bot-right corner
    if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
      obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
      obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
    }
  }

  public onObjectScaling(e: any) {
      var obj = e.target;
      obj.setCoords();
      var brNew = obj.getBoundingRect();

      if (((brNew.width+brNew.left)>=obj.canvas.width) || ((brNew.height+brNew.top)>=obj.canvas.height) || ((brNew.left<0) || (brNew.top<0))) {
        obj.left = this.left1;
        obj.top=this.top1;
        obj.scaleX=this.scale1x;
        obj.scaleY=this.scale1y;
        obj.width=this.width1;
        obj.height=this.height1;
      }
      else{
        this.left1 =obj.left;
        this.top1 =obj.top;
        this.scale1x = obj.scaleX;
        this.scale1y=obj.scaleY;
        this.width1=obj.width;
        this.height1=obj.height;
      }
  }

}
