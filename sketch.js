function preload() {
  moth = createImg('img/moth.png','moth');
  invitation = new Page([""],"invitation");
  confused = new Page([""],"confused");
  exist = new Page([""], "exist");
  now = new Page([""], "now");
  here = new Page([""], "here");
  garden = new Page([""], "garden");
  forms = new Page([""], "forms");
  self = new Page([""], "self");
  remember = new Page([""], "remember");
  love = new Page([""], "love");
  together = new Page([""], "together");
  beauty = new Page([""], "beauty");
  worry = new Page([""], "worry");
  journey = new Page([""], "journey");
  dream = new Page([""], "dream");
}

function setup() {
  setupWeb();
  setupPages();
  invitation.loadPage();
}

function setupWeb() {
  noCanvas();
  createElement('h4').html('<a href="https://becomingconfused.com/">becomingConfused</a>');
  moth.position(300, 4);
  moth.size(80,40);
  moth.position()
  ndiv = createDiv();
  title = createElement('h5').html('becomingConfused');
  pdiv = createDiv();
  p = createP('').parent(pdiv);
  footer = createElement('footer');
  createElement('i').html('<a href="mailto:jdalibrando@gmail.com"><u>JD Alibrando</u></a>').parent(footer);
  path = createElement('i').html('where am I???').parent(footer);
  path_list = ['...'];
}

function setupPages() {
  diagram = [
    [invitation],
    [confused], 
    [exist, here, now],
    [[garden,forms,self,worry],[love,beauty,together],[dream,journey,remember]]
  ];
  diagram[0][0].children = diagram[1];

  diagram[1][0].parents = diagram[0];
  diagram[1][0].children = diagram[2];

  diagram[2][0].parents = diagram[1];
  diagram[2][0].children = diagram[3][0];

  diagram[2][1].parents = diagram[1];
  diagram[2][1].children = diagram[3][1];

  diagram[2][2].parents = diagram[1];
  diagram[2][2].children = diagram[3][2];

  diagram[3][0][0].parents = [diagram[2][0]];
  diagram[3][0][1].parents = [diagram[2][0]];
  diagram[3][0][2].parents = [diagram[2][0]];
  diagram[3][0][3].parents = [diagram[2][0]];

  diagram[3][1][0].parents = [diagram[2][1]];
  diagram[3][1][1].parents = [diagram[2][1]];
  diagram[3][1][2].parents = [diagram[2][1]];

  diagram[3][2][0].parents = [diagram[2][2]];
  diagram[3][2][1].parents = [diagram[2][2]];
  diagram[3][2][2].parents = [diagram[2][2]];

} 