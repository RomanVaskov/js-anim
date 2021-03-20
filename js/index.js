let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Graphics = PIXI.Graphics,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle;

// Для анимации кнопки, лестниц
let c = new Charm(PIXI);

//Создание отрисовщика
let app = new Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: true,
  resolution: 1,
});

//Добавляем отрисовщик в HTML документ
document.body.appendChild(app.view);

//Создаем объект-контейнер, называемый сцена
let stage = new Container();
loader
  .add("images/back.png")
  .add("images/logo.png")
  .add("images/plant_top.png")
  .add("images/plant_bottom.png")
  .add("images/dec.png")
  .add("images/globe.png")
  .add("images/table.png")
  .add("images/1.png")
  .add("images/2.png")
  .add("images/3.png")
  .add("images/active.png")
  .add("images/ok.png")
  .add("images/new_stair_01.png")
  .add("images/new_stair_02.png")
  .add("images/new_stair_03.png")
  .add("images/old_stair.png")
  .add("images/layer_1.png")
  .add("images/layer_2.png")
  .add("images/layer_3.png")
  .add("images/icon_hammer.png")
  .add("images/austin.png")
  .add("images/btn.png")
  .add("images/01.png")
  .add("images/02.png")
  .add("images/03.png")
  .add("images/book_stand.png")
  .load(setup);

let background,
  circle1,
  circle2,
  circle3,
  oldStair,
  newStair1,
  newStair2,
  newStair3,
  activeCircle,
  state,
  logo,
  plantTop,
  plantBottom,
  table,
  sofa,
  dec,
  hammer,
  btn,
  austin,
  bookStand,
  globe;
let targetClick = true;

function setup() {
  background = new Sprite(resources["images/back.png"].texture);
  app.stage.addChild(background);

  austin = new Sprite(resources["images/austin.png"].texture);
  austin.x = 700;
  austin.y = 115;
  app.stage.addChild(austin);

  plantTop = new Sprite(resources["images/plant_top.png"].texture);
  plantTop.x = 450;
  plantTop.y = 0;
  app.stage.addChild(plantTop);

  plantBottom = new Sprite(resources["images/plant_bottom.png"].texture);
  plantBottom.x = 1130;
  plantBottom.y = 170;
  app.stage.addChild(plantBottom);

  globe = new Sprite(resources["images/globe.png"].texture);
  globe.x = 80;
  globe.y = 100;
  app.stage.addChild(globe);

  table = new Sprite(resources["images/table.png"].texture);
  table.x = 205;
  table.y = 200;
  app.stage.addChild(table);

  sofa = new Sprite(resources["images/layer_1.png"].texture);
  sofa.x = 125;
  sofa.y = 325;
  app.stage.addChild(sofa);

  bookStand = new Sprite(resources["images/book_stand.png"].texture);
  bookStand.x = 820;
  bookStand.y = 0;
  app.stage.addChild(bookStand);

  newStair1 = new Sprite(resources["images/new_stair_01.png"].texture);
  newStair1.visible = false;
  newStair1.alpha = 0.5;
  app.stage.addChild(newStair1);

  newStair2 = new Sprite(resources["images/new_stair_02.png"].texture);
  newStair2.visible = false;
  newStair2.alpha = 0.5;
  app.stage.addChild(newStair2);

  newStair3 = new Sprite(resources["images/new_stair_03.png"].texture);
  newStair3.visible = false;
  newStair3.alpha = 0.5;
  app.stage.addChild(newStair3);

  oldStair = new Sprite(resources["images/old_stair.png"].texture);
  oldStair.x = 830;
  oldStair.y = 125;
  oldStair.visible = true;
  app.stage.addChild(oldStair);

  circle1 = new Sprite(resources["images/1.png"].texture);
  circle1.x = 840;
  circle1.y = 10;
  circle1.interactive = true;
  circle1.buttonMode = true;
  circle1.visible = false;
  circle1.on("pointerdown", handlerClick);
  app.stage.addChild(circle1);

  circle2 = new Sprite(resources["images/2.png"].texture);
  circle2.x = 970;
  circle2.y = 10;
  circle2.interactive = true;
  circle2.buttonMode = true;
  circle2.visible = false;
  circle2.on("pointerdown", handlerClick);
  app.stage.addChild(circle2);

  circle3 = new Sprite(resources["images/3.png"].texture);
  circle3.x = 1100;
  circle3.y = 10;
  circle3.interactive = true;
  circle3.buttonMode = true;
  circle3.visible = false;
  circle3.on("pointerdown", handlerClick);
  app.stage.addChild(circle3);

  activeCircle = new Sprite(resources["images/active.png"].texture);
  activeCircle.visible = false;
  app.stage.addChild(activeCircle);

  newCricleStair1 = new Sprite(resources["images/01.png"].texture);
  newCricleStair1.x = 860;
  newCricleStair1.y = 10;
  newCricleStair1.visible = false;
  app.stage.addChild(newCricleStair1);

  newCricleStair2 = new Sprite(resources["images/02.png"].texture);
  newCricleStair2.x = 995;
  newCricleStair2.y = 10;
  newCricleStair2.visible = false;
  app.stage.addChild(newCricleStair2);

  newCricleStair3 = new Sprite(resources["images/03.png"].texture);
  newCricleStair3.x = 1120;
  newCricleStair3.y = 10;
  newCricleStair3.visible = false;
  app.stage.addChild(newCricleStair3);

  okBtn = new Sprite(resources["images/ok.png"].texture);
  okBtn.visible = false;
  okBtn.interactive = true;
  okBtn.buttonMode = true;
  okBtn.on("pointerdown", handlerSelectStair);
  app.stage.addChild(okBtn);

  hammer = new Sprite(resources["images/icon_hammer.png"].texture);
  hammer.x = 1090;
  hammer.y = 265;
  hammer.alpha = 0;
  hammer.interactive = true;
  hammer.buttonMode = true;
  hammer.on("pointerdown", handlerHammerClick);
  app.stage.addChild(hammer);

  dec = new Sprite(resources["images/dec.png"].texture);
  dec.x = 1120;
  dec.y = 440;
  app.stage.addChild(dec);

  bg2 = new Sprite(resources["images/layer_3.png"].texture);
  bg2.alpha = 0.6;
  bg2.visible = false;
  bg2.width = window.innerWidth;
  bg2.height = window.innerHeight;
  app.stage.addChild(bg2);

  bg3 = new Sprite(resources["images/layer_2.png"].texture);
  bg3.x = 390;
  bg3.y = 50;
  bg3.visible = false;
  app.stage.addChild(bg3);

  logo = new Sprite(resources["images/logo.png"].texture);
  logo.x = 30;
  logo.y = 5;
  app.stage.addChild(logo);

  btn = new Sprite(resources["images/btn.png"].texture);
  btn.anchor.set(0.5, 0.5);
  btn.x = 700;
  btn.y = 550;
  btn.interactive = true;
  btn.buttonMode = true;
  btn.on("click", handlerReloadPage);
  app.stage.addChild(btn);

  c.breathe(btn, 1.05, 1.05, 50, true, 50);

  setTimeout(() => {
    c.fadeIn(hammer, 20);
  }, 2000);
  //   state = play;
  app.ticker.add((delta) => {
    gameLoop(delta);
  });
}

//Говорим отрисовщику отобразить сцену
app.render(stage);

// Игровой цикл
function gameLoop(delta) {
  //   state(delta);
  c.update();
}

// Состояние play
function play() {
  console.log("Play method");
}

// Обработка клика по молотку
function handlerHammerClick() {
  circle1.visible = true;
  circle2.visible = true;
  circle3.visible = true;
  newCricleStair1.visible = true;
  newCricleStair2.visible = true;
  newCricleStair3.visible = true;
  hammer.visible = false;
}

// Обработка клика выбора лестницы
function handlerClick() {
  activeCircle.visible = false;
  okBtn.visible = false;

  this.texture.textureCacheIds[0] = activeCircle;
  activeCircle.visible = !activeCircle.visible;
  okBtn.visible = !okBtn.visible;
  activeCircle.x = this.x + 4;
  activeCircle.y = this.y;
  okBtn.x = this.x - 8;
  okBtn.y = this.y + 110;

  switch (this.x) {
    case 840:
      oldStair.visible = false;

      newStair1.x = 920;
      newStair1.y = 5;

      newStair1.visible = true;
      newStair1.alpha = 1;
      c.slide(newStair1, 920, 27, 20, "smoothstep");

      newStair2.visible = false;
      newStair3.visible = false;
      break;
    case 970:
      oldStair.visible = false;

      newStair2.x = 920;
      newStair2.y = 5;

      newStair2.visible = true;
      newStair2.alpha = 1;
      c.slide(newStair2, 920, 35, 20);

      newStair1.visible = false;
      newStair3.visible = false;
      break;
    case 1100:
      oldStair.visible = false;

      newStair3.x = 920;
      newStair3.y = 5;

      newStair3.visible = true;
      newStair3.alpha = 1;
      c.slide(newStair3, 920, 27, 20);

      newStair1.visible = false;
      newStair2.visible = false;
      break;

    default:
      oldStair.visible = true;
      break;
  }
  oldStair.visible = false;
}

// Обработка клика выборанной лестницы
function handlerSelectStair() {
  bg2.visible = true;
  bg3.visible = true;

  circle1.visible = false;
  circle2.visible = false;
  circle3.visible = false;
  activeCircle.visible = false;
  newCricleStair1.visible = false;
  newCricleStair2.visible = false;
  newCricleStair3.visible = false;

  okBtn.visible = false;

  console.log("Ok btn");
}

function handlerReloadPage() {
  window.location.reload();
}

// Растянуть холст на всю ширину и высоту
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
