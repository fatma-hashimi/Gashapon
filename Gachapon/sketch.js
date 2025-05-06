// --------------------------- Page Variables
let startPage = true;
let optionOnePage = false;
let optionTwoPage = false;
let optionThreePage = false;
let gachaPage = false;
let collectionLogPage = false;
// --------------------------- Button Variables
let startButton,
  simpleButton, newButton, unsettledButton,
  usefulButton, unexpectedButton, delightfulButton,
  enterButton, nothingButton,
  pullButton,
  nextButton, restartButton;
// --------------------------- Recorded Variables
let optionOne;
let optionTwo;
let textInput;
let userInput = "";

// --------------------------- Pull Variable
let pulled = "";
let description = "";
let pullOne, pullTwo, pullThree, pullFour;
let pullOneDesc, pullTwoDesc, pullThreeDesc, pullFourDesc;
let pullCount = 0;
let pullSound;

// --------------------------- Machine Image Variable
let machineImage;

// --------------------------- Capsule GIF Variables
let capsuleGifs = [];
let currentGif;

function preload() {
  // Force machine image to load completely before proceeding
  machineImage = loadImage('Media/Images/machine.png', 
    // Success callback
    () => {
      console.log("Machine image successfully loaded");
    },
    // Error callback
    (err) => {
      console.error("Failed to load machine image:", err);
      // Create a backup image as placeholder
      machineImage = createGraphics(400, 600);
      machineImage.background(200);
      machineImage.fill(0);
      machineImage.textAlign(CENTER, CENTER);
      machineImage.text("Machine", machineImage.width/2, machineImage.height/2);
    }
  );

  capsuleGifs[0] = createImg('Media/Images/Gifs/cap1.gif');
  capsuleGifs[1] = createImg('Media/Images/Gifs/cap2.gif');
  capsuleGifs[2] = createImg('Media/Images/Gifs/cap3.gif');
  capsuleGifs[3] = createImg('Media/Images/Gifs/cap4.gif');
  
  for (let i = 0; i < capsuleGifs.length; i++) {
    capsuleGifs[i].hide();
    capsuleGifs[i].size(0, 0);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  createButtons();
  textAlign(CENTER);
  imageMode(CENTER);
  textFont('Times New Roman');
  textStyle(BOLD);
}

function draw() {
  if (startPage || optionOnePage || optionTwoPage || optionThreePage || collectionLogPage) {
    for (let i = 0; i < capsuleGifs.length; i++) {
      capsuleGifs[i].hide();
    }
    pageState();
  } else if (gachaPage) {
    background(255);
    
    // Try to display the machine image
    try {
      if (machineImage && machineImage.width > 0) {
        let imgHeight = height * 0.6;
        let imgWidth = imgHeight * (machineImage.width / machineImage.height);
        image(machineImage, width * 0.25, height/2 - 100, imgWidth, imgHeight);
      } else {
        console.log("Machine image not loaded yet, attempting to reload");
        // Try to reload the image if it's not available
        machineImage = loadImage('Media/Images/machine.png');
      }
    } catch (e) {
      console.error("Error displaying machine image:", e);
      // Emergency fallback - draw a placeholder
      fill(200);
      rectMode(CENTER);
      rect(width * 0.25, height/2 - 100, width * 0.3, height * 0.6);
      fill(0);
      textSize(18);
      text("Machine", width * 0.25, height/2 - 100);
    }
    
    if (pullCount >= 4) {
      pullButton.hide();
      nextButton.show();
    } else {
      pullButton.show();
      nextButton.hide();
    }

    if (pullCount > 0) {
      for (let i = 0; i < capsuleGifs.length; i++) {
        capsuleGifs[i].hide();
      }
      
      let gifIndex = pullCount - 1;
      if (gifIndex >= 0 && gifIndex < capsuleGifs.length) {
        let gifSize = min(width * 0.4, height * 0.4) * 1.25;
        capsuleGifs[gifIndex].size(gifSize, gifSize);
        capsuleGifs[gifIndex].position(
          width * 0.75 - gifSize/2, 
          height/2 - 60 - gifSize/2 + 100
        );
        capsuleGifs[gifIndex].show();
      }
    }

    if (pulled !== "") {
      textSize(32);
      fill(0);
      textAlign(CENTER, CENTER);
      text(pulled, width * 0.75, height / 2 - 180);

      if (description !== "") {
        textSize(18);
        textWrap(WORD);
        text(description, width * 0.75, height / 2 + 90, width * 0.4, 100);
      }
      
      textSize(16);
      text("Pull " + pullCount + " of 4", width * 0.75, height / 2 - 160);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
  if (startButton) startButton.position(width / 2 - 100, height / 2);
}

function createButtons() {
  hideAllButtons();

  // START
  startButton = createImg('Media/Images/Buttons/startButton.png', 'Start');
  startButton.position(width / 2 - 100, height / 2);
  startButton.size(200, 80);
  startButton.mousePressed(handleButtons);
  startButton.style('cursor', 'pointer');

  // OPTION ONE - TODAY FEELS:
  simpleButton = createImg('Media/Images/Buttons/simpleButton.png', 'Simple');
  simpleButton.position(width * 0.25 - simpleButton.width/2, height / 2);
  simpleButton.size(80*2, 100*2);
  simpleButton.mousePressed(() => {
    optionOne = 'simple';
    optionOnePage = false;
    optionTwoPage = true;
    pageState();
  });
  simpleButton.style('cursor', 'pointer');

  newButton = createImg('Media/Images/Buttons/newButton.png', 'New');
  newButton.position(width * 0.5 - newButton.width/2, height / 2);
  newButton.size(80*2, 100*2);
  newButton.mousePressed(() => {
    optionOne = 'new';
    optionOnePage = false;
    optionTwoPage = true;
    pageState();
  });
  newButton.style('cursor', 'pointer');

  unsettledButton = createImg('Media/Images/Buttons/unsettledButton.png', 'Unsettled');
  unsettledButton.position(width * 0.75 - unsettledButton.width/2, height / 2);
  unsettledButton.size(80*2, 100*2);
  unsettledButton.mousePressed(() => {
    optionOne = 'unsettled';
    optionOnePage = false;
    optionTwoPage = true;
    pageState();
  });
  unsettledButton.style('cursor', 'pointer');

  // OPTION TWO - HOPING TO FIND SOMETHING:
  usefulButton = createImg('Media/Images/Buttons/usefulButton.png', 'Useful');
  usefulButton.position(width * 0.25 - usefulButton.width/2, height / 2);
  usefulButton.size(80*2, 100*2);
  usefulButton.mousePressed(() => {
    optionTwo = 'useful';
    optionTwoPage = false;
    optionThreePage = true;
    if (textInput) textInput.value('');
    pageState();
  });
  usefulButton.style('cursor', 'pointer');

  unexpectedButton = createImg('Media/Images/Buttons/unexpectedButton.png', 'Unexpected');
  unexpectedButton.position(width * 0.5 - unexpectedButton.width/2, height / 2);
  unexpectedButton.size(80*2, 100*2);
  unexpectedButton.mousePressed(() => {
    optionTwo = 'unexpected';
    optionTwoPage = false;
    optionThreePage = true;
    if (textInput) textInput.value('');
    pageState();
  });
  unexpectedButton.style('cursor', 'pointer');

  delightfulButton = createImg('Media/Images/Buttons/delightfulButton.png', 'Delightful');
  delightfulButton.position(width * 0.75 - delightfulButton.width/2, height / 2);
  delightfulButton.size(80*2, 100*2);
  delightfulButton.mousePressed(() => {
    optionTwo = 'delightful';
    optionTwoPage = false;
    optionThreePage = true;
    if (textInput) textInput.value('');
    pageState();
  });
  delightfulButton.style('cursor', 'pointer');

  // OPTION THREE - TEXT INPUT:
  enterButton = createImg('Media/Images/Buttons/enterButton.png', 'Enter');
  enterButton.position(width / 2 + 50, height / 2 + 15);
  enterButton.size(40, 20);
  enterButton.style('cursor', 'pointer');
  enterButton.mousePressed(() => {
    userInput = textInput.value();
    
    if (userInput.trim() !== "") {
      console.log("Adding to items:", userInput);
      grammarSource.items.push(userInput.trim());
      
      let originalText = pulled;
      pulled = "Added \"" + userInput + "\" to possible items!";
      setTimeout(() => {
        pulled = originalText;
      }, 2000);
    }
    
    console.log("User entered:", userInput);
    optionThreePage = false;
    gachaPage = true;
    pageState();
  });
  textInput = createInput('');
  textInput.position(width / 2 - 100, height / 2);
  textInput.size(100, 30);
  textInput.style('font-size', '16px');
  textInput.style('padding', '5px');
  textInput.style('border-radius', '5px');
  textInput.style('border', '1px solid #ccc');

  nothingButton = createImg('Media/Images/Buttons/nothingButton.png', 'Nothing');
  nothingButton.position(width / 2 - 20, height / 2 + 100);
  nothingButton.size(75*2, 65*2);
  nothingButton.style('cursor', 'pointer');
  nothingButton.mousePressed(() => {
    userInput = "";
    optionThreePage = false;
    gachaPage = true;
    pageState();
  });

  pullButton = createImg('Media/Images/Buttons/pullButton.png', 'Pull');
  pullButton.position(width /5.55, height *0.7);
  pullButton.size(80*3, 80*2);
  pullButton.style('cursor', 'pointer');
  pullButton.mousePressed(gachaPull);

  nextButton = createImg('Media/Images/Buttons/nextButton.png', 'Next');
  nextButton.position(width * 0.75 - 15, height * 0.8);
  nextButton.size(30, 20);
  nextButton.style('cursor', 'pointer');
  nextButton.mousePressed(() => {
    // Hide all GIFs explicitly when moving to collection log page
    for (let i = 0; i < capsuleGifs.length; i++) {
      capsuleGifs[i].hide();
    }
    
    gachaPage = false;
    collectionLogPage = true;
    pageState();
  });

  pageState();
}

function pageState() {
  hideAllButtons();
  background(255);

  if (textInput) textInput.hide();

  if (startPage) {
    startButton.show();

  }
  else if (optionOnePage) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("today feels...", width / 2, height / 2 - 150);

    simpleButton.show();
    newButton.show();
    unsettledButton.show();
  }
  else if (optionTwoPage) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("hoping to find something...", width / 2, height / 2 - 150);

    usefulButton.show();
    unexpectedButton.show();
    delightfulButton.show();
  }
  else if (optionThreePage) {
    textInput.show();
    enterButton.show();
    nothingButton.show();
    // textInput.value('');
    
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("leaving something behind?", width / 2, height / 2 - 150);
  }
  else if (gachaPage) {
    pullButton.show();
    if (pullCount >= 4) {
      pullButton.hide();
      nextButton.show();
    } else {
      nextButton.hide();
    }
  }
  else if (collectionLogPage) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Collection Log:", width / 2, height / 5);

    textSize(16);
    textAlign(CENTER, CENTER);
    if (pullOne) {
      text("1. " + pullOne, width / 2, height / 3);
    }
    if (pullTwo) {
      text("2. " + pullTwo, width / 2, height / 3 + 60);
    }
    if (pullThree) {
      text("3. " + pullThree, width / 2, height / 3 + 120);
    }
    if (pullFour) {
      text("4. " + pullFour, width / 2, height / 3 + 180);
    }

    if (!restartButton) {
      restartButton = createImg('Media/Images/Buttons/restartButton.png', 'Restart');
      restartButton.position(width / 2 - 40, height * 0.9);
      restartButton.size(80, 30);
      restartButton.style('cursor', 'pointer');
    }

    restartButton.show();
    restartButton.mousePressed(() => {
      // Reset all state variables
      startPage = true;
      optionOnePage = false;
      optionTwoPage = false;
      optionThreePage = false;
      gachaPage = false;
      collectionLogPage = false;

      optionOne = "";
      optionTwo = "";
      userInput = "";

      pulled = "";
      description = "";
      pullCount = 0;
      pullOne = pullTwo = pullThree = pullFour = null;
      pullOneDesc = pullTwoDesc = pullThreeDesc = pullFourDesc = null;

      // Hide all GIFs explicitly
      for (let i = 0; i < capsuleGifs.length; i++) {
        capsuleGifs[i].hide();
        capsuleGifs[i].size(0, 0);
      }

      // Ensure machine image is ready for next round
      if (!machineImage || machineImage.width === 0) {
        machineImage = loadImage('Media/Images/machine.png', 
          () => console.log("Machine image reloaded on restart"),
          () => console.error("Failed to reload machine image on restart")
        );
      }

      // Force the canvas to redraw
      background(255);
      
      // Make sure pageState is called to properly initialize the new state
      pageState();
    });
  }
}

function handleButtons() {
  startPage = false;
  optionOnePage = true;
  pageState();
}

function gachaPull() {
  let grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);

  let newPull = grammar.flatten("#origin#");
  
  let newDescription = "";
  if (optionOne && optionTwo) {
    let descKey = "desc_" + optionOne.toLowerCase() + "_" + optionTwo.toLowerCase();
    if (grammarSource[descKey]) {
      let descIndex = Math.floor(Math.random() * grammarSource[descKey].length);
      newDescription = grammarSource[descKey][descIndex];
    }
  }

  pullCount++;
  
  if (pullCount === 1) {
    pullOne = newPull;
    pullOneDesc = newDescription;
  } else if (pullCount === 2) {
    pullTwo = newPull;
    pullTwoDesc = newDescription;
  } else if (pullCount === 3) {
    pullThree = newPull;
    pullThreeDesc = newDescription;
  } else if (pullCount === 4) {
    pullFour = newPull;
    pullFourDesc = newDescription;
  }
  
  pulled = newPull;
  description = newDescription;

  console.log("Pull #" + pullCount + ":", pulled);
  console.log("Description:", description);
  
  redraw();
}

function hideAllButtons() {
  if (startButton) startButton.hide();
  if (simpleButton) simpleButton.hide();
  if (newButton) newButton.hide();
  if (unsettledButton) unsettledButton.hide();
  if (usefulButton) usefulButton.hide();
  if (unexpectedButton) unexpectedButton.hide();
  if (delightfulButton) delightfulButton.hide();
  if (enterButton) enterButton.hide();
  if (nothingButton) nothingButton.hide();
  if (pullButton) pullButton.hide();
  if (nextButton) nextButton.hide();
  if (restartButton) restartButton.hide();
}

let grammarSource = {
  "origin": "#item_adj# #items#",
  "items": [
    "baklava",
    "canelé",
    "cinnamon roll",
    "croissant",
    "doughnut",
    "éclair",
    "pain au chocolat",
    "shortcake",
    "bagel",
    "baguette",
    "brioche",
    "ciabatta",
    "cornbread",
    "flatbread",
    "focaccia",
    "hamburger bun",
    "muffin",
    "naan",
    "paratha",
    "pita",
    "potato bread",
    "pretzel",
    "pumpernickel",
    "scone",
    "soda bread",
    "sourdough",
    "tortilla",
    "dagger",
    "katana",
    "knife",
    "longsword",
    "claymore",
    "rapier",
    "axe",
    "glaive",
    "spear",
    "whip",
    "hammer",
    "pickaxe",
    "bag",
    "balloon",
    "barrel",
    "beaker",
    "bucket",
    "briefcase",
    "display",
    "mug",
    "tray",
    "vase",
    "wallet",
    "wrapper",
    "acorn",
    "bag of cotton balls",
    "bag of popcorn",
    "ball of yarn",
    "bananas",
    "bangle bracelet",
    "bar of soap",
    "baseball",
    "baseball bat",
    "baseball hat",
    "basketball",
    "beaded bracelet",
    "beaded necklace",
    "beef",
    "blowdryer",
    "bonesaw",
    "book",
    "book of matches",
    "bookmark",
    "boom box",
    "bottle",
    "bottle cap",
    "bottle of honey",
    "bottle of ink",
    "bottle of oil",
    "bottle of paint",
    "bottle of pills",
    "bottle of soda",
    "bottle of water",
    "bouquet of flowers",
    "bowl",
    "box of Q-tips",
    "box of baking soda",
    "box of chalk",
    "box of chocolates",
    "box of crayons",
    "box of markers",
    "box of tissues",
    "broccoli",
    "brush",
    "buckle",
    "butter knife",
    "button",
    "camera",
    "candlestick",
    "candy bar",
    "card",
    "carrots",
    "clay pot",
    "clothes pin",
    "coffee pot",
    "comb",
    "cookie jar",
    "cork",
    "cowboy hat",
    "credit card",
    "deodorant",
    "dictionary",
    "domino set",
    "drill press",
    "egg",
    "empty bottle",
    "eraser",
    "extension cord",
    "eye liner",
    "face wash",
    "feather",
    "feather duster",
    "few batteries",
    "fish",
    "fishing hook",
    "flashlight",
    "flowers",
    "football",
    "fork",
    "fridge",
    "frying pan",
    "game cartridge",
    "glasses",
    "hair brush",
    "handful of change",
    "harmonica",
    "helmet",
    "jar of jam",
    "key",
    "keyboard",
    "keychain",
    "keys",
    "kitchen knife",
    "light bulb",
    "lighter",
    "lotion",
    "magazine",
    "martini glass",
    "matchbook",
    "microphone",
    "milk carton",
    "money",
    "ocarina",
    "pack of cards",
    "package of crisp and crunchy edibles",
    "package of glitter",
    "packet of seeds",
    "paintbrush",
    "pair of binoculars",
    "pair of dice",
    "pair of knitting needles",
    "pair of rubber gloves",
    "pair of safety goggles",
    "pair of socks",
    "pasta strainer",
    "pearl necklace",
    "pen caps",
    "piece of gum",
    "pillow",
    "pocketknife",
    "pocketwatch",
    "quartz crystal",
    "quilt",
    "roll of toilet paper",
    "rolling pin",
    "salt shaker",
    "scallop shell",
    "screwdriver",
    "sheet of paper",
    "snail shell",
    "socks",
    "sofa",
    "spatula",
    "spice bottle",
    "sponge",
    "spool of thread",
    "spool of wire",
    "steak knife",
    "stop sign",
    "teapot",
    "tennis ball",
    "thermometer",
    "thimble",
    "toilet paper tube",
    "tomato",
    "toothbrush",
    "trash bag",
    "tube of lip balm",
    "umbrella",
    "wedding ring",
    "wine glass",
    "wrench"
  ],
  "item_adj": [
    "pristine",
    "dusty",
    "ceramic-coated",
    "stinky",
    "cutesy",
    "lovely",
    "moldy",
    "nasty ass",
    "bittersweet",
    "frosting-covered",
    "gold-plated",
    "mud-soaked",
    "unwashed",
    "sun-bleached",
    "clean-enough",
    "still-wet",
    "hot-glued",
    "vacuum-sealed",
    "warped",
    "dented",
    "stale",
    "soggy",
    "corroded",
    "handdrawn",
    "melted",
    "sticky",
    "antique",
    "synthetic",
    "soft",
    "metallic",
    "wooden",
    "tiny",
    "off-brand",
    "leftover",
    "translucent",
    "poorly-labeled",
    "sticker-covered",
    "commemorative",
    "promotional",
    "ceremonial",
    "judgmental",
    "unlicensed",
    "consumable",
    "single-use",
    "waxed",
    "waxy",
    "grainy",
    "greasy",
    "pre-owned",
    "on-loan",
    "mint-condition",
    "subscription-based",
    "part of a set",
    "illegally-imported",
    "stolen",
    "friend-shaped",
    "probably-one-of-a-kind",
    "microwave-safe",
    "dishwasher-safe",
    "ziplocked",
    "bubble-wrapped",
    "peeled",
    "blood-stained",
    "waterlogged",
    "unloved",
    "neglected",
    "bulk-packed"
  ],
  "desc_simple_useful": [
    "what do you even do with this?",
    "shove it in a drawer until it find its use one day.",
    "what the hell, sure.",
    "easily pocketing that.",
    "better to have it than not.",
    "perfect for pretending to know what you're doing.",
    "goes in the bag, no thoughts.",
    "guaranteed to spark one (1) conversation.",
    "a new family heirloom for you to pass down.",
    "you'd be surprised how often this kind of thing helps."
  ],
  "desc_simple_unexpected": [
    "woah! wow!? you guess??",
    "do they really sell things like this?",
    "unsure if this is junk or genius.",
    "that shouldn't be here. but it is!",
    "unsettling in the gentlest way.",
    "how weirdly charming.",
    "like finding a familiar word in a different language.",
    "looks weird. should be fine.",
    "ordinary and yet so magical.",
    "that shouldn't work, but it kinda does."
  ],
  "desc_simple_delightful": [
    "how sweet.",
    "don't need it, but it makes you kinda happy.",
    "why does this make your day better?",
    "you pick it up before even thinking about it.",
    "you never knew you needed this until now.",
    "it feels like it was made just for you.",
    "makes your pocket a little warmer.",
    "you feel better just by holding it.",
    "makes everything 2% better.",
    "your new favorite thing, ever."
  ],
  "desc_new_useful": [
    "surely it'll last.",
    "you'll reach for this more often in the future.",
    "useful now, indispensable later.",
    "you already got three things in mind for it.",
    "and it comes with instructions!",
    "warning: microwaved once.",
    "with a 10-year warranty!",
    "batteries included!",
    "not edible. not this time.",
    "works better if you believe in it."
  ],
  "desc_new_unexpected": [
    "not what you thought you needed right now.",
    "who asked for this? was it you?",
    "so this is what we're doing now?",
    "do you need it? not likely. do you want it? still not likely.",
    "well it didn't appear outta thin air, someone MADE this.",
    "it all makes less sense now.",
    "its not wrong, but its not right either.",
    "surprised? yeah, me too.",
    "you didn't want this, but now you can't stop thinking about it.",
    "how have you lived before receiving this?",
    "let's replan the agenda around this one."
  ],
  "desc_new_delightful": [
    "suddenly, the world feels a little less cold.",
    "its like it was hand-made. for you <3",
    "you can have one as a treat.",
    "a gentle delight. yup.",
    "and all the stars align for you.",
    "oh, joyous.",
    "you learn something new everyday.",
    "a new good luck charm.",
    "perfectly adept at what it does.",
    "serendipitous."
  ],
  "desc_unsettled_useful": [
    "might not make everything better, but it'll do",
    "once questionable, now reliable",
    "baby steps towards a new understanding",
    "not a solution, but you hold onto it",
    "just might be today's savior",
    "seems more useful right now than it truly is",
    "not the cure, but a start",
    "won't fix the world, but might fix today",
    "just what you needed, you just didn't know it",
    "pause. this might be onto something…"
  ],
  "desc_unsettled_unexpected": [
    "a little confused, but it got the spirit",
    "unexpected? up to interpretation",
    "well it has your attention now",
    "it's here! it's blessed you",
    "1/15,600 chance of claiming this specimen",
    "you feel an odd stirring in your gut",
    "nah bro, no one's gonna believe you",
    "all this does is hurt you",
    "the timing is all wrong with this one",
    "forever carved into your soul."
  ],
  "desc_unsettled_delightful": [
    "no way this is what makes your day better",
    "disorienting, in the best way possible",
    "genuinely offsets all your qualms",
    "a new thing to be unsettled about",
    "it can probably pass the vibe check",
    "don't judge yet. its a diamond in the rough",
    "it matches you",
    "a real tear-jerker here",
    "it's the small things that count",
    "placing this on your shelf like a national treasure."
  ]
};