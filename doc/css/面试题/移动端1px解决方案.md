## 移动端1px解决方案
1. 现象： 在高清屏幕下，移动端的1px显得很粗。
2. 产生原因: 设备像素比 = 物理像素 / css像素
目前住手机屏幕的dpr = 2 , 或者 dpr = 3,以dpr = 2 举例子，设备的物理像素要实现1像素， 所以css像素只能是0.5. 一般设计稿是按照750来设计的，它上面的1px 就是以750来参照的。而我们写css样式是以设备375为参照的。
### 解决方案
#### 1. wwdc对ios设备的方案
border: 0.5px solid #e5e5e5;  
直接写0.5px， 优点是简单，没有副作用。缺点是只支持ios.安卓不支持。
#### 2. 使用边框图片, 图片的颜色就是边框的颜色
```css
  border: 1px solid transparent;
  border-image: url('xxx');
 2 2 repeat
 
 ```
 #### 3. 使用box-shadow 实现 
 ```css
 // box-shadow: h v blur spread color inset;
 box-shadow: 0  -1px 1px -1px #e5e5e5,   //上边线
			1px  0  1px -1px #e5e5e5,   //右边线
			0  1px  1px -1px #e5e5e5,   //下边线
			-1px 0  1px -1px #e5e5e5;   //左边线

 ```
 优点： 使用简单，可以实现圆角；缺点 模拟的，比较模糊很难看清楚是不是边框

 #### 4.使用伪元素
优点：全机型兼容，实现了真正的1px，而且可以圆角。
缺点：暂用了after 伪元素，可能影响清除浮动。

 将伪元素设置相对定位，并且和父元素的左上角对齐，将width 设置100%，height设置为1px，然后进行在Y方向缩小0.5倍。
 ```css
 .setOnePx{
    position: relative;
    &::after{
      position: absolute;
      content: '';
      background-color: #e5e5e5;
      display: block;
      width: 100%;
      height: 1px; /*no*/
      transform: scale(1, 0.5);
      top: 0;
      left: 0;
    }
  }

  // 四个边框
  //同样为伪元素设置相对定位，并且和父元素左上角对齐。将伪元素的长和宽先放大2倍，然后再设置一个边框，以左上角为中心，缩放到原来的0.5倍
  .setBorderAll{
       position: relative;
         &:after{
             content:" ";
             position:absolute;
             top: 0;
             left: 0;
             width: 200%;
             height: 200%;
             transform: scale(0.5);
             transform-origin: left top;
             box-sizing: border-box;
             border: 1px solid #E5E5E5;
             border-radius: 4px;
        }
      }

 ```

 #### 5. 设置viewport的scale值
 这个解决方案是利用viewport+rem+js 实现的。

```html
<html>
	<head>
		<title>1px question</title>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<meta name="viewport" id="WebViewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">		
		<style>
			html {
				font-size: 1px;
			}			
			* {
				padding: 0;
				margin: 0;
			}
			.top_b {
				border-bottom: 1px solid #E5E5E5;
			}
			
			.a,.b {
                        box-sizing: border-box;
				margin-top: 1rem;
				padding: 1rem;				
				font-size: 1.4rem;
			}
			
			.a {
				width: 100%;
			}
			
			.b {
				background: #f5f5f5;
				width: 100%;
			}
		</style>
		<script>
			var viewport = document.querySelector("meta[name=viewport]");
			//下面是根据设备像素设置viewport
			if (window.devicePixelRatio == 1) {
				viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
			}
			if (window.devicePixelRatio == 2) {
				viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
			}
			if (window.devicePixelRatio == 3) {
				viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
			}
			var docEl = document.documentElement;
			var fontsize = 32* (docEl.clientWidth / 750) + 'px';
			docEl.style.fontSize = fontsize;
		</script>
	</head>
	<body>
		<div class="top_b a">下面的底边宽度是虚拟1像素的</div>
		<div class="b">上面的边框宽度是虚拟1像素的</div>
	</body>
</html>

```