// Seed data — used to populate localStorage the first time the app runs (tasks/recipes/
// crops/critters), and as a reference roster you pick from in the "Add Villager" picker.
// Edit freely from within the app afterward; this file is not read again once saved data exists.
// Villager roster sourced from dev/villager_list.txt (base game + all current DLC realms).

const KNOWN_VILLAGERS = [
  // Dreamlight Valley (Base Game)
  { name: "Aladdin", realm: "Dreamlight Valley (Base Game)", emoji: "🪔" , portrait: "dev/cooking-recipes-images/portraits/Aladdin.png" },
  { name: "Jasmine", realm: "Dreamlight Valley (Base Game)", emoji: "🐅" , portrait: "dev/cooking-recipes-images/portraits/Jasmine.png" },
  { name: "Alice", realm: "Dreamlight Valley (Base Game)", emoji: "🐇" , portrait: "dev/cooking-recipes-images/portraits/Alice.png" },
  { name: "Cheshire Cat", realm: "Dreamlight Valley (Base Game)", emoji: "🐱" , portrait: "dev/cooking-recipes-images/portraits/Cheshire_Cat.png" },
  { name: "Belle", realm: "Dreamlight Valley (Base Game)", emoji: "📖" , portrait: "dev/cooking-recipes-images/portraits/Belle.png" },
  { name: "Cogsworth", realm: "Dreamlight Valley (Base Game)", emoji: "🕰️" , portrait: "dev/cooking-recipes-images/portraits/Cogsworth.png" },
  { name: "The Beast", realm: "Dreamlight Valley (Base Game)", emoji: "🐾" , portrait: "dev/cooking-recipes-images/portraits/The_Beast.png" },
  { name: "Lumiere", realm: "Dreamlight Valley (Base Game)", emoji: "🕯️" , portrait: "dev/cooking-recipes-images/portraits/Lumiere.png" },
  { name: "Cinderella", realm: "Dreamlight Valley (Base Game)", emoji: "👠" , portrait: "dev/cooking-recipes-images/portraits/Cinderella.png" },
  { name: "The Fairy Godmother", realm: "Dreamlight Valley (Base Game)", emoji: "✨" , portrait: "dev/cooking-recipes-images/portraits/The_Fairy_Godmother.png" },
  { name: "The Forgotten", realm: "Dreamlight Valley (Base Game)", emoji: "👤" , portrait: "dev/cooking-recipes-images/portraits/The_Forgotten.png" },
  { name: "Mirabel", realm: "Dreamlight Valley (Base Game)", emoji: "🦋" , portrait: "dev/cooking-recipes-images/portraits/Mirabel.png" },
  { name: "Anna", realm: "Dreamlight Valley (Base Game)", emoji: "⛄" , portrait: "dev/cooking-recipes-images/portraits/Anna.png" },
  { name: "Elsa", realm: "Dreamlight Valley (Base Game)", emoji: "❄️" , portrait: "dev/cooking-recipes-images/portraits/Elsa.png" },
  { name: "Kristoff", realm: "Dreamlight Valley (Base Game)", emoji: "🦌" , portrait: "dev/cooking-recipes-images/portraits/Kristoff.png" },
  { name: "Olaf", realm: "Dreamlight Valley (Base Game)", emoji: "☃️" , portrait: "dev/cooking-recipes-images/portraits/Olaf.png" },
  { name: "Hercules", realm: "Dreamlight Valley (Base Game)", emoji: "💪" , portrait: "dev/cooking-recipes-images/portraits/Hercules.png" },
  { name: "Phil", realm: "Dreamlight Valley (Base Game)", emoji: "🐐" , portrait: "dev/cooking-recipes-images/portraits/Phil.png" },
  { name: "Joy", realm: "Dreamlight Valley (Base Game)", emoji: "😊" , portrait: "dev/cooking-recipes-images/portraits/Joy.png" },
  { name: "Sadness", realm: "Dreamlight Valley (Base Game)", emoji: "😢" , portrait: "dev/cooking-recipes-images/portraits/Sadness.png" },
  { name: "Lady Tramp", realm: "Dreamlight Valley (Base Game)", emoji: "🐶" , portrait: "dev/cooking-recipes-images/portraits/Lady.png" },
  { name: "Stitch", realm: "Dreamlight Valley (Base Game)", emoji: "👽" , portrait: "dev/cooking-recipes-images/portraits/Stitch.png" },
  { name: "Daisy", realm: "Dreamlight Valley (Base Game)", emoji: "🌼" , portrait: "dev/cooking-recipes-images/portraits/Daisy.png" },
  { name: "Donald Duck", realm: "Dreamlight Valley (Base Game)", emoji: "🦆" , portrait: "dev/cooking-recipes-images/portraits/Donald_Duck.png" },
  { name: "Goofy", realm: "Dreamlight Valley (Base Game)", emoji: "🐕" , portrait: "dev/cooking-recipes-images/portraits/Goofy.png" },
  { name: "Mickey Mouse", realm: "Dreamlight Valley (Base Game)", emoji: "🐭" , portrait: "dev/cooking-recipes-images/portraits/Mickey_Mouse.png" },
  { name: "Minnie Mouse", realm: "Dreamlight Valley (Base Game)", emoji: "🎀" , portrait: "dev/cooking-recipes-images/portraits/Minnie_Mouse.png" },
  { name: "Scrooge McDuck", realm: "Dreamlight Valley (Base Game)", emoji: "💰" , portrait: "dev/cooking-recipes-images/portraits/Scrooge_McDuck.png" },
  { name: "Maui", realm: "Dreamlight Valley (Base Game)", emoji: "🪝" , portrait: "dev/cooking-recipes-images/portraits/Maui.png" },
  { name: "Moana", realm: "Dreamlight Valley (Base Game)", emoji: "🌊" , portrait: "dev/cooking-recipes-images/portraits/Moana.png" },
  { name: "Mike Wazowski", realm: "Dreamlight Valley (Base Game)", emoji: "👁️" , portrait: "dev/cooking-recipes-images/portraits/Mike_Wazowski.png" },
  { name: "Sulley", realm: "Dreamlight Valley (Base Game)", emoji: "🐾" , portrait: "dev/cooking-recipes-images/portraits/Sulley.png" },
  { name: "Mulan", realm: "Dreamlight Valley (Base Game)", emoji: "⚔️" , portrait: "dev/cooking-recipes-images/portraits/Mulan.png" },
  { name: "Mushu", realm: "Dreamlight Valley (Base Game)", emoji: "🐉" , portrait: "dev/cooking-recipes-images/portraits/Mushu.png" },
  { name: "Peter Pan", realm: "Dreamlight Valley (Base Game)", emoji: "🍃" , portrait: "dev/cooking-recipes-images/portraits/Peter_Pan.png" },
  { name: "Pocahontas", realm: "Dreamlight Valley (Base Game)", emoji: "🍁" , portrait: "dev/cooking-recipes-images/portraits/Pocahontas.png" },
  { name: "Remy", realm: "Dreamlight Valley (Base Game)", emoji: "🐀" , portrait: "dev/cooking-recipes-images/portraits/Remy.png" },
  { name: "Mother Gothel", realm: "Dreamlight Valley (Base Game)", emoji: "🌹" , portrait: "dev/cooking-recipes-images/portraits/Mother_Gothel.png" },
  { name: "Nala", realm: "Dreamlight Valley (Base Game)", emoji: "🦁" , portrait: "dev/cooking-recipes-images/portraits/Nala.png" },
  { name: "Pumbaa", realm: "Dreamlight Valley (Base Game)", emoji: "🐗" , portrait: "dev/cooking-recipes-images/portraits/Pumbaa.png" },
  { name: "Scar", realm: "Dreamlight Valley (Base Game)", emoji: "🦁" , portrait: "dev/cooking-recipes-images/portraits/Scar.png" },
  { name: "Simba", realm: "Dreamlight Valley (Base Game)", emoji: "🦁" , portrait: "dev/cooking-recipes-images/portraits/Simba.png" },
  { name: "Timon", realm: "Dreamlight Valley (Base Game)", emoji: "🐾" , portrait: "dev/cooking-recipes-images/portraits/Timon.png" },
  { name: "Ariel", realm: "Dreamlight Valley (Base Game)", emoji: "🧜‍♀️" , portrait: "dev/cooking-recipes-images/portraits/Ariel.png" },
  { name: "Prince Eric", realm: "Dreamlight Valley (Base Game)", emoji: "⛵" , portrait: "dev/cooking-recipes-images/portraits/Prince_Eric.png" },
  { name: "Ursula", realm: "Dreamlight Valley (Base Game)", emoji: "🐙" , portrait: "dev/cooking-recipes-images/portraits/Ursula.png" },
  { name: "Tiana", realm: "Dreamlight Valley (Base Game)", emoji: "🐸" , portrait: "dev/cooking-recipes-images/portraits/Tiana.png" },
  { name: "Merlin", realm: "Dreamlight Valley (Base Game)", emoji: "🧙" , portrait: "dev/cooking-recipes-images/portraits/Merlin.png" },
  { name: "Jack Skellington", realm: "Dreamlight Valley (Base Game)", emoji: "🎃" , portrait: "dev/cooking-recipes-images/portraits/Jack_Skellington.png" },
  { name: "Sally", realm: "Dreamlight Valley (Base Game)", emoji: "🧵" , portrait: "dev/cooking-recipes-images/portraits/Sally.png" },
  { name: "Buzz Lightyear", realm: "Dreamlight Valley (Base Game)", emoji: "🚀" , portrait: "dev/cooking-recipes-images/portraits/Buzz_Lightyear.png" },
  { name: "Woody", realm: "Dreamlight Valley (Base Game)", emoji: "🤠" , portrait: "dev/cooking-recipes-images/portraits/Woody.png" },
  { name: "WALL-E", realm: "Dreamlight Valley (Base Game)", emoji: "🤖" , portrait: "dev/cooking-recipes-images/portraits/WALL-E.png" },
  { name: "Vanellope", realm: "Dreamlight Valley (Base Game)", emoji: "🍭" , portrait: "dev/cooking-recipes-images/portraits/Vanellope.png" },

  // Eternity Isle (DLC)
  { name: "Jafar", realm: "Eternity Isle (DLC)", emoji: "🐍" , portrait: "dev/cooking-recipes-images/portraits/Jafar.png" },
  { name: "Gaston", realm: "Eternity Isle (DLC)", emoji: "💪" , portrait: "dev/cooking-recipes-images/portraits/Gaston.png" },
  { name: "Oswald", realm: "Eternity Isle (DLC)", emoji: "🐰" , portrait: "dev/cooking-recipes-images/portraits/Oswald.png" },
  { name: "Rapunzel", realm: "Eternity Isle (DLC)", emoji: "👸" , portrait: "dev/cooking-recipes-images/portraits/Rapunzel.png" },
  { name: "EVE", realm: "Eternity Isle (DLC)", emoji: "🛸" , portrait: "dev/cooking-recipes-images/portraits/EVE.png" },

  // Storybook Vale (DLC)
  { name: "Merida", realm: "Storybook Vale (DLC)", emoji: "🏹" , portrait: "dev/cooking-recipes-images/portraits/Merida.png" },
  { name: "Hades", realm: "Storybook Vale (DLC)", emoji: "🔥" , portrait: "dev/cooking-recipes-images/portraits/Hades.png" },
  { name: "Aurora", realm: "Storybook Vale (DLC)", emoji: "🌹" , portrait: "dev/cooking-recipes-images/portraits/Aurora.png" },
  { name: "Maleficent", realm: "Storybook Vale (DLC)", emoji: "🐉" , portrait: "dev/cooking-recipes-images/portraits/Maleficent.png" },
  { name: "Flynn", realm: "Storybook Vale (DLC)", emoji: "🗡️" , portrait: "dev/cooking-recipes-images/portraits/Flynn.png" },

  // Wishblossom Mountains (DLC)
  { name: "Cruella", realm: "Wishblossom Mountains (DLC)", emoji: "🐾" , portrait: "dev/cooking-recipes-images/portraits/Cruella.png" },
  { name: "Tinker Bell", realm: "Wishblossom Mountains (DLC)", emoji: "🧚" , portrait: "dev/cooking-recipes-images/portraits/Tinker_Bell.png" },
  { name: "Snow White", realm: "Wishblossom Mountains (DLC)", emoji: "🍎" , portrait: "dev/cooking-recipes-images/portraits/Snow_White.png" },
  { name: "Tigger", realm: "Wishblossom Mountains (DLC)", emoji: "🐯" , portrait: "dev/cooking-recipes-images/portraits/Tigger.png" },

  // Honeyglow Woods (DLC)
  { name: "Eeyore", realm: "Honeyglow Woods (DLC)", emoji: "🐴" , portrait: "dev/cooking-recipes-images/portraits/Eeyore.png" },
  { name: "Piglet", realm: "Honeyglow Woods (DLC)", emoji: "🐷" , portrait: "dev/cooking-recipes-images/portraits/Piglet.png" },
  { name: "Winnie the Pooh", realm: "Honeyglow Woods (DLC)", emoji: "🍯" , portrait: "dev/cooking-recipes-images/portraits/Winnie_the_Pooh.png" },
];

const KNOWN_RECIPES = [
  {
    "name": "Arendellian Pickled Herring",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Herring",
      "Lemon",
      "Onion",
      "Garlic",
      "Any Spice"
    ],
    "stars": 5,
    "energy": "1,962",
    "sellPrice": "532"
  },
  {
    "name": "Bell Pepper Puffs",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Bell Pepper",
      "Egg",
      "Cheese"
    ],
    "stars": 3,
    "energy": "1,272",
    "sellPrice": "606"
  },
  {
    "name": "Buñuelos",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Wheat",
      "Cheese",
      "Milk",
      "Egg"
    ],
    "stars": 4,
    "energy": "1,881",
    "sellPrice": "948"
  },
  {
    "name": "Cheese Platter",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Cheese"
    ],
    "stars": 1,
    "energy": "482",
    "sellPrice": "216"
  },
  {
    "name": "Chili Pepper Puffs",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Chili Pepper",
      "Egg",
      "Cheese"
    ],
    "stars": 3,
    "energy": "1,382",
    "sellPrice": "669"
  },
  {
    "name": "Chrysanthemum Tea",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Chrysanthemum Tea Leaves",
      "Blueberry"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "69"
  },
  {
    "name": "Coffee",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Coffee Bean"
    ],
    "stars": 1,
    "energy": "730",
    "sellPrice": "43"
  },
  {
    "name": "Crackers",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Grain"
    ],
    "stars": 1,
    "energy": "80",
    "sellPrice": "2"
  },
  {
    "name": "Creamy Soup",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Spice",
      "Milk",
      "Potato",
      "Any Vegetable",
      "Any Vegetable"
    ],
    "stars": 4,
    "energy": "1,005",
    "sellPrice": "568"
  },
  {
    "name": "Crudités",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Bell Pepper",
      "Carrot",
      "Cucumber",
      "Mushroom",
      "Zucchini"
    ],
    "stars": 1,
    "energy": "83",
    "sellPrice": "26"
  },
  {
    "name": "Dream Fizz",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Dreamlight Fruit",
      "Sugarcane",
      "Wheat",
      "Slush Ice"
    ],
    "stars": 4,
    "energy": "1,550",
    "sellPrice": "316"
  },
  {
    "name": "Eggplant Puffs",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Eggplant",
      "Egg",
      "Cheese"
    ],
    "stars": 3,
    "energy": "1,941",
    "sellPrice": "991"
  },
  {
    "name": "French Fries",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Canola",
      "Potato"
    ],
    "stars": 2,
    "energy": "342",
    "sellPrice": "304"
  },
  {
    "name": "Gazpacho",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Cucumber",
      "Tomato",
      "Onion",
      "Any Spice"
    ],
    "stars": 4,
    "energy": "688",
    "sellPrice": "548"
  },
  {
    "name": "Green Salad",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Vegetable",
      "Lettuce",
      "Any Vegetable",
      "Asparagus",
      "Bamboo"
    ],
    "stars": 2,
    "energy": "180",
    "sellPrice": "20"
  },
  {
    "name": "Grilled Vegetables",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Broccoli",
      "Cabbage",
      "Celery",
      "Chili Pepper",
      "Corn",
      "Eggplant",
      "Flute Root",
      "Onion",
      "Pumpkin",
      "Seaweed"
    ],
    "stars": 1,
    "energy": "83",
    "sellPrice": "9"
  },
  {
    "name": "Grilled Veggie Platter",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Spinach",
      "Turnip",
      "Yam",
      "Any Vegetable",
      "Any Vegetable",
      "Any Vegetable"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "33"
  },
  {
    "name": "Hard-Boiled Eggs",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Egg"
    ],
    "stars": 1,
    "energy": "578",
    "sellPrice": "264"
  },
  {
    "name": "Jasmine Tea",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Jasmine Tea Leaves",
      "Sugarcane",
      "Any Seafood"
    ],
    "stars": 2,
    "energy": "170",
    "sellPrice": "56"
  },
  {
    "name": "Large Seafood Platter",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Seafood",
      "Any Seafood",
      "Any Seafood"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "56"
  },
  {
    "name": "Latte",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Lemon",
      "Coffee Bean",
      "Milk"
    ],
    "stars": 2,
    "energy": "1,358",
    "sellPrice": "345"
  },
  {
    "name": "Mocha",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Coffee Bean",
      "Milk",
      "Cocoa Bean"
    ],
    "stars": 3,
    "energy": "2,246",
    "sellPrice": "425"
  },
  {
    "name": "Okra Soup",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Okra"
    ],
    "stars": 1,
    "energy": "99",
    "sellPrice": "136"
  },
  {
    "name": "Onion Puffs",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Onion",
      "Egg",
      "Cheese"
    ],
    "stars": 3,
    "energy": "1,392",
    "sellPrice": "798"
  },
  {
    "name": "Oolong Tea",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Oolong Tea Leaves",
      "Raspberry"
    ],
    "stars": 2,
    "energy": "559",
    "sellPrice": "59"
  },
  {
    "name": "Oyster Platter",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Oyster",
      "Lemon"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "107"
  },
  {
    "name": "Peppermint Tea",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Lemon",
      "Mint"
    ],
    "stars": 2,
    "energy": "993",
    "sellPrice": "107"
  },
  {
    "name": "Pickled Herring",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Herring",
      "Lemon",
      "Onion",
      "Any Spice"
    ],
    "stars": 4,
    "energy": "1,609",
    "sellPrice": "423"
  },
  {
    "name": "Potato Leek Soup",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Leek",
      "Potato",
      "Milk",
      "Onion",
      "Garlic"
    ],
    "stars": 5,
    "energy": "1,984",
    "sellPrice": "1,415"
  },
  {
    "name": "Potato Puffs",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Potato",
      "Egg",
      "Cheese"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "736"
  },
  {
    "name": "Pottage",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Potato",
      "Any Spice",
      "Any Vegetable"
    ],
    "stars": 3,
    "energy": "335",
    "sellPrice": "208"
  },
  {
    "name": "Pumpkin Puffs",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Pumpkin",
      "Egg",
      "Cheese"
    ],
    "stars": 3,
    "energy": "1,466",
    "sellPrice": "1,489"
  },
  {
    "name": "Pumpkin Soup",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Vegetable",
      "Milk",
      "Ginger",
      "Pumpkin"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "1,428"
  },
  {
    "name": "Purée",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Potato"
    ],
    "stars": 1,
    "energy": "230",
    "sellPrice": "151"
  },
  {
    "name": "Roasted Asparagus",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Asparagus",
      "Canola"
    ],
    "stars": 2,
    "energy": "221",
    "sellPrice": "313"
  },
  {
    "name": "Salad",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Lettuce"
    ],
    "stars": 1,
    "energy": "139",
    "sellPrice": "9"
  },
  {
    "name": "Sautéed Mushrooms",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Mushroom",
      "Butter"
    ],
    "stars": 2,
    "energy": "712",
    "sellPrice": "286"
  },
  {
    "name": "Seafood Appetizer",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Seafood"
    ],
    "stars": 1,
    "energy": "242",
    "sellPrice": "1"
  },
  {
    "name": "Seafood Platter",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Seafood",
      "Any Seafood"
    ],
    "stars": 2,
    "energy": "458",
    "sellPrice": "2"
  },
  {
    "name": "Sesame Balls",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Wheat",
      "Ginger",
      "Rice"
    ],
    "stars": 5,
    "energy": "722",
    "sellPrice": "322"
  },
  {
    "name": "Soufflé",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Soya",
      "Seaweed",
      "Cheese",
      "Egg",
      "Milk",
      "Butter"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "1,230"
  },
  {
    "name": "Sweet Herring",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Herring",
      "Onion"
    ],
    "stars": 2,
    "energy": "723",
    "sellPrice": "305"
  },
  {
    "name": "Tea Sandwiches",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Wheat",
      "Corn",
      "Cherry",
      "Any Fish"
    ],
    "stars": 4,
    "energy": "1,378",
    "sellPrice": "91"
  },
  {
    "name": "Tomato Soup",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Tomato"
    ],
    "stars": 1,
    "energy": null,
    "sellPrice": "26"
  },
  {
    "name": "Vegetable Soup",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Vegetable",
      "Any Vegetable"
    ],
    "stars": 2,
    "energy": "120",
    "sellPrice": "20"
  },
  {
    "name": "Zucchini Puffs",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Zucchini",
      "Egg",
      "Cheese"
    ],
    "stars": 3,
    "energy": "1,216",
    "sellPrice": "632"
  },
  {
    "name": "Apple-Cider-Glazed Salmon",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Salmon",
      "Sugarcane",
      "Apple"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "271"
  },
  {
    "name": "Baked Carp",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Carp",
      "Butter"
    ],
    "stars": 2,
    "energy": "1,894",
    "sellPrice": "767"
  },
  {
    "name": "Basil Omelet",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Basil",
      "Egg",
      "Cheese",
      "Milk"
    ],
    "stars": 4,
    "energy": "2,035",
    "sellPrice": "1,020"
  },
  {
    "name": "Bouillabaisse",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Seafood",
      "Any Seafood",
      "Shrimp",
      "Tomato",
      "Any Vegetable"
    ],
    "stars": 5,
    "energy": "2,114",
    "sellPrice": "529"
  },
  {
    "name": "Brandade de Morue",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Cod",
      "Potato",
      "Milk",
      "Lemon",
      "Garlic"
    ],
    "stars": 5,
    "energy": "2,336",
    "sellPrice": "757"
  },
  {
    "name": "Carp Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Carp",
      "Lemon",
      "Lettuce"
    ],
    "stars": 3,
    "energy": "2,310",
    "sellPrice": "617"
  },
  {
    "name": "Cheesy Crispy Baked Cod",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Cod",
      "Wheat",
      "Cheese"
    ],
    "stars": 3,
    "energy": "840",
    "sellPrice": "303"
  },
  {
    "name": "Chowder",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Seafood",
      "Milk",
      "Potato",
      "Any Vegetable"
    ],
    "stars": 4,
    "energy": "1,186",
    "sellPrice": "547"
  },
  {
    "name": "Creamy Garlic Scallops",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Scallop",
      "Lemon",
      "Butter",
      "Garlic"
    ],
    "stars": 4,
    "energy": "1,844",
    "sellPrice": "484"
  },
  {
    "name": "Crispy Baked Cod",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Cod",
      "Wheat",
      "Any Fish"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "47"
  },
  {
    "name": "Fish Creole",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Vegetable",
      "Garlic",
      "Rice",
      "Tomato"
    ],
    "stars": 5,
    "energy": "822",
    "sellPrice": "225"
  },
  {
    "name": "Fish 'n' Chips",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Wheat",
      "Canola",
      "Potato"
    ],
    "stars": 4,
    "energy": "697",
    "sellPrice": "356"
  },
  {
    "name": "Fish Pasta",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Garlic",
      "Wheat",
      "Milk"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "424"
  },
  {
    "name": "Fish Pie",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Wheat",
      "Butter"
    ],
    "stars": 3,
    "energy": "867",
    "sellPrice": "269"
  },
  {
    "name": "Fish Risotto",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Rice",
      "Butter"
    ],
    "stars": 3,
    "energy": "939",
    "sellPrice": "352"
  },
  {
    "name": "Fish Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Lemon",
      "Lettuce"
    ],
    "stars": 3,
    "energy": "1,140",
    "sellPrice": "58"
  },
  {
    "name": "Fish Sandwich",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Wheat"
    ],
    "stars": 2,
    "energy": "337",
    "sellPrice": "3"
  },
  {
    "name": "Fish Soup",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Any Vegetable",
      "Milk"
    ],
    "stars": 3,
    "energy": "978",
    "sellPrice": "334"
  },
  {
    "name": "Fish Steak",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Tomato",
      "Basil"
    ],
    "stars": 3,
    "energy": "537",
    "sellPrice": "101"
  },
  {
    "name": "Fish Tacos",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Corn",
      "Chili Pepper",
      "Cheese"
    ],
    "stars": 4,
    "energy": "1,171",
    "sellPrice": "412"
  },
  {
    "name": "Fugu Sushi",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Fugu",
      "Rice",
      "Seaweed"
    ],
    "stars": 3,
    "energy": "3,261",
    "sellPrice": "1,373"
  },
  {
    "name": "Ghostly Fish Steak",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Here and There Fish",
      "Lemon",
      "Asparagus",
      "Bell Pepper",
      "Oregano"
    ],
    "stars": 5,
    "energy": "3,282",
    "sellPrice": "3,596"
  },
  {
    "name": "Greek Pizza",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Spice",
      "Tomato",
      "Onion",
      "Cheese"
    ],
    "stars": 5,
    "energy": "1,012",
    "sellPrice": "622"
  },
  {
    "name": "Grilled Fish",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Any Fish"
    ],
    "stars": 1,
    "energy": "290",
    "sellPrice": "1"
  },
  {
    "name": "Grilled Fish Entree",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Any Vegetable",
      "Okra"
    ],
    "stars": 2,
    "energy": "340",
    "sellPrice": "11"
  },
  {
    "name": "Gumbo",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Shrimp",
      "Chili Pepper",
      "Tomato",
      "Onion"
    ],
    "stars": 0,
    "energy": "2,226",
    "sellPrice": "1,093"
  },
  {
    "name": "Hearty Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Vegetable",
      "Lettuce",
      "Any Vegetable"
    ],
    "stars": 3,
    "energy": "224",
    "sellPrice": "33"
  },
  {
    "name": "Hors d'Oeuvres",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Spice"
    ],
    "stars": 1,
    "energy": "90",
    "sellPrice": "18"
  },
  {
    "name": "Kappa Maki",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Seaweed",
      "Cucumber",
      "Rice"
    ],
    "stars": 3,
    "energy": "462",
    "sellPrice": "335"
  },
  {
    "name": "Kronk's Spinach Puffs",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Spinach",
      "Cheese",
      "Canola"
    ],
    "stars": 3,
    "energy": "750",
    "sellPrice": "461"
  },
  {
    "name": "Lancetfish Paella",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Lancetfish",
      "Shrimp",
      "Any Seafood",
      "Tomato",
      "Rice"
    ],
    "stars": 5,
    "energy": "4,550",
    "sellPrice": "1,653"
  },
  {
    "name": "Latkes",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Onion",
      "Potato",
      "Canola",
      "Egg"
    ],
    "stars": 4,
    "energy": "1,280",
    "sellPrice": "937"
  },
  {
    "name": "Leek Soup",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Leek"
    ],
    "stars": 1,
    "energy": "414",
    "sellPrice": "370"
  },
  {
    "name": "Lemon Garlic Swordfish",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Swordfish",
      "Garlic",
      "Lemon"
    ],
    "stars": 3,
    "energy": "3,713",
    "sellPrice": "1,096"
  },
  {
    "name": "Lioness Feast",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Mushroom",
      "Tomato",
      "Oregano",
      "Here and There Fish"
    ],
    "stars": 4,
    "energy": "2,368",
    "sellPrice": "3,153"
  },
  {
    "name": "Lobster Roll",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Lobster",
      "Wheat",
      "Lemon",
      "Butter",
      "Garlic"
    ],
    "stars": 5,
    "energy": "4,928",
    "sellPrice": "1,959"
  },
  {
    "name": "Maguro Sushi",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tuna",
      "Seaweed",
      "Rice",
      "Ginger"
    ],
    "stars": 4,
    "energy": "1,206",
    "sellPrice": "338"
  },
  {
    "name": "Maki",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Seaweed",
      "Rice"
    ],
    "stars": 3,
    "energy": "471",
    "sellPrice": "114"
  },
  {
    "name": "Margherita Pizza",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Spice",
      "Tomato",
      "Cheese",
      "Wheat"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "328"
  },
  {
    "name": "Marvelous Jam",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Dreamlight Fruit",
      "Wheat",
      "Cucumber"
    ],
    "stars": 2,
    "energy": "932",
    "sellPrice": "54"
  },
  {
    "name": "Mediterranean Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tomato",
      "Onion",
      "Lettuce",
      "Any Spice"
    ],
    "stars": 5,
    "energy": "836",
    "sellPrice": "597"
  },
  {
    "name": "Mushroom Pizza",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Mushroom",
      "Wheat",
      "Tomato",
      "Cheese"
    ],
    "stars": 4,
    "energy": "837",
    "sellPrice": "351"
  },
  {
    "name": "Mushu's Congee",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Rice",
      "Egg",
      "Mushroom",
      "Garlic",
      "Ginger"
    ],
    "stars": 5,
    "energy": "1,658",
    "sellPrice": "657"
  },
  {
    "name": "Nachos",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Chili Pepper",
      "Corn",
      "Cheese"
    ],
    "stars": 3,
    "energy": "842",
    "sellPrice": "383"
  },
  {
    "name": "Omelet",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Egg",
      "Cheese",
      "Milk"
    ],
    "stars": 3,
    "energy": "1,751",
    "sellPrice": "882"
  },
  {
    "name": "Pan-Fried Angler Fish",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Anglerfish",
      "Tomato",
      "Zucchini",
      "Potato"
    ],
    "stars": 4,
    "energy": "4,194",
    "sellPrice": "2,550"
  },
  {
    "name": "Pan-Seared Bass & Vegetables",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Bass",
      "Any Vegetable",
      "Any Vegetable"
    ],
    "stars": 3,
    "energy": "394",
    "sellPrice": "57"
  },
  {
    "name": "Pan-Seared Tilapia & Vegetables",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tilapia",
      "Any Vegetable",
      "Any Vegetable"
    ],
    "stars": 3,
    "energy": "2,194",
    "sellPrice": "862"
  },
  {
    "name": "Pasta",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Tomato"
    ],
    "stars": 2,
    "energy": "117",
    "sellPrice": "30"
  },
  {
    "name": "Peanut Butter Sandwich",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Peanut",
      "Wheat"
    ],
    "stars": 2,
    "energy": "592",
    "sellPrice": "262"
  },
  {
    "name": "Pesto with Linguine",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Butter",
      "Garlic",
      "Oregano"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "438"
  },
  {
    "name": "Pizza",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tomato",
      "Cheese",
      "Wheat"
    ],
    "stars": 3,
    "energy": "607",
    "sellPrice": "284"
  },
  {
    "name": "Poached Basil-Butter Sturgeon",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "White Sturgeon",
      "Basil",
      "Lemon",
      "Butter"
    ],
    "stars": 4,
    "energy": "4,961",
    "sellPrice": "2,284"
  },
  {
    "name": "Poutine",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Potato",
      "Canola",
      "Cheese"
    ],
    "stars": 3,
    "energy": "845",
    "sellPrice": "580"
  },
  {
    "name": "Ranch Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Lettuce",
      "Bell Pepper",
      "Corn",
      "Tomato",
      "Onion"
    ],
    "stars": 5,
    "energy": "714",
    "sellPrice": "396"
  },
  {
    "name": "Ratatouille",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tomato",
      "Eggplant",
      "Onion",
      "Zucchini",
      "Any Spice"
    ],
    "stars": 5,
    "energy": "1,432",
    "sellPrice": "906"
  },
  {
    "name": "Sake Maki",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Rice",
      "Seaweed",
      "Salmon"
    ],
    "stars": 3,
    "energy": "1,101",
    "sellPrice": "323"
  },
  {
    "name": "Sake Sushi",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Salmon",
      "Rice"
    ],
    "stars": 2,
    "energy": "1,000",
    "sellPrice": "274"
  },
  {
    "name": "Savory Fish",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Lemon"
    ],
    "stars": 2,
    "energy": "985",
    "sellPrice": "43"
  },
  {
    "name": "Scrambled Egg",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Egg",
      "Cheese"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "520"
  },
  {
    "name": "Seafood Boil",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Seafood",
      "Any Spice",
      "Potato",
      "Corn"
    ],
    "stars": 4,
    "energy": "596",
    "sellPrice": "236"
  },
  {
    "name": "Seafood Pasta",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Seafood",
      "Wheat",
      "Milk"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "325"
  },
  {
    "name": "Seafood Pie",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Seafood",
      "Wheat",
      "Butter"
    ],
    "stars": 3,
    "energy": "813",
    "sellPrice": "269"
  },
  {
    "name": "Seafood Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Seafood",
      "Lettuce"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "11"
  },
  {
    "name": "Seafood Soup",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Seafood",
      "Any Vegetable",
      "Any Vegetable"
    ],
    "stars": 3,
    "energy": "340",
    "sellPrice": "23"
  },
  {
    "name": "Seared Rainbow Trout",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Rainbow Trout",
      "Tomato",
      "Onion"
    ],
    "stars": 3,
    "energy": "889",
    "sellPrice": "338"
  },
  {
    "name": "Simple Fried Perch",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Perch",
      "Wheat",
      "Butter"
    ],
    "stars": 3,
    "energy": "1,317",
    "sellPrice": "380"
  },
  {
    "name": "Smoked Peanuts and Anglerfish",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Anglerfish",
      "Peanut"
    ],
    "stars": 2,
    "energy": "3,960",
    "sellPrice": "2,210"
  },
  {
    "name": "Sole Meunière",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Sole",
      "Wheat",
      "Butter",
      "Lemon"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "637"
  },
  {
    "name": "Spaghetti Arrabbiata",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tomato",
      "Wheat",
      "Chili Pepper"
    ],
    "stars": 3,
    "energy": "373",
    "sellPrice": "141"
  },
  {
    "name": "Spicy Baked Bream",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Bream",
      "Chili Pepper",
      "Butter"
    ],
    "stars": 3,
    "energy": "2,075",
    "sellPrice": "767"
  },
  {
    "name": "Steamed Fugu",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Fugu",
      "Ginger",
      "Garlic"
    ],
    "stars": 3,
    "energy": "3,668",
    "sellPrice": "1,400"
  },
  {
    "name": "Sushi",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Fish",
      "Rice"
    ],
    "stars": 2,
    "energy": "405",
    "sellPrice": "80"
  },
  {
    "name": "Sweet & Sour Kingfish Steak",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Kingfish",
      "Sugarcane",
      "Lemon"
    ],
    "stars": 3,
    "energy": "2,292",
    "sellPrice": "702"
  },
  {
    "name": "Sweet Udon",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Dreamlight Fruit",
      "Rice",
      "Any Seafood",
      "Any Sweet"
    ],
    "stars": 4,
    "energy": "1,427",
    "sellPrice": "180"
  },
  {
    "name": "Tamagoyaki",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Egg",
      "Sugarcane"
    ],
    "stars": 2,
    "energy": "689",
    "sellPrice": "310"
  },
  {
    "name": "Tasty Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Lettuce",
      "Cucumber",
      "Any Vegetable",
      "Any Spice"
    ],
    "stars": 4,
    "energy": "517",
    "sellPrice": "284"
  },
  {
    "name": "Tasty Veggies",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Vegetable",
      "Any Spice"
    ],
    "stars": 2,
    "energy": "127",
    "sellPrice": "29"
  },
  {
    "name": "Tekka Maki",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tuna",
      "Soya",
      "Seaweed",
      "Rice"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "366"
  },
  {
    "name": "Teriyaki Salmon",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Soya",
      "Salmon",
      "Sugarcane",
      "Rice",
      "Ginger"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "557"
  },
  {
    "name": "Tuna Burger",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tuna",
      "Onion",
      "Lemon",
      "Wheat",
      "Any Vegetable"
    ],
    "stars": 5,
    "energy": "1,922",
    "sellPrice": "491"
  },
  {
    "name": "Vegetarian Pizza",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Vegetable",
      "Any Vegetable",
      "Tomato",
      "Cheese",
      "Wheat"
    ],
    "stars": 5,
    "energy": "754",
    "sellPrice": "350"
  },
  {
    "name": "Vegetarian Stew",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Potato",
      "Carrot",
      "Onion"
    ],
    "stars": 3,
    "energy": "617",
    "sellPrice": "475"
  },
  {
    "name": "Vegetarian Taco",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Corn",
      "Chili Pepper",
      "Cheese",
      "Any Vegetable"
    ],
    "stars": 4,
    "energy": "925",
    "sellPrice": "423"
  },
  {
    "name": "Veggie Casserole",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Vegetable",
      "Any Vegetable",
      "Cheese",
      "Any Spice"
    ],
    "stars": 4,
    "energy": "688",
    "sellPrice": "316"
  },
  {
    "name": "Veggie Pasta",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tomato",
      "Wheat",
      "Any Vegetable"
    ],
    "stars": 3,
    "energy": "158",
    "sellPrice": "43"
  },
  {
    "name": "Veggie Pie",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Vegetable",
      "Butter",
      "Wheat"
    ],
    "stars": 3,
    "energy": "634",
    "sellPrice": "279"
  },
  {
    "name": "Veggie Skewers",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Mushroom",
      "Zucchini",
      "Onion",
      "Bell Pepper"
    ],
    "stars": 4,
    "energy": "767",
    "sellPrice": "427"
  },
  {
    "name": "Walleye en Papillote",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Walleye",
      "Basil",
      "Oregano",
      "Any Vegetable"
    ],
    "stars": 4,
    "energy": "3,689",
    "sellPrice": "1,812"
  },
  {
    "name": "Wheat Porridge",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Milk",
      "Wheat"
    ],
    "stars": 2,
    "energy": "668",
    "sellPrice": "301"
  },
  {
    "name": "Wheat Porridge with Fruit",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Milk",
      "Wheat",
      "Any Fruit"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "336"
  },
  {
    "name": "Wonton Soup",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Egg",
      "Shrimp",
      "Wheat",
      "Onion"
    ],
    "stars": 4,
    "energy": "2,415",
    "sellPrice": "1,038"
  },
  {
    "name": "\"My Hero\" Cookie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Butter",
      "Any Sweet"
    ],
    "stars": 3,
    "energy": "679",
    "sellPrice": "294"
  },
  {
    "name": "Apple Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Apple",
      "Wheat",
      "Butter"
    ],
    "stars": 3,
    "energy": "1,137",
    "sellPrice": "303"
  },
  {
    "name": "Apple Sorbet",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Apple",
      "Sugarcane"
    ],
    "stars": 3,
    "energy": "1,077",
    "sellPrice": "271"
  },
  {
    "name": "Aurora's Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Sugarcane",
      "Egg",
      "Any Fruit",
      "Milk"
    ],
    "stars": 5,
    "energy": "1,572",
    "sellPrice": "767"
  },
  {
    "name": "Banana Ice Cream",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Banana",
      "Milk",
      "Sugarcane"
    ],
    "stars": 4,
    "energy": "1,884",
    "sellPrice": "641"
  },
  {
    "name": "Banana Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Banana",
      "Wheat",
      "Butter"
    ],
    "stars": 3,
    "energy": "1,227",
    "sellPrice": "308"
  },
  {
    "name": "Banana Split",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Banana",
      "Milk",
      "Sugarcane",
      "Any Sweet"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "714"
  },
  {
    "name": "Beignets",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Canola",
      "Wheat",
      "Egg",
      "Sugarcane"
    ],
    "stars": 4,
    "energy": "912",
    "sellPrice": "524"
  },
  {
    "name": "Berry Salad",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Raspberry",
      "Blueberry",
      "Gooseberry"
    ],
    "stars": 3,
    "energy": "2,255",
    "sellPrice": "139"
  },
  {
    "name": "Birthday Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Cocoa Bean",
      "Wheat",
      "Sugarcane",
      "Egg",
      "Butter"
    ],
    "stars": 5,
    "energy": "2,310",
    "sellPrice": "749"
  },
  {
    "name": "Biscuits",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Sugarcane",
      "Butter"
    ],
    "stars": 3,
    "energy": "679",
    "sellPrice": "294"
  },
  {
    "name": "Blueberry Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Blueberry",
      "Wheat",
      "Butter"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "308"
  },
  {
    "name": "Boba Tea",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sugarcane",
      "Milk"
    ],
    "stars": 2,
    "energy": "714",
    "sellPrice": "323"
  },
  {
    "name": "Candy",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Any Sweet"
    ],
    "stars": 1,
    "energy": null,
    "sellPrice": "22"
  },
  {
    "name": "Cannoli",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Cheese",
      "Egg",
      "Vanilla"
    ],
    "stars": 4,
    "energy": "1,482",
    "sellPrice": "678"
  },
  {
    "name": "Caramel Apples",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sugarcane",
      "Apple"
    ],
    "stars": 2,
    "energy": "638",
    "sellPrice": "56"
  },
  {
    "name": "Carrot Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Carrot",
      "Wheat",
      "Egg",
      "Sugarcane"
    ],
    "stars": 4,
    "energy": "908",
    "sellPrice": "427"
  },
  {
    "name": "Cheesecake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Cheese",
      "Wheat",
      "Sugarcane",
      "Any Fruit"
    ],
    "stars": 4,
    "energy": "725",
    "sellPrice": "314"
  },
  {
    "name": "Cherry Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Cherry",
      "Wheat",
      "Butter"
    ],
    "stars": 3,
    "energy": "1,497",
    "sellPrice": "326"
  },
  {
    "name": "Cheshire Cat Tail",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Cocoa Bean",
      "Egg",
      "Wheat",
      "Sugarcane"
    ],
    "stars": 4,
    "energy": "1,655",
    "sellPrice": "418"
  },
  {
    "name": "Chocolate Chip Cookies",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Cocoa Bean",
      "Wheat",
      "Sugarcane",
      "Butter"
    ],
    "stars": 4,
    "energy": "1,569",
    "sellPrice": "373"
  },
  {
    "name": "Chocolate Ice Cream",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Cocoa Bean",
      "Sugarcane",
      "Milk",
      "Slush Ice"
    ],
    "stars": 4,
    "energy": "2,074",
    "sellPrice": "655"
  },
  {
    "name": "Chocolate Waffles",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Cocoa Bean",
      "Wheat",
      "Egg",
      "Milk"
    ],
    "stars": 4,
    "energy": "2,223",
    "sellPrice": "735"
  },
  {
    "name": "Coconut Boba Tea",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sugarcane",
      "Milk",
      "Coconut"
    ],
    "stars": 3,
    "energy": "1,653",
    "sellPrice": "406"
  },
  {
    "name": "Coconut Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Coconut",
      "Wheat",
      "Egg",
      "Sugarcane"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "424"
  },
  {
    "name": "Coconut Ice Cream",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Milk",
      "Sugarcane",
      "Coconut"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "661"
  },
  {
    "name": "Crepe",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Egg",
      "Milk",
      "Vanilla"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "753"
  },
  {
    "name": "Dream Ice Cream",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Dreamlight Fruit",
      "Milk",
      "Slush Ice"
    ],
    "stars": 3,
    "energy": "1,976",
    "sellPrice": "588"
  },
  {
    "name": "Festive Blueberry Hot Cocoa",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sugarcane",
      "Milk",
      "Festive Cocoa Bean",
      "Blueberry"
    ],
    "stars": 4,
    "energy": "1,647",
    "sellPrice": "491"
  },
  {
    "name": "Festive Cherry Hot Cocoa",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sugarcane",
      "Milk",
      "Festive Cocoa Bean"
    ],
    "stars": 4,
    "energy": "1,932",
    "sellPrice": "511"
  },
  {
    "name": "Festive Mint Hot Cocoa",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Cherry",
      "Sugarcane",
      "Milk"
    ],
    "stars": 4,
    "energy": "1,276",
    "sellPrice": "523"
  },
  {
    "name": "Fruit Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Festive Cocoa Bean",
      "Mint",
      "Any Fruit",
      "Coconut",
      "Coffee Bean",
      "Lemon",
      "Raspberry",
      "Grapes"
    ],
    "stars": 3,
    "energy": "634",
    "sellPrice": "280"
  },
  {
    "name": "Fruit Salad",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Butter",
      "Any Fruit"
    ],
    "stars": 1,
    "energy": "83",
    "sellPrice": "10"
  },
  {
    "name": "Fruit Sorbet",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Any Fruit"
    ],
    "stars": 2,
    "energy": "467",
    "sellPrice": "206"
  },
  {
    "name": "Fruitcake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Any Fruit",
      "Any Fruit",
      "Any Fruit"
    ],
    "stars": 4,
    "energy": "203",
    "sellPrice": "42"
  },
  {
    "name": "Garlic Chocolate Tart",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Cheese",
      "Cocoa Bean",
      "Garlic",
      "Egg",
      "Wheat"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "783"
  },
  {
    "name": "Gingerbread House",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Ginger",
      "Sugarcane",
      "Vanilla",
      "Egg"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "545"
  },
  {
    "name": "Gooseberry Boba Tea",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sugarcane",
      "Milk",
      "Gooseberry"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "418"
  },
  {
    "name": "Gray Stuff",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Any Dairy or Oil",
      "Sugarcane",
      "Cocoa Bean"
    ],
    "stars": 3,
    "energy": "976",
    "sellPrice": "87"
  },
  {
    "name": "Halloween Gingerbread Cookies",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Pumpkin",
      "Ginger"
    ],
    "stars": 3,
    "energy": "735",
    "sellPrice": "1,001"
  },
  {
    "name": "Hot Cocoa",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sugarcane",
      "Milk",
      "Cocoa Bean"
    ],
    "stars": 3,
    "energy": "1,563",
    "sellPrice": "401"
  },
  {
    "name": "Ice Cream",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Milk",
      "Sugarcane"
    ],
    "stars": 3,
    "energy": "1,158",
    "sellPrice": "558"
  },
  {
    "name": "Jam Waffles",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Any Fruit",
      "Wheat",
      "Egg",
      "Milk"
    ],
    "stars": 4,
    "energy": "1,407",
    "sellPrice": "691"
  },
  {
    "name": "Joyful Meal",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Blueberry",
      "Raspberry",
      "Banana"
    ],
    "stars": 4,
    "energy": "1,938",
    "sellPrice": "120"
  },
  {
    "name": "Lemon Sorbet",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Lemon"
    ],
    "stars": 2,
    "energy": "1,112",
    "sellPrice": "237"
  },
  {
    "name": "Meringue Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Lemon",
      "Wheat",
      "Egg",
      "Butter"
    ],
    "stars": 4,
    "energy": "2,014",
    "sellPrice": "667"
  },
  {
    "name": "Mermaid Cupcake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Butter",
      "Milk",
      "Wheat",
      "Sugarcane",
      "Scallop"
    ],
    "stars": 5,
    "energy": "1,690",
    "sellPrice": "785"
  },
  {
    "name": "Minnie Cupcake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Butter",
      "Milk",
      "Wheat",
      "Sugarcane"
    ],
    "stars": 0,
    "energy": "2,040",
    "sellPrice": "745"
  },
  {
    "name": "Minnie's Gingerbread Cookies",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Apple",
      "Wheat",
      "Ginger"
    ],
    "stars": 2,
    "energy": "379",
    "sellPrice": "67"
  },
  {
    "name": "Mint Boba Tea",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sugarcane",
      "Milk",
      "Mint"
    ],
    "stars": 3,
    "energy": "1,032",
    "sellPrice": "418"
  },
  {
    "name": "Mint Candy",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Mint",
      "Sugarcane"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "89"
  },
  {
    "name": "Mint Chocolate",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Mint",
      "Sugarcane",
      "Butter",
      "Cocoa Bean"
    ],
    "stars": 4,
    "energy": "1,827",
    "sellPrice": "445"
  },
  {
    "name": "Mint Sorbet",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Mint"
    ],
    "stars": 2,
    "energy": "695",
    "sellPrice": "260"
  },
  {
    "name": "Pastéis de Nata",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Corn",
      "Egg",
      "Milk"
    ],
    "stars": 4,
    "energy": "1,645",
    "sellPrice": "774"
  },
  {
    "name": "Pastry Cream and Fruits",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Vanilla",
      "Any Fruit",
      "Any Fruit",
      "Any Fruit"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "440"
  },
  {
    "name": "Pawpsicle",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Milk",
      "Sugarcane",
      "Slush Ice",
      "Sugarcane",
      "Any Fruit"
    ],
    "stars": 3,
    "energy": "574",
    "sellPrice": "248"
  },
  {
    "name": "Peanut Butter Waffles",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Peanut",
      "Wheat",
      "Egg",
      "Milk"
    ],
    "stars": 4,
    "energy": "1,938",
    "sellPrice": "978"
  },
  {
    "name": "Plain Snow Cones",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Any Ice",
      "Butter"
    ],
    "stars": 1,
    "energy": "410",
    "sellPrice": "180"
  },
  {
    "name": "Princess Aurora Raspberry Cupcake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Milk",
      "Wheat",
      "Sugarcane",
      "Raspberry"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "738"
  },
  {
    "name": "Raspberry Boba Tea",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sugarcane",
      "Milk",
      "Raspberry"
    ],
    "stars": 3,
    "energy": "1,248",
    "sellPrice": "377"
  },
  {
    "name": "Red Fruit Sorbet",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Raspberry",
      "Gooseberry",
      "Sugarcane"
    ],
    "stars": 0,
    "energy": "2,226",
    "sellPrice": "359"
  },
  {
    "name": "Red Velvet",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Cheese",
      "Egg",
      "Cocoa Bean",
      "Vanilla"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "783"
  },
  {
    "name": "Roasted Marshmallows",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Pink Marshmallow",
      "Pink Marshmallow",
      "Blue Marshmallow",
      "Blue Marshmallow"
    ],
    "stars": 4,
    "energy": "3,470",
    "sellPrice": "300"
  },
  {
    "name": "Root Beer",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Ginger",
      "Sugarcane",
      "Vanilla"
    ],
    "stars": 3,
    "energy": "690",
    "sellPrice": "166"
  },
  {
    "name": "Shake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Any Dairy or Oil"
    ],
    "stars": 1,
    "energy": "80",
    "sellPrice": "7"
  },
  {
    "name": "S'mores",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Pink Marshmallow",
      "Blue Marshmallow",
      "Wheat",
      "Wheat"
    ],
    "stars": 4,
    "energy": "1,832",
    "sellPrice": "156"
  },
  {
    "name": "Snow White's Gooseberry Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Gooseberry",
      "Wheat",
      "Butter"
    ],
    "stars": 3,
    "energy": "1,677",
    "sellPrice": "338"
  },
  {
    "name": "Sour Snow Cones",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Lemon",
      "Sugarcane"
    ],
    "stars": 3,
    "energy": "1,257",
    "sellPrice": "282"
  },
  {
    "name": "Spaceship Earth Cupcake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Butter",
      "Milk",
      "Wheat",
      "Sugarcane",
      "Coconut"
    ],
    "stars": 0,
    "energy": "2,440",
    "sellPrice": "772"
  },
  {
    "name": "Spring Chocolate",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Spring V-EGG-etable",
      "Sugarcane",
      "Cocoa Bean"
    ],
    "stars": 3,
    "energy": "1,392",
    "sellPrice": "254"
  },
  {
    "name": "Spring Egg Bowl",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Egg-cellent Fruit",
      "Spring V-EGG-etable",
      "Wild Spring Egg",
      "Cocoa Bean",
      "Sugarcane"
    ],
    "stars": 5,
    "energy": "1,942",
    "sellPrice": "370"
  },
  {
    "name": "Spring Mimosa Eggs",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Spring V-EGG-etable",
      "Wild Spring Egg",
      "Egg-cellent Fruit",
      "Basil"
    ],
    "stars": 4,
    "energy": "1,095",
    "sellPrice": "336"
  },
  {
    "name": "Stitch Cupcake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Butter",
      "Milk",
      "Wheat",
      "Sugarcane"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "751"
  },
  {
    "name": "Sweet Slush",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Blueberry",
      "Slush Ice",
      "Any Sweet"
    ],
    "stars": 2,
    "energy": "510",
    "sellPrice": "219"
  },
  {
    "name": "Tropical Pop",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Any Fruit",
      "Sugarcane",
      "Coconut"
    ],
    "stars": 4,
    "energy": "1,553",
    "sellPrice": "329"
  },
  {
    "name": "Vanilla Ice Cream",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Milk",
      "Sugarcane",
      "Vanilla"
    ],
    "stars": 4,
    "energy": "1,475",
    "sellPrice": "673"
  },
  {
    "name": "Waffles",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Milk",
      "Egg",
      "Any Sweet (Sugarcane only)"
    ],
    "stars": 4,
    "energy": "1,455",
    "sellPrice": "706"
  },
  {
    "name": "Wedding Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Butter",
      "Sugarcane",
      "Vanilla"
    ],
    "stars": 5,
    "energy": "1,680",
    "sellPrice": "769"
  },
  {
    "name": "Whimsical Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Egg",
      "Wheat",
      "Dreamlight Fruit",
      "Wheat",
      "Butter"
    ],
    "stars": 3,
    "energy": "1,497",
    "sellPrice": "324"
  },
  {
    "name": "Wonderland Cookies",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Butter",
      "Sugarcane",
      "Vanilla",
      "Wheat"
    ],
    "stars": 4,
    "energy": "970",
    "sellPrice": "391"
  },
  {
    "name": "Yule Log",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Cocoa Bean",
      "Vanilla",
      "Cherry"
    ],
    "stars": 4,
    "energy": "2,147",
    "sellPrice": "198"
  },
  {
    "name": "Arepas Con Queso",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Corn",
      "Cheese",
      "Agave"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "309"
  },
  {
    "name": "Baozi",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Pork",
      "Wheat",
      "Soya",
      "Any Spice"
    ],
    "stars": 4,
    "energy": "718",
    "sellPrice": "503"
  },
  {
    "name": "Barbecued Brilliant Blue Starfish",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Brilliant Blue",
      "Starfish",
      "Mint"
    ],
    "stars": 2,
    "energy": "3,118",
    "sellPrice": "1,202"
  },
  {
    "name": "Barbecued Pretty Pink Starfish",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Pretty Pink Starfish",
      "Paprika",
      "Wheat"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "1,202"
  },
  {
    "name": "Bulgur Salad",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Cucumber",
      "Tomato",
      "Mint"
    ],
    "stars": 5,
    "energy": "780",
    "sellPrice": "396"
  },
  {
    "name": "Clam Juice",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Spice",
      "Clam",
      "Tomato"
    ],
    "stars": 2,
    "energy": "289",
    "sellPrice": "93"
  },
  {
    "name": "Coleslaw",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Cabbage",
      "Carrot"
    ],
    "stars": 2,
    "energy": "387",
    "sellPrice": "389"
  },
  {
    "name": "Conch Ceviche",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Sea Snail",
      "Onion",
      "Tomato",
      "Lemon"
    ],
    "stars": 4,
    "energy": "2,646",
    "sellPrice": "712"
  },
  {
    "name": "Crab Melts",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Crab",
      "Cheese"
    ],
    "stars": 2,
    "energy": "2,549",
    "sellPrice": "1,014"
  },
  {
    "name": "Dumplings",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Meat",
      "Wheat",
      "Any Vegetable",
      "Soya"
    ],
    "stars": 4,
    "energy": "710",
    "sellPrice": "493"
  },
  {
    "name": "Falafel",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Beans",
      "Cumin",
      "Garlic"
    ],
    "stars": 3,
    "energy": "528",
    "sellPrice": "159"
  },
  {
    "name": "Nuts & Bolts",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Robot Fish",
      "Almonds"
    ],
    "stars": 2,
    "energy": "3,195",
    "sellPrice": "866"
  },
  {
    "name": "Roasted Almonds",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Almonds",
      "Agave"
    ],
    "stars": 2,
    "energy": "1,070",
    "sellPrice": "86"
  },
  {
    "name": "Royal Ice Tea",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Slush Ice",
      "Majestea"
    ],
    "stars": 2,
    "energy": "610",
    "sellPrice": "234"
  },
  {
    "name": "Royal Latte",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Milk",
      "Majestea"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "338"
  },
  {
    "name": "Royal Tea",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Majestea"
    ],
    "stars": 1,
    "energy": null,
    "sellPrice": "36"
  },
  {
    "name": "Sand Worm Carpaccio Plate",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Sand Worm",
      "Melon"
    ],
    "stars": 0,
    "energy": "3,004",
    "sellPrice": "1,160"
  },
  {
    "name": "Shad Ceviche",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Shad",
      "Onion",
      "Tomato",
      "Lemon"
    ],
    "stars": 4,
    "energy": "1,696",
    "sellPrice": "427"
  },
  {
    "name": "Spicy Scorpion Skewer",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Scorpion",
      "Paprika"
    ],
    "stars": 2,
    "energy": "1,792",
    "sellPrice": "617"
  },
  {
    "name": "Takoyaki Stick",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Octopus",
      "Seaweed",
      "Egg",
      "Soya"
    ],
    "stars": 4,
    "energy": "2,164",
    "sellPrice": "898"
  },
  {
    "name": "Thousand Needles",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Brilliant Blue",
      "Starfish",
      "Pretty Pink Starfish",
      "Cactoberries"
    ],
    "stars": 3,
    "energy": "5,625",
    "sellPrice": "2,497"
  },
  {
    "name": "Tomato Basil Soup",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Tomato",
      "Basil"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "93"
  },
  {
    "name": "Vegetarian Dumplings",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Wheat",
      "Any Vegetables",
      "Soya"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "109"
  },
  {
    "name": "Ajiaco",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Corn",
      "Potato",
      "Poultry"
    ],
    "stars": 3,
    "energy": "757",
    "sellPrice": "898"
  },
  {
    "name": "Baked Beans",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Beans",
      "Pork"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "388"
  },
  {
    "name": "Best Fish Forever",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Sea Snail",
      "Robot Fish",
      "Celery",
      "Cumin"
    ],
    "stars": 0,
    "energy": "4,420",
    "sellPrice": "1,431"
  },
  {
    "name": "Biryani",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Poultry",
      "Rice",
      "Cinnamon",
      "Cumin",
      "Mint"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "1,049"
  },
  {
    "name": "Blend of the Bayou",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Prisma Shrimp",
      "Rice",
      "Celery",
      "Butter",
      "Any Spice"
    ],
    "stars": 5,
    "energy": "4,108",
    "sellPrice": "2,409"
  },
  {
    "name": "Bony Osso Buco",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Skeleton Fish",
      "Celery",
      "Any Vegetable",
      "Grapes"
    ],
    "stars": 4,
    "energy": "1,192",
    "sellPrice": "272"
  },
  {
    "name": "Braised Abalone",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Oyster",
      "Sea Snail",
      "Mushroom",
      "Garlic"
    ],
    "stars": 0,
    "energy": "2,500",
    "sellPrice": "570"
  },
  {
    "name": "Braised Bamboo Shoots",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Bamboo",
      "Canola",
      "Soya",
      "Ginger"
    ],
    "stars": 4,
    "energy": "898",
    "sellPrice": "461"
  },
  {
    "name": "Burrito",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Meat",
      "Wheat",
      "Beans",
      "Cumin"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "473"
  },
  {
    "name": "Butter Chicken",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Poultry",
      "Tomato",
      "Butter",
      "Lemon",
      "Cumin"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "1,200"
  },
  {
    "name": "Cheeseburger",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Venison",
      "Wheat",
      "Any Vegetable",
      "Cheese"
    ],
    "stars": 4,
    "energy": "1,113",
    "sellPrice": "1,785"
  },
  {
    "name": "Chicken Souvlaki",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Poultry",
      "Lemon",
      "Mint",
      "Paprika"
    ],
    "stars": 4,
    "energy": "1,816",
    "sellPrice": "949"
  },
  {
    "name": "Classic Frankfurter",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Pork",
      "Poultry",
      "Venison",
      "Wheat"
    ],
    "stars": 4,
    "energy": "1,511",
    "sellPrice": "2,628"
  },
  {
    "name": "Classic Mac & Cheese",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Cheese"
    ],
    "stars": 2,
    "energy": "541",
    "sellPrice": "236"
  },
  {
    "name": "Club Sandwich",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Pork",
      "Poultry",
      "Wheat",
      "Tomato"
    ],
    "stars": 4,
    "energy": "1,075",
    "sellPrice": "1,161"
  },
  {
    "name": "Coq en Barbouille",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Poultry",
      "Onion",
      "Any Vegetable",
      "Grapes"
    ],
    "stars": 4,
    "energy": "880",
    "sellPrice": "1,030"
  },
  {
    "name": "Cream Cheese Bagel",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Cheese",
      "Any Sweet"
    ],
    "stars": 3,
    "energy": "652",
    "sellPrice": "280"
  },
  {
    "name": "Crimson Burger",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Any Vegetable",
      "Ruby Lentils"
    ],
    "stars": 3,
    "energy": "187",
    "sellPrice": "231"
  },
  {
    "name": "Dragon Roll Maki",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Electric Eel",
      "Rice",
      "Seaweed",
      "Any Vegetable"
    ],
    "stars": 4,
    "energy": "3,193",
    "sellPrice": "1,670"
  },
  {
    "name": "Fabulous Fajitas",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Poultry",
      "Wheat",
      "Any Vegetable",
      "Any Vegetable",
      "Cumin"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "851"
  },
  {
    "name": "Good Ol' Fashioned Burger",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Venison",
      "Wheat",
      "Lettuce"
    ],
    "stars": 3,
    "energy": "634",
    "sellPrice": "1,413"
  },
  {
    "name": "Hamburger Steak",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Venison",
      "Potato",
      "Any Vegetable",
      "Beans"
    ],
    "stars": 4,
    "energy": "855",
    "sellPrice": "1,774"
  },
  {
    "name": "Hawaiian Pizza",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Pork",
      "Wheat",
      "Tomato",
      "Cheese",
      "Pineapple"
    ],
    "stars": 5,
    "energy": "1,506",
    "sellPrice": "1,577"
  },
  {
    "name": "Jerk Chicken",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Poultry",
      "Onion",
      "Garlic",
      "Any Spice"
    ],
    "stars": 4,
    "energy": "1,105",
    "sellPrice": "1,102"
  },
  {
    "name": "Lo-Fries",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Flute Root",
      "Yam",
      "Canola"
    ],
    "stars": 3,
    "energy": "387",
    "sellPrice": "358"
  },
  {
    "name": "Meat Pie",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Meat",
      "Wheat",
      "Butter"
    ],
    "stars": 3,
    "energy": "1,047",
    "sellPrice": "618"
  },
  {
    "name": "Meaty Taco",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Venison",
      "Chili Pepper",
      "Corn",
      "Any Vegetable",
      "Cumin"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "1,785"
  },
  {
    "name": "Milky Way Stew",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Rainbow Trout",
      "Milk",
      "Turnip",
      "Cosmic Figs"
    ],
    "stars": 4,
    "energy": "1,872",
    "sellPrice": "733"
  },
  {
    "name": "Moqueca de Pirarucu",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Pirarucu",
      "Any Vegetable",
      "Any Vegetable",
      "Coconut"
    ],
    "stars": 4,
    "energy": "3,453",
    "sellPrice": "1,024"
  },
  {
    "name": "Pasta with Herbs",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Butter",
      "Any Spice"
    ],
    "stars": 3,
    "energy": "642",
    "sellPrice": "289"
  },
  {
    "name": "Piquant Piranha Soup",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Chili Pepper",
      "Bamboo",
      "Piranha"
    ],
    "stars": 3,
    "energy": "4,001",
    "sellPrice": "2,041"
  },
  {
    "name": "Pulled Pork",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Pork",
      "Onion",
      "Tomato",
      "Oregano"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "738"
  },
  {
    "name": "Pupusas Revueltas",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Poultry",
      "Corn",
      "Beans"
    ],
    "stars": 3,
    "energy": "627",
    "sellPrice": "790"
  },
  {
    "name": "Rainbouillabaisse",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Prisma Shrimp",
      "Any Seafood",
      "Rainbow Trout",
      "Tomato",
      "Any Vegetable"
    ],
    "stars": 5,
    "energy": "4,174",
    "sellPrice": "2,087"
  },
  {
    "name": "Ramen",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Pork",
      "Wheat",
      "Egg"
    ],
    "stars": 3,
    "energy": "1,128",
    "sellPrice": "660"
  },
  {
    "name": "Rhapsody Roll",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Rice",
      "Flute Root",
      "Seaweed",
      "Any Vegetable"
    ],
    "stars": 4,
    "energy": "335",
    "sellPrice": "301"
  },
  {
    "name": "Roast",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Meat",
      "Pork"
    ],
    "stars": 1,
    "energy": "450",
    "sellPrice": "300"
  },
  {
    "name": "Royal Burger",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Venison",
      "Wheat",
      "Any Vegetable",
      "Cheese"
    ],
    "stars": 5,
    "energy": "1,670",
    "sellPrice": "2,303"
  },
  {
    "name": "Ruby Masoor Dal",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Chili Pepper",
      "Tomato",
      "Ruby Lentils"
    ],
    "stars": 3,
    "energy": "405",
    "sellPrice": "357"
  },
  {
    "name": "Sand Stew",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Dunebopper",
      "Sand Fish",
      "Any Vegetable",
      "Sand Worm",
      "Any Spice"
    ],
    "stars": 5,
    "energy": "5,625",
    "sellPrice": "2,244"
  },
  {
    "name": "Sausage and Sauerkraut Platter",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Pork",
      "Cabbage",
      "Potato"
    ],
    "stars": 3,
    "energy": "958",
    "sellPrice": "884"
  },
  {
    "name": "Schnitzel",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Poultry",
      "Wheat",
      "Canola"
    ],
    "stars": 3,
    "energy": "640",
    "sellPrice": "854"
  },
  {
    "name": "Sesame Seed Bagel",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Any Sweet",
      "Venison"
    ],
    "stars": 2,
    "energy": "160",
    "sellPrice": "26"
  },
  {
    "name": "Shawarma",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Rice",
      "Lemon",
      "Cinnamon",
      "Garlic"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "1,877"
  },
  {
    "name": "Shish Taouk",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Poultry",
      "Rice",
      "Lemon",
      "Garlic",
      "Oregano"
    ],
    "stars": 5,
    "energy": "1,928",
    "sellPrice": "1,109"
  },
  {
    "name": "Sweet and Sour Stir-Fry",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Poultry",
      "Broccoli",
      "Canola",
      "Dreamango",
      "Pineapple"
    ],
    "stars": 5,
    "energy": "2,350",
    "sellPrice": "2,148"
  },
  {
    "name": "Tandoori Chicken",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Chili Pepper",
      "Poultry",
      "Cumin",
      "Paprika"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "964"
  },
  {
    "name": "Tofu",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Soya"
    ],
    "stars": 1,
    "energy": "142",
    "sellPrice": "82"
  },
  {
    "name": "Tourtière",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Venison",
      "Wheat",
      "Potato",
      "Any Vegetable"
    ],
    "stars": 4,
    "energy": "814",
    "sellPrice": "1,704"
  },
  {
    "name": "Turkey Leg",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Poultry",
      "Cumin",
      "Paprika",
      "Agave"
    ],
    "stars": 4,
    "energy": "1,123",
    "sellPrice": "884"
  },
  {
    "name": "Turnip Tartiflette",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Pork",
      "Turnip",
      "Cheese"
    ],
    "stars": 3,
    "energy": "1,459",
    "sellPrice": "863"
  },
  {
    "name": "Vegetarian Turnip Tartiflette",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Mushroom",
      "Turnip",
      "Soya"
    ],
    "stars": 3,
    "energy": "816",
    "sellPrice": "399"
  },
  {
    "name": "Yakisoba",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Pork",
      "Wheat",
      "Cabbage"
    ],
    "stars": 3,
    "energy": "789",
    "sellPrice": "710"
  },
  {
    "name": "Apple Sauce",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Apple",
      "Cinnamon"
    ],
    "stars": 2,
    "energy": "823",
    "sellPrice": "71"
  },
  {
    "name": "Basil Berry Salad",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Blueberry",
      "Basil",
      "Strawberry"
    ],
    "stars": 3,
    "energy": "1,355",
    "sellPrice": "142"
  },
  {
    "name": "Caramel Macarons",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Almonds",
      "Egg",
      "Agave"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "401"
  },
  {
    "name": "Charlotte Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Strawberry",
      "Agave"
    ],
    "stars": 3,
    "energy": "759",
    "sellPrice": "69"
  },
  {
    "name": "Chocolate Macarons",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Almonds",
      "Egg",
      "Cocoa Bean"
    ],
    "stars": 3,
    "energy": "2,354",
    "sellPrice": "419"
  },
  {
    "name": "Cinnamon Donut",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Egg",
      "Cinnamon",
      "Any Sweet"
    ],
    "stars": 4,
    "energy": "1,094",
    "sellPrice": "406"
  },
  {
    "name": "Cotton Candy",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Agave",
      "Sugarcane"
    ],
    "stars": 2,
    "energy": "298",
    "sellPrice": "56"
  },
  {
    "name": "Croissant",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Butter"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "249"
  },
  {
    "name": "Cupcakes",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Egg",
      "Cherry",
      "Agave"
    ],
    "stars": 4,
    "energy": "1,853",
    "sellPrice": "433"
  },
  {
    "name": "Danish",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Butter",
      "Any Fruit",
      "Any Fruit"
    ],
    "stars": 4,
    "energy": "705",
    "sellPrice": "314"
  },
  {
    "name": "Dreamango Boba Tea",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Milk",
      "Dreamango",
      "Sugarcane"
    ],
    "stars": 3,
    "energy": "1,833",
    "sellPrice": "418"
  },
  {
    "name": "French Macarons",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Almonds",
      "Egg"
    ],
    "stars": 2,
    "energy": "1,461",
    "sellPrice": "340"
  },
  {
    "name": "Fruit Milkshake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Milk",
      "Any Fruit"
    ],
    "stars": 3,
    "energy": "1,113",
    "sellPrice": "544"
  },
  {
    "name": "Glazed Donut",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Egg",
      "Any Sweet"
    ],
    "stars": 3,
    "energy": "760",
    "sellPrice": "336"
  },
  {
    "name": "Gourmet Grubs",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sea Snail",
      "Sand Worm",
      "Scorpion"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "2,065"
  },
  {
    "name": "Jam Macarons",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Almonds",
      "Egg",
      "Any Fruit"
    ],
    "stars": 3,
    "energy": "1,581",
    "sellPrice": "378"
  },
  {
    "name": "Kanelbulle",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Butter",
      "Egg",
      "Cinnamon"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "663"
  },
  {
    "name": "Kouign-Amann",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Butter",
      "Butter",
      "Agave"
    ],
    "stars": 4,
    "energy": "1,358",
    "sellPrice": "610"
  },
  {
    "name": "Maamouls",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Almonds",
      "Dates"
    ],
    "stars": 3,
    "energy": "1,614",
    "sellPrice": "100"
  },
  {
    "name": "Makrout",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Canola",
      "Dates",
      "Cinnamon"
    ],
    "stars": 4,
    "energy": "1,157",
    "sellPrice": "254"
  },
  {
    "name": "Melon Boba Tea",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Milk",
      "Melon",
      "Sugarcane"
    ],
    "stars": 3,
    "energy": "911",
    "sellPrice": "478"
  },
  {
    "name": "Mooncake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Canola",
      "Beans",
      "Agave"
    ],
    "stars": 4,
    "energy": "465",
    "sellPrice": "276"
  },
  {
    "name": "Nestling Crepe",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Egg",
      "Milk",
      "Nestling Pear"
    ],
    "stars": 4,
    "energy": "1,938",
    "sellPrice": "715"
  },
  {
    "name": "Pear Upside-Down Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Egg",
      "Nestling Pear"
    ],
    "stars": 3,
    "energy": "1,218",
    "sellPrice": "345"
  },
  {
    "name": "Pineapple Soft Serve",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Pineapple"
    ],
    "stars": 2,
    "energy": "717",
    "sellPrice": "886"
  },
  {
    "name": "Popcorn",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Corn",
      "Canola"
    ],
    "stars": 2,
    "energy": "201",
    "sellPrice": "161"
  },
  {
    "name": "Raspberry Jam Sandwich",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Raspberry"
    ],
    "stars": 2,
    "energy": "549",
    "sellPrice": "29"
  },
  {
    "name": "Spicy Macarons",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Chili Pepper",
      "Almonds",
      "Egg"
    ],
    "stars": 3,
    "energy": "1,796",
    "sellPrice": "475"
  },
  {
    "name": "Spiky Berry Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Butter",
      "Cactoberries",
      "Strawberry",
      "Any Spice"
    ],
    "stars": 5,
    "energy": "2,058",
    "sellPrice": "421"
  },
  {
    "name": "Stellar Milkshake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Slush Ice",
      "Milk",
      "Cosmic Figs"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "562"
  },
  {
    "name": "Strawberry Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Butter",
      "Strawberry"
    ],
    "stars": 3,
    "energy": "1,092",
    "sellPrice": "300"
  },
  {
    "name": "Strawberry Shortcake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Egg",
      "Strawberry"
    ],
    "stars": 3,
    "energy": "1,173",
    "sellPrice": "342"
  },
  {
    "name": "Stuffed Dates",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Almonds",
      "Dates"
    ],
    "stars": 2,
    "energy": "1,495",
    "sellPrice": "91"
  },
  {
    "name": "Sugar-Free Banana Muffin Sugar-Free Blueberry Muffin",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Banana",
      "Wheat",
      "Blueberry"
    ],
    "stars": 2,
    "energy": "677",
    "sellPrice": "39"
  },
  {
    "name": "Sugar-Free Fruit Explosion Muffin",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Any Fruit",
      "Any Fruit",
      "Agave"
    ],
    "stars": 4,
    "energy": "354",
    "sellPrice": "66"
  },
  {
    "name": "Sugar-Free Fruit Muffin",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Any Fruit"
    ],
    "stars": 2,
    "energy": "117",
    "sellPrice": "13"
  },
  {
    "name": "Sweet Popcorn",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Corn",
      "Canola",
      "Agave"
    ],
    "stars": 3,
    "energy": "390",
    "sellPrice": "209"
  },
  {
    "name": "Sweet Tofu",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Soya",
      "Any Fruit"
    ],
    "stars": 2,
    "energy": "183",
    "sellPrice": "100"
  },
  {
    "name": "Taiyaki",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sand Fish",
      "Beans"
    ],
    "stars": 2,
    "energy": "374",
    "sellPrice": "102"
  },
  {
    "name": "Vanilla Macarons",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Almonds",
      "Egg",
      "Vanilla"
    ],
    "stars": 3,
    "energy": "1,787",
    "sellPrice": "436"
  },
  {
    "name": "Ambrosia Smoothie",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Plain Yogurt",
      "Ambrosia"
    ],
    "stars": 2,
    "energy": "1,155",
    "sellPrice": "247"
  },
  {
    "name": "Baked Feta & Olives",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Flyleaf Feta",
      "Olives"
    ],
    "stars": 2,
    "energy": "815",
    "sellPrice": "142"
  },
  {
    "name": "Cape Gooseberry Smoothie",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Plain Yogurt",
      "Cape Gooseberry"
    ],
    "stars": 2,
    "energy": "781",
    "sellPrice": "227"
  },
  {
    "name": "Faerie Rye Crackers",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Faerie Rye"
    ],
    "stars": 1,
    "energy": null,
    "sellPrice": "74"
  },
  {
    "name": "Golden Apple Smoothie",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Plain Yogurt",
      "Golden Apple",
      "Potato"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "299"
  },
  {
    "name": "Greek Potatoes",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Fruit",
      "Garlic",
      "Salt Crystal"
    ],
    "stars": 5,
    "energy": "688",
    "sellPrice": "351"
  },
  {
    "name": "Honeydew Smoothie",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Spice",
      "Plain Yogurt",
      "Honeydew Melon",
      "Stygian Mudskipper"
    ],
    "stars": 2,
    "energy": "769",
    "sellPrice": "318"
  },
  {
    "name": "Lightning Bolt",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Lamprey",
      "Lightning Spice",
      "Lightning Spice",
      "Any Sweet"
    ],
    "stars": 5,
    "energy": "5,625",
    "sellPrice": "5,038"
  },
  {
    "name": "Olympian Tapenade",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Elysian Grain",
      "Olives",
      "Honeydew Melon",
      "Any Spice"
    ],
    "stars": 4,
    "energy": "1,090",
    "sellPrice": "456"
  },
  {
    "name": "Persimmon Smoothie",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Plain Yogurt",
      "Persimmon"
    ],
    "stars": 2,
    "energy": "1,070",
    "sellPrice": "188"
  },
  {
    "name": "Radicchio Slaw",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Cauliflower",
      "Green Beans",
      "Radicchio",
      "Radish"
    ],
    "stars": 4,
    "energy": "835",
    "sellPrice": "739"
  },
  {
    "name": "Sautéed Porcini",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Porcini Mushrooms",
      "Garlic"
    ],
    "stars": 2,
    "energy": "500",
    "sellPrice": "136"
  },
  {
    "name": "Simple Chia Pudding",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Chia Seeds"
    ],
    "stars": 1,
    "energy": "80",
    "sellPrice": "7"
  },
  {
    "name": "Sparkling Ambrosia",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Lightning Spice",
      "Ambrosia"
    ],
    "stars": 2,
    "energy": "883",
    "sellPrice": "175"
  },
  {
    "name": "Spiral Strawberry Smoothie",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Plain Yogurt",
      "Spiral Strawberries"
    ],
    "stars": 2,
    "energy": "1,410",
    "sellPrice": "221"
  },
  {
    "name": "Tzatziki",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Cucumber",
      "Plain Yogurt",
      "Garlic"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "460"
  },
  {
    "name": "A Very Unusual Tea Time",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Plain Yogurt",
      "Spiral Strawberries",
      "Salt Crystal",
      "Sour Berries"
    ],
    "stars": 4,
    "energy": "2,377",
    "sellPrice": "345"
  },
  {
    "name": "Aquatic Escargot",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Trumpet Snail",
      "Garlic",
      "Salt Crystal"
    ],
    "stars": 3,
    "energy": "581",
    "sellPrice": "182"
  },
  {
    "name": "Arcane Garlic Crab",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Sorcerer Hat Hermit",
      "Crab",
      "Garlic",
      "Salt Crystal",
      "Any Spice"
    ],
    "stars": 4,
    "energy": "3,250",
    "sellPrice": "1,327"
  },
  {
    "name": "Argossian Pizza",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Elysian Grain",
      "Onion",
      "Any Vegetable",
      "Flyleaf Feta",
      "Olives"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "668"
  },
  {
    "name": "Barley Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Barley",
      "Cauliflower",
      "Radish",
      "Any Spice"
    ],
    "stars": 4,
    "energy": "453",
    "sellPrice": "280"
  },
  {
    "name": "Cacio e Pepe",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Elysian Grain",
      "Flyleaf Feta",
      "Black Pepper"
    ],
    "stars": 3,
    "energy": "379",
    "sellPrice": "403"
  },
  {
    "name": "Cape Gooseberry Chia Pancakes",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Chia Seeds",
      "Shovel Bird Eggs",
      "Cape Gooseberry"
    ],
    "stars": 4,
    "energy": "749",
    "sellPrice": "214"
  },
  {
    "name": "Caprese Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Vegetable",
      "Flyleaf Feta",
      "Olives",
      "Salt Crystal"
    ],
    "stars": 5,
    "energy": "1,092",
    "sellPrice": "244"
  },
  {
    "name": "Cauliflower Steak",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Spice",
      "Cauliflower"
    ],
    "stars": 1,
    "energy": "165",
    "sellPrice": "30"
  },
  {
    "name": "Chia Pudding",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Chia Seeds",
      "Rhubarb",
      "Cinnamon",
      "Any Sweet"
    ],
    "stars": 4,
    "energy": "742",
    "sellPrice": "425"
  },
  {
    "name": "Chia Seed Bread",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Chia Seeds",
      "Shovel Bird Eggs"
    ],
    "stars": 3,
    "energy": "478",
    "sellPrice": "122"
  },
  {
    "name": "Chimera Skewer",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Hippocampus",
      "Trumpet Snail",
      "Flying Fish",
      "Any Fish",
      "Brussels Sprout"
    ],
    "stars": 5,
    "energy": "2,720",
    "sellPrice": "1,560"
  },
  {
    "name": "Electric Radicchio & Persimmon Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Radicchio",
      "Persimmon",
      "Lightning Spice"
    ],
    "stars": 3,
    "energy": "1,176",
    "sellPrice": "303"
  },
  {
    "name": "Flying Fish Quenelles",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Flying Fish",
      "Porcini Mushrooms",
      "Any Vegetable",
      "Flyleaf Feta",
      "Any Dairy or Oil"
    ],
    "stars": 5,
    "energy": "890",
    "sellPrice": "325"
  },
  {
    "name": "Garlic Steam Mussels",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Mussel",
      "Onion",
      "Garlic"
    ],
    "stars": 3,
    "energy": "825",
    "sellPrice": "413"
  },
  {
    "name": "Grecian Baked Fish",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Stygian Mudskipper",
      "Elysian Grain",
      "Olives",
      "Salt Crystal",
      "Ambrosia"
    ],
    "stars": 0,
    "energy": "5,200",
    "sellPrice": "2,808"
  },
  {
    "name": "Greek Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Cucumber",
      "Radish",
      "Any Vegetable",
      "Flyleaf Feta",
      "Olives"
    ],
    "stars": 5,
    "energy": "1,476",
    "sellPrice": "654"
  },
  {
    "name": "Green Bean Casserole",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Green Beans",
      "Onion",
      "Porcini Mushrooms"
    ],
    "stars": 3,
    "energy": "652",
    "sellPrice": "607"
  },
  {
    "name": "Grilled Koi Gyro",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Koi",
      "Wheat",
      "Cucumber",
      "Olives",
      "Any Spice"
    ],
    "stars": 5,
    "energy": "1,428",
    "sellPrice": "417"
  },
  {
    "name": "Hermit Crab Pasta",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Sorcerer Hat Hermit",
      "Crab",
      "Wheat",
      "Any Spice"
    ],
    "stars": 3,
    "energy": "2,829",
    "sellPrice": "1,143"
  },
  {
    "name": "Hippocampus Cepelinai Dumplings",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Hippocampus",
      "Onion",
      "Potato"
    ],
    "stars": 5,
    "energy": "2,634",
    "sellPrice": "1,965"
  },
  {
    "name": "Koi Sashimi",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Spiral Strawberries",
      "Black Pepper",
      "Koi"
    ],
    "stars": 1,
    "energy": "290",
    "sellPrice": "60"
  },
  {
    "name": "Lamprey Sashimi",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Lamprey"
    ],
    "stars": 1,
    "energy": "2,930",
    "sellPrice": "1,800"
  },
  {
    "name": "Loaded Breakfast Yogurt",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Oats",
      "Plain Yogurt",
      "Spiral Strawberries",
      "Ambrosia"
    ],
    "stars": 4,
    "energy": "2,425",
    "sellPrice": "508"
  },
  {
    "name": "Loaded Golden Apple Porridge",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Oats",
      "Oats",
      "Golden Apple",
      "Ambrosia"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "566"
  },
  {
    "name": "Loaded Honeydew Porridge",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Oats",
      "Oats",
      "Honeydew Melon",
      "Ambrosia"
    ],
    "stars": 4,
    "energy": "1,328",
    "sellPrice": "588"
  },
  {
    "name": "Loaded Persimmon Porridge",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Oats",
      "Oats",
      "Persimmon",
      "Ambrosia"
    ],
    "stars": 4,
    "energy": "1,665",
    "sellPrice": "438"
  },
  {
    "name": "Loaded Rhubarb Porridge",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Oats",
      "Oats",
      "Rhubarb",
      "Ambrosia"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "744"
  },
  {
    "name": "Loaded Sea Grape Porridge",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Oats",
      "Oats",
      "Sea Grapes",
      "Ambrosia"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "431"
  },
  {
    "name": "Lupine Cullen Skink",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Sea Wolf",
      "Onion",
      "Potato",
      "Plain Yogurt"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "736"
  },
  {
    "name": "Mussel Risotto",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Mussel",
      "Rice",
      "Olives",
      "Garlic"
    ],
    "stars": 5,
    "energy": "1,488",
    "sellPrice": "377"
  },
  {
    "name": "Oatmeal",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Spice",
      "Oats"
    ],
    "stars": 1,
    "energy": "210",
    "sellPrice": "118"
  },
  {
    "name": "Olive Plate",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Olives"
    ],
    "stars": 1,
    "energy": "610",
    "sellPrice": "42"
  },
  {
    "name": "Persimmon Chia Pancakes",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Chia Seeds",
      "Shovel Bird Eggs",
      "Persimmon"
    ],
    "stars": 4,
    "energy": "1,072",
    "sellPrice": "169"
  },
  {
    "name": "Radicchio-Stuffed Porcini",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Porcini Mushrooms",
      "Radicchio",
      "Black Pepper"
    ],
    "stars": 3,
    "energy": "677",
    "sellPrice": "370"
  },
  {
    "name": "Roasted Barley & Veggies",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Barley",
      "Brussels Sprout",
      "Onion",
      "Any Vegetable"
    ],
    "stars": 5,
    "energy": "1,422",
    "sellPrice": "476"
  },
  {
    "name": "Roasted Brussels Sprouts",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Flyleaf Feta",
      "Brussels Sprout",
      "Garlic"
    ],
    "stars": 2,
    "energy": "959",
    "sellPrice": "104"
  },
  {
    "name": "Roasted Green Beans",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Green Beans",
      "Garlic"
    ],
    "stars": 2,
    "energy": "379",
    "sellPrice": "336"
  },
  {
    "name": "Salt-Baked Sea Wolf",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Sea Wolf",
      "Salt Crystal"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "123"
  },
  {
    "name": "Salt-Pickled Cauliflower",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Cauliflower",
      "Salt Crystal",
      "Any Spice"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "84"
  },
  {
    "name": "Salt-Pickled Garlic",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Garlic",
      "Salt Crystal",
      "Any Spice"
    ],
    "stars": 3,
    "energy": "383",
    "sellPrice": "119"
  },
  {
    "name": "Salt-Pickled Green Beans",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Green Beans",
      "Salt Crystal",
      "Any Spice"
    ],
    "stars": 3,
    "energy": "246",
    "sellPrice": "341"
  },
  {
    "name": "Salt-Pickled Radicchio",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Radicchio",
      "Salt Crystal",
      "Any Spice"
    ],
    "stars": 3,
    "energy": "474",
    "sellPrice": "226"
  },
  {
    "name": "Salt-Pickled Radish",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Radish",
      "Salt Crystal",
      "Any Spice"
    ],
    "stars": 3,
    "energy": "314",
    "sellPrice": "235"
  },
  {
    "name": "Salt-Pickled Sea Grapes",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Sea Grapes",
      "Salt Crystal",
      "Any Spice"
    ],
    "stars": 3,
    "energy": "185",
    "sellPrice": "77"
  },
  {
    "name": "Scottish Porridge",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Oats",
      "Any Fruit"
    ],
    "stars": 2,
    "energy": "255",
    "sellPrice": "139"
  },
  {
    "name": "Sea Grape Chia Pancakes",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Chia Seeds",
      "Shovel Bird Eggs",
      "Sea Grapes"
    ],
    "stars": 4,
    "energy": "549",
    "sellPrice": "162"
  },
  {
    "name": "Seaweed Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Radish",
      "Any Vegetable",
      "Sea Grapes",
      "Black Pepper"
    ],
    "stars": 4,
    "energy": "382",
    "sellPrice": "365"
  },
  {
    "name": "Shovel Bird Eggs Benedict",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Elysian Grain",
      "Shovel Bird Eggs",
      "Spiral Strawberries",
      "Salt Crystal"
    ],
    "stars": 4,
    "energy": "1,522",
    "sellPrice": "420"
  },
  {
    "name": "Soda Bread & Feta",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Flyleaf Feta",
      "Salt Crystal"
    ],
    "stars": 3,
    "energy": "309",
    "sellPrice": "135"
  },
  {
    "name": "Spanakopita",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Onion",
      "Spinach",
      "Flyleaf Feta",
      "Garlic",
      "Any Spice"
    ],
    "stars": 5,
    "energy": "982",
    "sellPrice": "561"
  },
  {
    "name": "Spiral Strawberry Chia Pancakes",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Chia Seeds",
      "Shovel Bird Eggs",
      "Spiral Strawberries"
    ],
    "stars": 4,
    "energy": "1,452",
    "sellPrice": "207"
  },
  {
    "name": "Sprout-Stuffed Porcini",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Brussels Sprout",
      "Porcini Mushrooms",
      "Black Pepper"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "235"
  },
  {
    "name": "Squash-Stuffed Porcini",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Porcini Mushrooms",
      "Ring Squash",
      "Black Pepper"
    ],
    "stars": 3,
    "energy": "400",
    "sellPrice": "250"
  },
  {
    "name": "Squid Sashimi",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Squid"
    ],
    "stars": 1,
    "energy": "1,650",
    "sellPrice": "600"
  },
  {
    "name": "Steamed Mussels",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Mussel"
    ],
    "stars": 1,
    "energy": "290",
    "sellPrice": "90"
  },
  {
    "name": "Stuffed Ring Squash",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Ring Squash",
      "Garlic",
      "Ambrosia"
    ],
    "stars": 3,
    "energy": "980",
    "sellPrice": "225"
  },
  {
    "name": "Tuna Sashimi",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tuna"
    ],
    "stars": 1,
    "energy": "610",
    "sellPrice": "114"
  },
  {
    "name": "Aphrodite's Delight",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Golden Apple",
      "Ambrosia"
    ],
    "stars": 2,
    "energy": "1,070",
    "sellPrice": "234"
  },
  {
    "name": "Cape Gooseberry Sour Fondue",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Cape Gooseberry",
      "Sour Berries"
    ],
    "stars": 2,
    "energy": "951",
    "sellPrice": "123"
  },
  {
    "name": "Cinnamon Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Shovel Bird Eggs",
      "Plain Yogurt",
      "Cinnamon"
    ],
    "stars": 4,
    "energy": "1,330",
    "sellPrice": "348"
  },
  {
    "name": "Cinnamon Cookies",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Plain Yogurt",
      "Cinnamon",
      "Any Sweet"
    ],
    "stars": 4,
    "energy": "1,037",
    "sellPrice": "256"
  },
  {
    "name": "Golden Apple Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Shovel Bird Eggs",
      "Golden Apple"
    ],
    "stars": 3,
    "energy": "894",
    "sellPrice": "268"
  },
  {
    "name": "Honeydew Sour Fondue",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Honeydew Melon",
      "Sour Berries"
    ],
    "stars": 2,
    "energy": "939",
    "sellPrice": "214"
  },
  {
    "name": "Lightning Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Shovel Bird Eggs",
      "Plain Yogurt",
      "Lightning Spice"
    ],
    "stars": 4,
    "energy": "1,302",
    "sellPrice": "400"
  },
  {
    "name": "Lightning Cookies",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Plain Yogurt",
      "Any Sweet",
      "Lightning Spice"
    ],
    "stars": 4,
    "energy": "1,009",
    "sellPrice": "308"
  },
  {
    "name": "Merryweather's Gingersnaps",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Faerie Rye",
      "Shovel Bird Eggs",
      "Ginger",
      "Nutmeg",
      "Sour Berries"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "443"
  },
  {
    "name": "Nutmeg Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Shovel Bird Eggs",
      "Plain Yogurt",
      "Nutmeg"
    ],
    "stars": 4,
    "energy": "1,891",
    "sellPrice": "370"
  },
  {
    "name": "Nutmeg Cookies",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Plain Yogurt",
      "Nutmeg",
      "Any Sweet"
    ],
    "stars": 4,
    "energy": "1,598",
    "sellPrice": "278"
  },
  {
    "name": "Persimmon Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Shovel Bird Eggs",
      "Persimmon"
    ],
    "stars": 3,
    "energy": "984",
    "sellPrice": "149"
  },
  {
    "name": "Persimmon Sour Fondue",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Persimmon",
      "Sour Berries"
    ],
    "stars": 2,
    "energy": "1,240",
    "sellPrice": "84"
  },
  {
    "name": "Rice Pudding",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Oats",
      "Rice",
      "Vanilla"
    ],
    "stars": 3,
    "energy": "579",
    "sellPrice": "293"
  },
  {
    "name": "Sour Berry Dessert",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Ambrosia",
      "Sour Berries"
    ],
    "stars": 2,
    "energy": "1,325",
    "sellPrice": "143"
  },
  {
    "name": "Sour Berry Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Shovel Bird Eggs",
      "Sour Berries"
    ],
    "stars": 3,
    "energy": "1,164",
    "sellPrice": "170"
  },
  {
    "name": "Spicy Yogurt",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Plain Yogurt",
      "Any Spice"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "175"
  },
  {
    "name": "Spiral Strawberry Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Shovel Bird Eggs",
      "Spiral Strawberries"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "184"
  },
  {
    "name": "Spiral Strawberry Sour Fondue",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Spiral Strawberries",
      "Sour Berries"
    ],
    "stars": 2,
    "energy": "1,580",
    "sellPrice": "117"
  },
  {
    "name": "Strawberry Rhubarb Pie",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Plain Yogurt",
      "Rhubarb",
      "Spiral Strawberries"
    ],
    "stars": 4,
    "energy": "1,881",
    "sellPrice": "601"
  },
  {
    "name": "Underworld Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Faerie Rye",
      "Shovel Bird Eggs",
      "Plain Yogurt",
      "Nutmeg"
    ],
    "stars": 5,
    "energy": "2,746",
    "sellPrice": "603"
  },
  {
    "name": "Vanilla Yogurt",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Ambrosia",
      "Plain Yogurt",
      "Vanilla"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "221"
  },
  {
    "name": "Alpine Fishcakes",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Red Alpine Bass",
      "Dill"
    ],
    "stars": 2,
    "energy": "2,370",
    "sellPrice": "1,027"
  },
  {
    "name": "Buttermilk Borscht",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Beetroot",
      "Egg",
      "Milk",
      "Dill"
    ],
    "stars": 4,
    "energy": "1,656",
    "sellPrice": "766"
  },
  {
    "name": "Fizzy Nectar Soda",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Bonsai Star Fruit",
      "Slush Ice"
    ],
    "stars": 2,
    "energy": "1,197",
    "sellPrice": "247"
  },
  {
    "name": "Rosehip Honey Tea",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Honey Coral"
    ],
    "stars": 1,
    "energy": null,
    "sellPrice": "210"
  },
  {
    "name": "Scarlet Bouquet Salad",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Scarlet Kale"
    ],
    "stars": 1,
    "energy": "160",
    "sellPrice": "34"
  },
  {
    "name": "Smoked Fish Charcuterie Spread",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Mountain Whitefish",
      "Tuna",
      "Any Fish",
      "Wheat"
    ],
    "stars": 4,
    "energy": "1,321",
    "sellPrice": "191"
  },
  {
    "name": "101 Teeny Tiny Dalmatian Cupcakes",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Dark Chocolate",
      "Coffee Beans",
      "Egg",
      "Wheat",
      "Sugarcane"
    ],
    "stars": 4,
    "energy": "862",
    "sellPrice": "460"
  },
  {
    "name": "Afternoon Tea Set",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Dark Chocolate",
      "Coffee Beans",
      "Pearly Barley",
      "Any Vegetable",
      "Pincushion Peach"
    ],
    "stars": 4,
    "energy": "985",
    "sellPrice": "235"
  },
  {
    "name": "Baked Whitefish and Roasted Beets",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Mountain Whitefish",
      "Beetroot"
    ],
    "stars": 2,
    "energy": "400",
    "sellPrice": "66"
  },
  {
    "name": "Beet-iful Spaetzle",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Wheat",
      "Beetroot",
      "Egg"
    ],
    "stars": 3,
    "energy": "778",
    "sellPrice": "339"
  },
  {
    "name": "Bread Bowl Pumpkin Soup",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tigger Fish",
      "Fairy Kamut",
      "Pumpkin",
      "Milk"
    ],
    "stars": 4,
    "energy": "4,153",
    "sellPrice": "3,901"
  },
  {
    "name": "Button Stew",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Button Mushroom",
      "Carrot"
    ],
    "stars": 2,
    "energy": "375",
    "sellPrice": "135"
  },
  {
    "name": "Eton Mess",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Red Currants",
      "Pincushion Peach",
      "Egg"
    ],
    "stars": 3,
    "energy": "1,994",
    "sellPrice": "407"
  },
  {
    "name": "Felted Breakfast Spread",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Button Mushroom",
      "Egg",
      "Satin-Finned Betta",
      "Measuring-Tape"
    ],
    "stars": 3,
    "energy": null,
    "sellPrice": "1,022"
  },
  {
    "name": "Fishy Pineapple Jelly",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Snail",
      "Jellied Fish",
      "Crab",
      "Scarlet Kale",
      "Any Fish"
    ],
    "stars": 5,
    "energy": "5,625",
    "sellPrice": "2,767"
  },
  {
    "name": "Friendly Bento",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tigger Fish",
      "Scarlet Kale",
      "Honey Coral",
      "Any Vegetable"
    ],
    "stars": 4,
    "energy": "3,877",
    "sellPrice": "2,717"
  },
  {
    "name": "Honey-Glazed Carrots",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Honey Coral",
      "Carrot",
      "Dill"
    ],
    "stars": 3,
    "energy": "944",
    "sellPrice": "362"
  },
  {
    "name": "Honey Pancakes",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Honey Coral",
      "Wheat",
      "Egg"
    ],
    "stars": 3,
    "energy": "1,263",
    "sellPrice": "555"
  },
  {
    "name": "Horace's Ham Sandwich",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Pearly Barley",
      "Cheese",
      "Any Vegetable"
    ],
    "stars": 3,
    "energy": "643",
    "sellPrice": "326"
  },
  {
    "name": "Jellied Fish Terrine",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Jellied Fish"
    ],
    "stars": 1,
    "energy": "2,450",
    "sellPrice": "1,200"
  },
  {
    "name": "Jellied Salad",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Jellied Fish",
      "Scarlet Kale"
    ],
    "stars": 2,
    "energy": "2,717",
    "sellPrice": "1,337"
  },
  {
    "name": "Kanine Krunchies Cereal",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Pearly Barley",
      "Pincushion Peach"
    ],
    "stars": 2,
    "energy": "796",
    "sellPrice": "107"
  },
  {
    "name": "Pixie Pizza",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Fairy Kamut",
      "Cheese"
    ],
    "stars": 5,
    "energy": "1,268",
    "sellPrice": "718"
  },
  {
    "name": "Scarlet Kale and Cheese Pinwheels",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Tomato",
      "Fairy Sprinkles",
      "Button Mushroom",
      "Wheat",
      "Scarlet Kale",
      "Cheese"
    ],
    "stars": 3,
    "energy": "694",
    "sellPrice": "294"
  },
  {
    "name": "Stargazy Pie",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Measuring-Tape",
      "Snail",
      "Satin-Finned Betta",
      "Red Alpine Bass",
      "Wheat"
    ],
    "stars": 4,
    "energy": "5,026",
    "sellPrice": "1,953"
  },
  {
    "name": "Vintage Peach Trifle",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Pincushion Peach",
      "Milk",
      "Pearly Barley",
      "Sugarcane",
      "Any Fruit"
    ],
    "stars": 5,
    "energy": "1,752",
    "sellPrice": "544"
  },
  {
    "name": "Beauty and the Beets Napoleon",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Beetroot",
      "Butter",
      "Egg",
      "Milk",
      "Red Currants"
    ],
    "stars": 5,
    "energy": null,
    "sellPrice": "1,109"
  },
  {
    "name": "Beet Brownie Stack",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Beetroot",
      "Egg",
      "Any Sweet"
    ],
    "stars": 3,
    "energy": "826",
    "sellPrice": "363"
  },
  {
    "name": "Beet Sugar Sculpture",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Beetroot",
      "Sugarcane",
      "Fairy Kamut"
    ],
    "stars": 2,
    "energy": "223",
    "sellPrice": "51"
  },
  {
    "name": "Fairy Boot Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Honey Coral",
      "Egg",
      "Butter",
      "Dark Chocolate"
    ],
    "stars": 0,
    "energy": "2,052",
    "sellPrice": "1,212"
  },
  {
    "name": "Fairy Bread",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Coffee Beans",
      "Fairy Kamut",
      "Fairy Sprinkles"
    ],
    "stars": 2,
    "energy": "360",
    "sellPrice": "243"
  },
  {
    "name": "Fairy Wands",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Bonsai Star Fruit",
      "Lollipop Fruit",
      "Any Fruit"
    ],
    "stars": 3,
    "energy": "1,028",
    "sellPrice": "229"
  },
  {
    "name": "Pixie Ice Cream Dome Cake",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Fairy Kamut",
      "Fairy Sprinkles",
      "Slush Ice",
      "Red Currants"
    ],
    "stars": 4,
    "energy": "1,489",
    "sellPrice": "554"
  },
  {
    "name": "Red Currant Linzer Cookies",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Wheat",
      "Butter",
      "Red Currants",
      "Sugarcane"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "365"
  },
  {
    "name": "Red Currant Valley Cakes",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Egg",
      "Milk",
      "Red Currants"
    ],
    "stars": 3,
    "energy": "1,895",
    "sellPrice": "676"
  },
  {
    "name": "Tigger Tails",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Lollipop Fruit",
      "Fairy Sprinkles"
    ],
    "stars": 2,
    "energy": "437",
    "sellPrice": "253"
  },
  {
    "name": "Blustery Day Soup",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Any Dairy or Oil",
      "Mushroom",
      "Truffle",
      "Golden Honey"
    ],
    "stars": 4,
    "energy": "1,339",
    "sellPrice": "226"
  },
  {
    "name": "Honeycrunch Bar",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Sweet Chestnut",
      "Golden Honey"
    ],
    "stars": 2,
    "energy": "1,410",
    "sellPrice": "107"
  },
  {
    "name": "Sweet Acorn Porridge",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Acorn Snail",
      "Any Fruit",
      "Any Grain"
    ],
    "stars": 3,
    "energy": "661",
    "sellPrice": "119"
  },
  {
    "name": "Warm Milk & Honey",
    "mealType": "Appetizers",
    "emoji": "🥗",
    "ingredients": [
      "Milk",
      "Golden Honey",
      "Any Fish"
    ],
    "stars": 2,
    "energy": null,
    "sellPrice": "344"
  },
  {
    "name": "Foresty Quiche",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Any Dairy or Oil",
      "Juniper Berry",
      "Truffle",
      "Golden Pattypan"
    ],
    "stars": 5,
    "energy": "1,376",
    "sellPrice": "248"
  },
  {
    "name": "Honey-Glazed Plush Fish",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Plush Fish",
      "Any Vegetable",
      "Golden Honey"
    ],
    "stars": 3,
    "energy": "3,507",
    "sellPrice": "1,320"
  },
  {
    "name": "Rabbit's Garden Pie",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Golden Pattypan",
      "Parsnip",
      "Pufflebud Pods",
      "Carrot",
      "Any Grain"
    ],
    "stars": 5,
    "energy": "448",
    "sellPrice": "323"
  },
  {
    "name": "Toasted Picnic Sandwich",
    "mealType": "Entrées",
    "emoji": "🍖",
    "ingredients": [
      "Golden Honey",
      "Parsnip",
      "Any Dairy or Oil",
      "Tree Resin",
      "Any Spice"
    ],
    "stars": 5,
    "energy": "1,208",
    "sellPrice": "173"
  },
  {
    "name": "Brunchfast",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sweet Jelly",
      "Butter",
      "Egg",
      "Any Fruit"
    ],
    "stars": 4,
    "energy": "2,967",
    "sellPrice": "1,303"
  },
  {
    "name": "Honey Macarons",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Golden Honey",
      "Sweet Jelly",
      "Any Grain"
    ],
    "stars": 4,
    "energy": "3,316",
    "sellPrice": "802"
  },
  {
    "name": "Honey Triffle",
    "mealType": "Desserts",
    "emoji": "🍰",
    "ingredients": [
      "Sweet Chestnut",
      "Pufflebud Pods",
      "Golden Honey"
    ],
    "stars": 4,
    "energy": null,
    "sellPrice": "239"
  }
];

const SEED_TASKS = [
  { text: "Water the crops", category: "Daily" },
  { text: "Feed the critters / check bug nets", category: "Daily" },
  { text: "Check Sunny's Sundries / shop stock", category: "Daily" },
  { text: "Collect Star Path rewards", category: "Weekly" },
];



// Critters/creatures/companions roster, sourced from the game's own Companion.json
// (this game treats catchable critters and equippable companions as one system).
// No zone/location data available locally yet.

const KNOWN_CREATURES = [
  {
    "name": "Magic Carpet",
    "family": "Aladdin",
    "emoji": "🪔"
  },
  {
    "name": "Rajah",
    "family": "Aladdin",
    "emoji": "🪔"
  },
  {
    "name": "Tiger Cub",
    "family": "Aladdin",
    "emoji": "🪔"
  },
  {
    "name": "Ancient Robot",
    "family": "Ancient Civ",
    "emoji": "🗿"
  },
  {
    "name": "Classic Sea Turtle",
    "family": "Beach",
    "emoji": "🐢"
  },
  {
    "name": "Brown Sea Turtle",
    "family": "Beach",
    "emoji": "🐢"
  },
  {
    "name": "White Sea Turtle",
    "family": "Beach",
    "emoji": "🐢"
  },
  {
    "name": "Purple Sea Turtle",
    "family": "Beach",
    "emoji": "🐢"
  },
  {
    "name": "Black Sea Turtle",
    "family": "Beach",
    "emoji": "🐢"
  },
  {
    "name": "Rainbow Bird Snippet",
    "family": "Bird",
    "emoji": "🐦"
  },
  {
    "name": "Red Bird Snippet",
    "family": "Bird",
    "emoji": "🐦"
  },
  {
    "name": "Blue Bird Snippet",
    "family": "Bird",
    "emoji": "🐦"
  },
  {
    "name": "Green Bird Snippet",
    "family": "Bird",
    "emoji": "🐦"
  },
  {
    "name": "Yellow Bird Snippet",
    "family": "Bird",
    "emoji": "🐦"
  },
  {
    "name": "White Bird Snippet",
    "family": "Bird",
    "emoji": "🐦"
  },
  {
    "name": "Shadowy Bird Snippet",
    "family": "Bird",
    "emoji": "🐦"
  },
  {
    "name": "Witchy Kitty",
    "family": "Cat",
    "emoji": "🐱"
  },
  {
    "name": "Star Command Cat",
    "family": "Cat",
    "emoji": "🐱"
  },
  {
    "name": "Dinah",
    "family": "Cat",
    "emoji": "🐱"
  },
  {
    "name": "Figaro",
    "family": "Cat",
    "emoji": "🐱"
  },
  {
    "name": "Mochi",
    "family": "Cat",
    "emoji": "🐱"
  },
  {
    "name": "Choco Crocodile",
    "family": "Crocodile",
    "emoji": "🐊"
  },
  {
    "name": "Classic Crocodile",
    "family": "Crocodile",
    "emoji": "🐊"
  },
  {
    "name": "Blue Crocodile",
    "family": "Crocodile",
    "emoji": "🐊"
  },
  {
    "name": "Red Crocodile",
    "family": "Crocodile",
    "emoji": "🐊"
  },
  {
    "name": "Golden Crocodile",
    "family": "Crocodile",
    "emoji": "🐊"
  },
  {
    "name": "White Crocodile",
    "family": "Crocodile",
    "emoji": "🐊"
  },
  {
    "name": "Pink Crocodile",
    "family": "Crocodile",
    "emoji": "🐊"
  },
  {
    "name": "Dapper Crocodile",
    "family": "Crocodile",
    "emoji": "🐊"
  },
  {
    "name": "Blue Whimsical Crocodile",
    "family": "Crocodile",
    "emoji": "🐊"
  },
  {
    "name": "Pink Whimsical Crocodile",
    "family": "Crocodile",
    "emoji": "🐊"
  },
  {
    "name": "Bountiful Croc",
    "family": "Crocodile",
    "emoji": "🐊"
  },
  {
    "name": "Classic Raven",
    "family": "Dark Mountains",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Red Raven",
    "family": "Dark Mountains",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "White Raven",
    "family": "Dark Mountains",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Blue Raven",
    "family": "Dark Mountains",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Brown Raven",
    "family": "Dark Mountains",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Everafter Demon Snippet",
    "family": "Demon",
    "emoji": "👹"
  },
  {
    "name": "Rainbow Demon Snippet",
    "family": "Demon",
    "emoji": "👹"
  },
  {
    "name": "Pink Demon Snippet",
    "family": "Demon",
    "emoji": "👹"
  },
  {
    "name": "Blue Demon Snippet",
    "family": "Demon",
    "emoji": "👹"
  },
  {
    "name": "Red Demon Snippet",
    "family": "Demon",
    "emoji": "👹"
  },
  {
    "name": "Green Demon Snippet",
    "family": "Demon",
    "emoji": "👹"
  },
  {
    "name": "Shadowy Demon Snippet",
    "family": "Demon",
    "emoji": "👹"
  },
  {
    "name": "Good, Good, Good Puppy",
    "family": "Dog",
    "emoji": "🐶"
  },
  {
    "name": "Corgi Puppy",
    "family": "Dog",
    "emoji": "🐶"
  },
  {
    "name": "Husky Puppy",
    "family": "Dog",
    "emoji": "🐶"
  },
  {
    "name": "Blooming Puppy",
    "family": "Dog",
    "emoji": "🐶"
  },
  {
    "name": "Lucky",
    "family": "Dog",
    "emoji": "🐶"
  },
  {
    "name": "Max",
    "family": "Dog",
    "emoji": "🐶"
  },
  {
    "name": "Percy",
    "family": "Dog",
    "emoji": "🐶"
  },
  {
    "name": "Sailing Skipper Dachshund",
    "family": "Dog",
    "emoji": "🐶"
  },
  {
    "name": "Wishblossom Horse",
    "family": "Dreamlight Valley",
    "emoji": "✨"
  },
  {
    "name": "Haunted Floating Festival Fox",
    "family": "Event",
    "emoji": "🎉"
  },
  {
    "name": "Robo Capybara",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Classic Capybara",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Black and White Capybara",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Blue Striped Capybara",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Gray Spotted Capybara",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Red and White Striped Capybara",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Toon Capybara",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Flowery Capybara",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Nostalgia Capybara",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Relaxing Capybara",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Tinker Bell Capybara",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Classic Cobra",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Blue and Red Striped Cobra",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Pink Spotted Cobra",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Yellow and Purple Striped Cobra",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Green and White Striped Cobra",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Toon Cobra",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Tea Party Monkey",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Classic Monkey",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Black and Brown Monkey",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Red and Beige Monkey",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Beige Monkey",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Black and Gray Monkey",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Toon Monkey",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Jester Monkey",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Pirate Monkey",
    "family": "Expansion01",
    "emoji": "🏝️"
  },
  {
    "name": "Blue Baby Dragon",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Red Baby Dragon",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Green Baby Dragon",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Purple Baby Dragon",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Teal Baby Dragon",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Knightly Dragon",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Sakura Blossom Dragon",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Scholarly Baby Dragon",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Train Conductor Dragon",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Pink Pegasus",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Blue Pegasus",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Yellow Pegasus",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Peach Pegasus",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Black Pegasus",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Baby Pegasus",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Festive Pegasus",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Pink Baby Pegasus",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Winter Fairy Unicorn",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Brown Owl",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Purple Owl",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Dark Owl",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Light Owl",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "White Owl",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "Witching Owl",
    "family": "Expansion02",
    "emoji": "📖"
  },
  {
    "name": "BamBee",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Sweet Bee",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Pink Sweet Bee",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Blue Sweet Bee",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "White Sweet Bee",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Skunk",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Brown Skunk",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "White Skunk",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Patterned Skunk",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Abigail the Goose",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Amelia the Goose",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Yeehaw Goose",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Goose",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "True North Goose",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Black Goose",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Golden Goose",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Blue Goose",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Yellow Goose",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Professor Mouffette",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "Jester Skunk",
    "family": "Expansion03",
    "emoji": "⛰️"
  },
  {
    "name": "The Footstool",
    "family": "Foot Stool",
    "emoji": "🪑"
  },
  {
    "name": "Classic Raccoon",
    "family": "Forest",
    "emoji": "🦉"
  },
  {
    "name": "Red Raccoon",
    "family": "Forest",
    "emoji": "🦉"
  },
  {
    "name": "Black Raccoon",
    "family": "Forest",
    "emoji": "🦉"
  },
  {
    "name": "White Raccoon",
    "family": "Forest",
    "emoji": "🦉"
  },
  {
    "name": "Blue Raccoon",
    "family": "Forest",
    "emoji": "🦉"
  },
  {
    "name": "Rock and Roll Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Blue Whimsical Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Pink Whimsical Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Fennec Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Festive Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "White Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Classic Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Black Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Blue Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Red Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Ghostly \"Zero\" Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Dancing Lion Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "\"Lion\" Cub Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Pooh Adorable Loungefly Harness Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Rainbow Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Regal Fox",
    "family": "Fox",
    "emoji": "🦊"
  },
  {
    "name": "Neverafter Frog Snippet",
    "family": "Frog",
    "emoji": "🐸"
  },
  {
    "name": "Rainbow Frog Snippet",
    "family": "Frog",
    "emoji": "🐸"
  },
  {
    "name": "Blue Frog Snippet",
    "family": "Frog",
    "emoji": "🐸"
  },
  {
    "name": "Pink Frog Snippet",
    "family": "Frog",
    "emoji": "🐸"
  },
  {
    "name": "Purple Frog Snippet",
    "family": "Frog",
    "emoji": "🐸"
  },
  {
    "name": "Yellow Frog Snippet",
    "family": "Frog",
    "emoji": "🐸"
  },
  {
    "name": "Shadowy Frog Snippet",
    "family": "Frog",
    "emoji": "🐸"
  },
  {
    "name": "Sven",
    "family": "Frozen",
    "emoji": "❄️"
  },
  {
    "name": "Pegasus",
    "family": "Hercules",
    "emoji": "💪"
  },
  {
    "name": "Classic Rabbit",
    "family": "Meadow",
    "emoji": "🐝"
  },
  {
    "name": "Black Rabbit",
    "family": "Meadow",
    "emoji": "🐝"
  },
  {
    "name": "Brown Rabbit",
    "family": "Meadow",
    "emoji": "🐝"
  },
  {
    "name": "White Rabbit",
    "family": "Meadow",
    "emoji": "🐝"
  },
  {
    "name": "Calico Rabbit",
    "family": "Meadow",
    "emoji": "🐝"
  },
  {
    "name": "Pluto",
    "family": "Mickey",
    "emoji": "🐭"
  },
  {
    "name": "Busy Bee Hedgehog",
    "family": "Mini01",
    "emoji": "🐾"
  },
  {
    "name": "Classic Hedgehog",
    "family": "Mini01",
    "emoji": "🐾"
  },
  {
    "name": "Yellow Hedgehog",
    "family": "Mini01",
    "emoji": "🐾"
  },
  {
    "name": "Green Hedgehog",
    "family": "Mini01",
    "emoji": "🐾"
  },
  {
    "name": "Orange Hedgehog",
    "family": "Mini01",
    "emoji": "🐾"
  },
  {
    "name": "Heihei",
    "family": "Moana",
    "emoji": "🌊"
  },
  {
    "name": "Pua",
    "family": "Moana",
    "emoji": "🌊"
  },
  {
    "name": "Khan",
    "family": "Mulan",
    "emoji": "🐉"
  },
  {
    "name": "Nana",
    "family": "Peter Pan",
    "emoji": "🍃"
  },
  {
    "name": "Meeko",
    "family": "Pocahontas",
    "emoji": "🍁"
  },
  {
    "name": "Blue Whimsical Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Pink Whimsical Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Envy Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Gingerbread Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Gentle Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Classic Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Black Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Brown Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "White Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Calico Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Blue Spring Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Pink Spring Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Yellow Spring Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Frosty Rabbit",
    "family": "Rabbit",
    "emoji": "🐰"
  },
  {
    "name": "Blue Whimsical Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Pink Whimsical Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Anger Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Disgust Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Fear Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Joy Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Sadness Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Classic Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Red Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Black Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "White Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Blue Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Wind-Up Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Snowy Raccoon",
    "family": "Racoon",
    "emoji": "🦝"
  },
  {
    "name": "Mystical Phoenix",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Maleficent's Raven",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Blue Whimsical Raven",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Pink Whimsical Raven",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Ennui Raven",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Purple Fiery Raven",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Fiery Raven",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Pirate Parrot",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Classic Raven",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Red Raven",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "White Raven",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Blue Raven",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Brown Raven",
    "family": "Raven",
    "emoji": "🐦‍⬛"
  },
  {
    "name": "Mini Reindeer",
    "family": "Reindeer",
    "emoji": "🦌"
  },
  {
    "name": "Red Sunbird",
    "family": "Savanna",
    "emoji": "🦁"
  },
  {
    "name": "Turquoise Sunbird",
    "family": "Savanna",
    "emoji": "🦁"
  },
  {
    "name": "Emerald Sunbird",
    "family": "Savanna",
    "emoji": "🦁"
  },
  {
    "name": "Golden Sunbird",
    "family": "Savanna",
    "emoji": "🦁"
  },
  {
    "name": "Orchid Sunbird",
    "family": "Savanna",
    "emoji": "🦁"
  },
  {
    "name": "White Fox",
    "family": "Snow Cliffs",
    "emoji": "🏔️"
  },
  {
    "name": "Classic Fox",
    "family": "Snow Cliffs",
    "emoji": "🏔️"
  },
  {
    "name": "Black Fox",
    "family": "Snow Cliffs",
    "emoji": "🏔️"
  },
  {
    "name": "Blue Fox",
    "family": "Snow Cliffs",
    "emoji": "🏔️"
  },
  {
    "name": "Red Fox",
    "family": "Snow Cliffs",
    "emoji": "🏔️"
  },
  {
    "name": "Anxiety Squirrel",
    "family": "Squirrel",
    "emoji": "🐿️"
  },
  {
    "name": "Blue Whimsical Squirrel",
    "family": "Squirrel",
    "emoji": "🐿️"
  },
  {
    "name": "Pink Whimsical Squirrel",
    "family": "Squirrel",
    "emoji": "🐿️"
  },
  {
    "name": "IncrediSquirrel",
    "family": "Squirrel",
    "emoji": "🐿️"
  },
  {
    "name": "Magical Squirrel",
    "family": "Squirrel",
    "emoji": "🐿️"
  },
  {
    "name": "Peppy Popcorn Squirrel",
    "family": "Squirrel",
    "emoji": "🐿️"
  },
  {
    "name": "Scary Squirrel",
    "family": "Squirrel",
    "emoji": "🐿️"
  },
  {
    "name": "Classic Squirrel",
    "family": "Squirrel",
    "emoji": "🐿️"
  },
  {
    "name": "Red Squirrel",
    "family": "Squirrel",
    "emoji": "🐿️"
  },
  {
    "name": "Gray Squirrel",
    "family": "Squirrel",
    "emoji": "🐿️"
  },
  {
    "name": "Black Squirrel",
    "family": "Squirrel",
    "emoji": "🐿️"
  },
  {
    "name": "White Squirrel",
    "family": "Squirrel",
    "emoji": "🐿️"
  },
  {
    "name": "BB-8",
    "family": "Star Wars",
    "emoji": "🌌"
  },
  {
    "name": "R2-D2",
    "family": "Star Wars",
    "emoji": "🌌"
  },
  {
    "name": "Butterfly Companion",
    "family": "Sunbird",
    "emoji": "🐦"
  },
  {
    "name": "Blue Whimsical Sunbird",
    "family": "Sunbird",
    "emoji": "🐦"
  },
  {
    "name": "Pink Whimsical Sunbird",
    "family": "Sunbird",
    "emoji": "🐦"
  },
  {
    "name": "Bread and Butterfly",
    "family": "Sunbird",
    "emoji": "🐦"
  },
  {
    "name": "Pink Lovebird",
    "family": "Sunbird",
    "emoji": "🐦"
  },
  {
    "name": "Green Lovebird",
    "family": "Sunbird",
    "emoji": "🐦"
  },
  {
    "name": "Red Sunbird",
    "family": "Sunbird",
    "emoji": "🐦"
  },
  {
    "name": "Turquoise Sunbird",
    "family": "Sunbird",
    "emoji": "🐦"
  },
  {
    "name": "Emerald Sunbird",
    "family": "Sunbird",
    "emoji": "🐦"
  },
  {
    "name": "Golden Sunbird",
    "family": "Sunbird",
    "emoji": "🐦"
  },
  {
    "name": "Orchid Sunbird",
    "family": "Sunbird",
    "emoji": "🐦"
  },
  {
    "name": "Maximus",
    "family": "Tangled",
    "emoji": "👸"
  },
  {
    "name": "Celestial Sea Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "Tart Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "Blue Whimsical Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "Pink Whimsical Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "Embarrassment Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "Rock Star Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "Hermit Garden Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "Classic Sea Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "Brown Sea Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "White Sea Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "Purple Sea Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "Black Sea Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "Rosy Cloud Turtle",
    "family": "Turtle",
    "emoji": "🐢"
  },
  {
    "name": "Classic Squirrel",
    "family": "Urban",
    "emoji": "🐦"
  },
  {
    "name": "Red Squirrel",
    "family": "Urban",
    "emoji": "🐦"
  },
  {
    "name": "Gray Squirrel",
    "family": "Urban",
    "emoji": "🐦"
  },
  {
    "name": "Black Squirrel",
    "family": "Urban",
    "emoji": "🐦"
  },
  {
    "name": "White Squirrel",
    "family": "Urban",
    "emoji": "🐦"
  },
  {
    "name": "Classic Crocodile",
    "family": "Wetlands",
    "emoji": "🐊"
  },
  {
    "name": "Blue Crocodile",
    "family": "Wetlands",
    "emoji": "🐊"
  },
  {
    "name": "Red Crocodile",
    "family": "Wetlands",
    "emoji": "🐊"
  },
  {
    "name": "Golden Crocodile",
    "family": "Wetlands",
    "emoji": "🐊"
  },
  {
    "name": "White Crocodile",
    "family": "Wetlands",
    "emoji": "🐊"
  },
  {
    "name": "Pink Crocodile",
    "family": "Wetlands",
    "emoji": "🐊"
  }
];

const KNOWN_CRAFTING = [
  {
    "name": "Iron Ingot",
    "category": "Refined Materials",
    "materials": [
      "5 Iron Ore",
      "1 Coal Ore"
    ]
  },
  {
    "name": "Gold Ingot",
    "category": "Refined Materials",
    "materials": [
      "5 Gold Nuggets",
      "1 Coal Ore"
    ]
  },
  {
    "name": "Glass",
    "category": "Refined Materials",
    "materials": [
      "5 Sand",
      "1 Coal Ore"
    ]
  },
  {
    "name": "Brick",
    "category": "Refined Materials",
    "materials": [
      "5 Clay",
      "1 Coal Ore"
    ]
  },
  {
    "name": "Fiber",
    "category": "Refined Materials",
    "materials": [
      "1 Seaweed"
    ]
  },
  {
    "name": "Fabric",
    "category": "Refined Materials",
    "materials": [
      "5 Cotton"
    ]
  },
  {
    "name": "Tinkering Parts",
    "category": "Refined Materials",
    "materials": [
      "2 Iron Ingots"
    ]
  },
  {
    "name": "Rope",
    "category": "Refined Materials",
    "materials": [
      "8 Fiber"
    ]
  },
  {
    "name": "Empty Vial",
    "category": "Refined Materials",
    "materials": [
      "3 Glass"
    ]
  },
  {
    "name": "Soil",
    "category": "Refined Materials",
    "materials": [
      "1 Rich Soil"
    ]
  },
  {
    "name": "Night Shard",
    "category": "Refined Materials",
    "materials": [
      "1 Onyx"
    ]
  },
  {
    "name": "Bronze Ingot",
    "category": "Refined Materials",
    "materials": [
      "4 Copper",
      "1 Tin",
      "1 Coal Ore"
    ]
  },
  {
    "name": "Brass Ingot",
    "category": "Refined Materials",
    "materials": [
      "3 Copper",
      "2 Zinc",
      "1 Coal Ore"
    ]
  },
  {
    "name": "Mechanical Parts",
    "category": "Refined Materials",
    "materials": [
      "1 Brass Ingot",
      "1 Bronze Ingot"
    ]
  },
  {
    "name": "Electric Power",
    "category": "Refined Materials",
    "materials": [
      "1 Copper",
      "3 Electric Eel"
    ]
  },
  {
    "name": "Iron Ingot x 2",
    "category": "Refined Materials",
    "materials": [
      "1 Wrought Iron",
      "1 Egg-"
    ]
  },
  {
    "name": "V-EGG- etable Seed",
    "category": "Refined Materials",
    "materials": [
      "cellent Fruit",
      "1 Wild Spring Egg",
      "20",
      "Dreamlight"
    ]
  },
  {
    "name": "Four-Leaf Clover",
    "category": "Refined Materials",
    "materials": [
      "10 Three- Leaf Clover",
      "500",
      "Dreamlight"
    ]
  },
  {
    "name": "Magic x 15",
    "category": "Refined Materials",
    "materials": [
      "Snippet"
    ]
  },
  {
    "name": "Blue Bird Snippet",
    "category": "Refined Materials",
    "materials": [
      "1x White Snippet"
    ]
  },
  {
    "name": "Green Bird Snippet",
    "category": "Refined Materials",
    "materials": [
      "1x White Snippet"
    ]
  },
  {
    "name": "Green Demon Snippet",
    "category": "Refined Materials",
    "materials": [
      "1x White Snippet"
    ]
  },
  {
    "name": "Green Frog Snippet",
    "category": "Refined Materials",
    "materials": [
      "1x White Snippet"
    ]
  },
  {
    "name": "Pink Frog Snippet",
    "category": "Refined Materials",
    "materials": [
      "1x White Snippet"
    ]
  },
  {
    "name": "Purple Frog Snippet",
    "category": "Refined Materials",
    "materials": [
      "1x White Snippet"
    ]
  },
  {
    "name": "Red Demon Snippet",
    "category": "Refined Materials",
    "materials": [
      "1x White Snippet"
    ]
  },
  {
    "name": "Yellow Bird Snippet",
    "category": "Refined Materials",
    "materials": [
      "1x White Snippet"
    ]
  },
  {
    "name": "Yellow Frog Snippet",
    "category": "Refined Materials",
    "materials": [
      "1x White Snippet"
    ]
  },
  {
    "name": "Gold Nugget",
    "category": "Refined Materials",
    "materials": [
      "1 Gold Shard (Aladdin Realm Material)"
    ]
  },
  {
    "name": "Coal Ore x 10",
    "category": "Refined Materials",
    "materials": [
      "1 Charcoal (Aladdin Realm Material)"
    ]
  },
  {
    "name": "Shadowy Bird Snippet",
    "category": "Refined Materials",
    "materials": [
      "1x White Snippet"
    ]
  },
  {
    "name": "Shadowy Frog Snippet",
    "category": "Refined Materials",
    "materials": [
      "1x White Snippet"
    ]
  },
  {
    "name": "Purified Night Shard",
    "category": "Enchantments",
    "materials": [
      "5 Night Shard",
      "1 Dream Shard"
    ]
  },
  {
    "name": "Dreamlight x 250",
    "category": "Enchantments",
    "materials": [
      "10 Dream Shards"
    ]
  },
  {
    "name": "Miracle Pickaxe Polish",
    "category": "Enchantments",
    "materials": [
      "10 Vitalys Crystal",
      "5 Onyx",
      "500",
      "Dreamlight"
    ]
  },
  {
    "name": "Even More Polish",
    "category": "Enchantments",
    "materials": [
      "20 Vitalys",
      "1000",
      "Dreamlight"
    ]
  },
  {
    "name": "Miracle Shovel Varnish",
    "category": "Enchantments",
    "materials": [
      "10 Vitalys Crystal",
      "10 Dry Wood",
      "500",
      "Dreamlight"
    ]
  },
  {
    "name": "Even More Miraculous Shovel Varnish",
    "category": "Enchantments",
    "materials": [
      "20 Vitalys Crystal",
      "20 Dry Wood",
      "1000",
      "Dreamlight"
    ]
  },
  {
    "name": "Miracle Fishing Bait",
    "category": "Enchantments",
    "materials": [
      "10 Vitalys Crystal",
      "5 Red Algae",
      "500",
      "Dreamlight"
    ]
  },
  {
    "name": "Even More Miraculous Fishing Bait",
    "category": "Enchantments",
    "materials": [
      "20 Vitalys Crystal",
      "10 Red Algae",
      "1000",
      "Dreamlight"
    ]
  },
  {
    "name": "Miracle Growth Elixir",
    "category": "Enchantments",
    "materials": [
      "10 Vitalys Crystal",
      "10 Rich Soil",
      "500",
      "Dreamlight"
    ]
  },
  {
    "name": "Even More Miraculous Growth Elixir",
    "category": "Enchantments",
    "materials": [
      "20 Vitalys Crystal",
      "20 Rich Soil",
      "1000",
      "Dreamlight"
    ]
  },
  {
    "name": "Digging Training Manual",
    "category": "Enchantments",
    "materials": [
      "20 Sand",
      "20 Pebbles",
      "30 Soil",
      "5000",
      "Dreamlight"
    ]
  },
  {
    "name": "Fishing Training",
    "category": "Enchantments",
    "materials": [
      "2 Swordfish",
      "10 Herring",
      "5 Bream",
      "5000"
    ]
  },
  {
    "name": "Foraging Training Manual",
    "category": "Enchantments",
    "materials": [
      "30 Banana",
      "10 Basil",
      "20 Blueberry",
      "5000",
      "Dreamlight"
    ]
  },
  {
    "name": "Gardening Training Manual",
    "category": "Enchantments",
    "materials": [
      "40 Corn",
      "60 Tomato",
      "20 Carrot",
      "5000",
      "Dreamlight"
    ]
  },
  {
    "name": "Mining Training Manual",
    "category": "Enchantments",
    "materials": [
      "2 Topaz",
      "2 Peridot",
      "2 Aquamarine",
      "5000",
      "Dreamlight",
      "10 Blue Bird"
    ]
  },
  {
    "name": "Snippet Catching Training Manual",
    "category": "Enchantments",
    "materials": [
      "Snippet",
      "10 Pink Demon Snippet",
      "10 Green Frog Snippet",
      "5000",
      "Dreamlight"
    ]
  },
  {
    "name": "Timebending Training Manual",
    "category": "Enchantments",
    "materials": [
      "10 Wooden Oar",
      "10 Dinglehopper",
      "10 Pink Bow",
      "5000",
      "Dreamlight"
    ]
  },
  {
    "name": "Asphalt",
    "category": "Fences And Paving",
    "materials": [
      "1 Sand",
      "1 Pebble 1 Coal Ore"
    ]
  },
  {
    "name": "Brick Road",
    "category": "Fences And Paving",
    "materials": [
      "2 Stones"
    ]
  },
  {
    "name": "Dark Wire Mesh Fence (Base)",
    "category": "Fences And Paving",
    "materials": [
      "2 Iron Ingot"
    ]
  },
  {
    "name": "Dark Wood Fence (Base)",
    "category": "Fences And Paving",
    "materials": [
      "5 Dark Wood"
    ]
  },
  {
    "name": "Gem and Opal Road",
    "category": "Fences And Paving",
    "materials": [
      "1 Stone",
      "1 Aquamarine",
      "1 Tourmaline"
    ]
  },
  {
    "name": "Gold and Opal Road",
    "category": "Fences And Paving",
    "materials": [
      "1 Stone",
      "1 Gold Ingot"
    ]
  },
  {
    "name": "Green Bamboo Fence (Base)",
    "category": "Fences And Paving",
    "materials": [
      "5 Softwood",
      "5 Fiber"
    ]
  },
  {
    "name": "Iron Spike and Brick Fence (Base)",
    "category": "Fences And Paving",
    "materials": [
      "2 Iron Ingot",
      "3 Brick"
    ]
  },
  {
    "name": "Leaf-Strewn Path",
    "category": "Fences And Paving",
    "materials": [
      "1 Hardwood",
      "1 Soil"
    ]
  },
  {
    "name": "Loose Gravel Path",
    "category": "Fences And Paving",
    "materials": [
      "1 Soil",
      "1 Pebble"
    ]
  },
  {
    "name": "Metal Spike Fence (Base)",
    "category": "Fences And Paving",
    "materials": [
      "2 Brick",
      "3 Iron Ingot"
    ]
  },
  {
    "name": "Muddy Path",
    "category": "Fences And Paving",
    "materials": [
      "1 Soil",
      "1 Hardwood"
    ]
  },
  {
    "name": "Natural Rock Path",
    "category": "Fences And Paving",
    "materials": [
      "1 Pebble",
      "1 Sand"
    ]
  },
  {
    "name": "Sinister Brick Road",
    "category": "Fences And Paving",
    "materials": [
      "1 Stone",
      "1 Soil"
    ]
  },
  {
    "name": "Snowy Brick Road",
    "category": "Fences And Paving",
    "materials": [
      "1 Stone",
      "1 Snow"
    ]
  },
  {
    "name": "Road",
    "category": "Fences And Paving",
    "materials": [
      "1 Clay"
    ]
  },
  {
    "name": "White Bamboo Fence (Base)",
    "category": "Fences And Paving",
    "materials": [
      "5 Softwood"
    ]
  },
  {
    "name": "Wire Mesh Fence (Base)",
    "category": "Fences And Paving",
    "materials": [
      "2 Iron Ingot"
    ]
  },
  {
    "name": "Marble Fence",
    "category": "Fences And Paving",
    "materials": [
      "3x Marble",
      "1x Crimson Eternal Poppies",
      "1x Fuchsia Eternal Poppies"
    ]
  },
  {
    "name": "Asphalt with Border",
    "category": "Fences And Paving",
    "materials": [
      "1 Sand",
      "1 Pebbles",
      "1 Coal Ore"
    ]
  },
  {
    "name": "Muddy Path with Border",
    "category": "Fences And Paving",
    "materials": [
      "1 Soil",
      "1 Hardwood"
    ]
  },
  {
    "name": "Natural Rock Path with Border",
    "category": "Fences And Paving",
    "materials": [
      "1 Pebbles",
      "1 Sand"
    ]
  },
  {
    "name": "Brick Road with Border",
    "category": "Fences And Paving",
    "materials": [
      "2 Stone"
    ]
  },
  {
    "name": "Sinister Brick Road with Border",
    "category": "Fences And Paving",
    "materials": [
      "1 Stone",
      "1 Soil"
    ]
  },
  {
    "name": "Golden Brick Road with",
    "category": "Fences And Paving",
    "materials": [
      "1 Gold Ingot"
    ]
  },
  {
    "name": "Leaf-Strewn Path with Border",
    "category": "Fences And Paving",
    "materials": [
      "1 Hardwood",
      "1 Soil"
    ]
  },
  {
    "name": "Loose Gravel Path with Border",
    "category": "Fences And Paving",
    "materials": [
      "1 Soil",
      "1 Pebbles"
    ]
  },
  {
    "name": "Gold and Opal Road with Border",
    "category": "Fences And Paving",
    "materials": [
      "1 Stone",
      "1 Gold Ingot"
    ]
  },
  {
    "name": "Gem and Opal Road with Border",
    "category": "Fences And Paving",
    "materials": [
      "1 Stone",
      "1 Aquamarine",
      "1 Tourmaline"
    ]
  },
  {
    "name": "Sun-Baked Earthen Road with Border",
    "category": "Fences And Paving",
    "materials": [
      "1 Soil",
      "1 Clay"
    ]
  },
  {
    "name": "Snowy Brick Road with Border",
    "category": "Fences And Paving",
    "materials": [
      "1 Stone",
      "1 Snowball"
    ]
  },
  {
    "name": "Ancient's Path",
    "category": "Fences And Paving",
    "materials": [
      "1 Stone",
      "1 Pebbles",
      "1 Coal Ore"
    ]
  },
  {
    "name": "Ancient's Road",
    "category": "Fences And Paving",
    "materials": [
      "1 Stone",
      "1 Pebbles",
      "1 Coal Ore"
    ]
  },
  {
    "name": "Path",
    "category": "Fences And Paving",
    "materials": [
      "Radiator"
    ]
  },
  {
    "name": "Ancient Tile Road",
    "category": "Fences And Paving",
    "materials": [
      "1 Ancient Radiator"
    ]
  },
  {
    "name": "Ancient Gear Tile",
    "category": "Fences And Paving",
    "materials": [
      "1 Ancient Gear"
    ]
  },
  {
    "name": "Ancient Gear Corner Tile",
    "category": "Fences And Paving",
    "materials": [
      "1 Ancient Gear"
    ]
  },
  {
    "name": "Precious Pebble Path",
    "category": "Fences And Paving",
    "materials": [
      "1 Pearl",
      "1 Pebbles",
      "1 Jade"
    ]
  },
  {
    "name": "Precious Amber Pebble Path",
    "category": "Fences And Paving",
    "materials": [
      "1 Pearl",
      "1 Pebbles",
      "1 Jade"
    ]
  },
  {
    "name": "Green and Purple Speckled Path",
    "category": "Fences And Paving",
    "materials": [
      "1 Plastic Scrap",
      "1 Alexandrite"
    ]
  },
  {
    "name": "Yellow and Blue Speckled Path",
    "category": "Fences And Paving",
    "materials": [
      "1 Plastic Scrap",
      "1 Topaz"
    ]
  },
  {
    "name": "Main Street Path",
    "category": "Fences And Paving",
    "materials": [
      "1 Clay",
      "1 Pebbles",
      "1 Sand"
    ]
  },
  {
    "name": "Pale Wood Fence",
    "category": "Fences And Paving",
    "materials": [
      "3 Softwood",
      "2 Hardwood"
    ]
  },
  {
    "name": "Savanna Wooden Fence",
    "category": "Fences And Paving",
    "materials": [
      "5 Hardwood"
    ]
  },
  {
    "name": "Sugar Cookie Pavement",
    "category": "Fences And Paving",
    "materials": [
      "2 Candy"
    ]
  },
  {
    "name": "Deluxe Sugar Cookie Pavement",
    "category": "Fences And Paving",
    "materials": [
      "2 Candy"
    ]
  },
  {
    "name": "Red Bronze Pathway",
    "category": "Fences And Paving",
    "materials": [
      "3 Spinel",
      "1 Bronze Ingot"
    ]
  },
  {
    "name": "Blue Bronze Pathway",
    "category": "Fences And Paving",
    "materials": [
      "1 Spinel",
      "1 Bronze Ingot",
      "1 Blue Zircon"
    ]
  },
  {
    "name": "Ancient's Bamboo Fence",
    "category": "Fences And Paving",
    "materials": [
      "3 Bamboo",
      "1 Rope"
    ]
  },
  {
    "name": "Blend Left Curving Trolley Tracks",
    "category": "Fences And Paving",
    "materials": [
      "8 Tropical Wood",
      "10 Plastic Scrap",
      "5 Copper"
    ]
  },
  {
    "name": "Blend Right Curving Trolley Tracks",
    "category": "Fences And Paving",
    "materials": [
      "8 Tropical Wood",
      "10 Plastic Scrap",
      "5 Copper"
    ]
  },
  {
    "name": "Straight Trolley Tracks",
    "category": "Fences And Paving",
    "materials": [
      "8 Tropical Wood",
      "10 Plastic Scrap",
      "5 Copper"
    ]
  },
  {
    "name": "Oswaldian Blend Left Curving Trolley Tracks",
    "category": "Fences And Paving",
    "materials": [
      "8 Tropical Wood",
      "10 Plastic Scrap",
      "5 Copper"
    ]
  },
  {
    "name": "Oswaldian Blend Right Curving Trolley Tracks",
    "category": "Fences And Paving",
    "materials": [
      "8 Tropical Wood",
      "10 Plastic Scrap",
      "5 Copper"
    ]
  },
  {
    "name": "Oswaldian Straight Trolley Tracks",
    "category": "Fences And Paving",
    "materials": [
      "8 Tropical Wood",
      "10 Plastic Scrap",
      "5 Copper"
    ]
  },
  {
    "name": "Curved Trolley Tracks",
    "category": "Fences And Paving",
    "materials": [
      "8 Tropical Wood",
      "10 Plastic Scrap",
      "5 Copper"
    ]
  },
  {
    "name": "Oswaldian Curved Trolley",
    "category": "Fences And Paving",
    "materials": [
      "8 Tropical Wood",
      "10 Plastic Scrap",
      "5 Copper"
    ]
  },
  {
    "name": "Gold Bumblestone Path",
    "category": "Fences And Paving",
    "materials": [
      "3 Bumblestone",
      "1 Scales"
    ]
  },
  {
    "name": "Green Bumblestone Path",
    "category": "Functional Items",
    "materials": [
      "3 Bumblestone",
      "1 Scales",
      "1 Alexandrite"
    ]
  },
  {
    "name": "Black Flat-Top Stove",
    "category": "Functional Items",
    "materials": [
      "10 Iron Ingot",
      "3 Glass",
      "1 Black Passion Lily"
    ]
  },
  {
    "name": "Black Gas Stove",
    "category": "Functional Items",
    "materials": [
      "12 Iron Ingot",
      "2 Glass"
    ]
  },
  {
    "name": "Black Retro Portable Radio",
    "category": "Functional Items",
    "materials": [
      "5 Soft Wood",
      "2 Iron Ingot"
    ]
  },
  {
    "name": "Blue Retro Portable Radio",
    "category": "Functional Items",
    "materials": [
      "5 Soft Wood",
      "2 Iron Ingot 1 Blue Star Lil"
    ]
  },
  {
    "name": "Brown Retro Portable Radio",
    "category": "Functional Items",
    "materials": [
      "10 Soft Wood",
      "1 Iron Ingot"
    ]
  },
  {
    "name": "Gray Flat- Top Stove",
    "category": "Functional Items",
    "materials": [
      "10 Iron Ingot",
      "3 Glass"
    ]
  },
  {
    "name": "Gray Gas Stove",
    "category": "Functional Items",
    "materials": [
      "12 Iron Ingot",
      "2 Glass"
    ]
  },
  {
    "name": "Iron Crafting Station",
    "category": "Functional Items",
    "materials": [
      "2 Iron Ingot",
      "10 Hard Wood 1 Topaz"
    ]
  },
  {
    "name": "Gray Mailbox",
    "category": "Functional Items",
    "materials": [
      "Iron Ingot",
      "10 Hardwood",
      "1 White Bell Flower"
    ]
  },
  {
    "name": "Pale Gray Flat-Stop Stove",
    "category": "Functional Items",
    "materials": [
      "10 Iron Ingot",
      "3 Glass"
    ]
  },
  {
    "name": "Pastel Egg Cooking Station",
    "category": "Functional Items",
    "materials": [
      "15 Fishy Green Egg",
      "5 Purple Spring Egg",
      "1 Onyx"
    ]
  },
  {
    "name": "Pink Flat-Top Stove",
    "category": "Functional Items",
    "materials": [
      "10 Iron Ingot",
      "3 Glass Pink Houseleek"
    ]
  },
  {
    "name": "Pink Gas Stove",
    "category": "Functional Items",
    "materials": [
      "12 Iron Ingot",
      "2 Glass Pink Houseleek"
    ]
  },
  {
    "name": "Red Mailbox",
    "category": "Functional Items",
    "materials": [
      "2 Iron Ingot",
      "10 Hard Wood 1 Red Bromeliad"
    ]
  },
  {
    "name": "White Flat- Top Stove",
    "category": "Functional Items",
    "materials": [
      "10 Iron Ingot",
      "3 Glass"
    ]
  },
  {
    "name": "White Gas Stove",
    "category": "Functional Items",
    "materials": [
      "12 Iron Ingot",
      "2 Glass 1 Black Passion Lily"
    ]
  },
  {
    "name": "Wooden Crafting Station",
    "category": "Functional Items",
    "materials": [
      "10 Iron Ingot",
      "10 Hardwood",
      "1 Topaz",
      "3 Red Falling Penstemon"
    ]
  },
  {
    "name": "Basic Fall Leaves",
    "category": "Functional Items",
    "materials": [
      "1x Lamprey",
      "1x Star Sapphire",
      "500x Story",
      "5x Pine Cone"
    ]
  },
  {
    "name": "Basic Faerie Snippet Repellent",
    "category": "Functional Items",
    "materials": [
      "1x Lamprey",
      "1x Star Sapphire",
      "500x Story Magic",
      "10x Volcanic Rock"
    ]
  },
  {
    "name": "Basic Olympic Snippet Repellent",
    "category": "Functional Items",
    "materials": [
      "5x Petrified Wood",
      "1x Lamprey",
      "1x Star Sapphire",
      "500x Story Magic",
      "10x Marble",
      "5x Gold Ingot"
    ]
  },
  {
    "name": "Basic Fall Leaves Slow Trap",
    "category": "Functional Items",
    "materials": [
      "1x Sorcerer Hat Hermit Crab",
      "1x Opal",
      "500x Story Magic",
      "10x Moss",
      "5x Pine Cone"
    ]
  },
  {
    "name": "Basic Faerie Slow Trap",
    "category": "Functional Items",
    "materials": [
      "1x Sorcerer Hat Hermit Crab",
      "1x Opal",
      "500x Story Magic",
      "10x Volcanic Rock",
      "5x Petrified Wood"
    ]
  },
  {
    "name": "Basic Olympic Slow Trap",
    "category": "Functional Items",
    "materials": [
      "1x Sorcerer Hat Hermit Crab",
      "1x Opal",
      "500x Story Magic",
      "10x Marble",
      "5x Gold Ingot"
    ]
  },
  {
    "name": "Basic Fall Leaves Lure Trap",
    "category": "Functional Items",
    "materials": [
      "1x Stygian Mudskipper",
      "1x Magma",
      "500x Story Magic",
      "10x Moss",
      "5x Pine Cone"
    ]
  },
  {
    "name": "Basic Faerie Lure Trap",
    "category": "Functional Items",
    "materials": [
      "1x Magma",
      "500x Story Magic",
      "10x Volcanic Rock",
      "5x Petrified Wood"
    ]
  },
  {
    "name": "Basic Olympic Lure Trap",
    "category": "Functional Items",
    "materials": [
      "1x Stygian Mudskipper",
      "1x Magma",
      "500x Story Magic",
      "10x Marble",
      "5x Gold Ingot"
    ]
  },
  {
    "name": "Chariot Lift",
    "category": "Functional Items",
    "materials": [
      "20x Lightning Spice",
      "10x Gravel",
      "10x Broken Weapon",
      "5x Coal",
      "5x Gold Ingot"
    ]
  },
  {
    "name": "Fairytale Armor",
    "category": "Functional Items",
    "materials": [
      "5x Iron Bars",
      "3x White Rose",
      "2x Opal",
      "2x Star Sapphire"
    ]
  },
  {
    "name": "Small Chest",
    "category": "Functional Items",
    "materials": [
      "25 Softwood",
      "25 Stone"
    ]
  },
  {
    "name": "Small Blue Chest",
    "category": "Functional Items",
    "materials": [
      "25 Softwood",
      "25 Stone",
      "6 Blue Falling Penstemon"
    ]
  },
  {
    "name": "Small Green Chest",
    "category": "Functional Items",
    "materials": [
      "25 Softwood",
      "25 Stone",
      "5 Green Rising Penstemon"
    ]
  },
  {
    "name": "Small Red Chest",
    "category": "Functional Items",
    "materials": [
      "25 Softwood",
      "25 Stone",
      "10 Red Falling Penstemon"
    ]
  },
  {
    "name": "Small Yellow Chest",
    "category": "Functional Items",
    "materials": [
      "25 Softwood",
      "25 Stone",
      "6 Dandelion"
    ]
  },
  {
    "name": "Medium Chest",
    "category": "Functional Items",
    "materials": [
      "25 Hardwood",
      "5 Iron Ingot",
      "1000",
      "Dreamlight"
    ]
  },
  {
    "name": "Medium Blue Chest",
    "category": "Functional Items",
    "materials": [
      "25 Hardwood",
      "5 Iron Ingot",
      "1000",
      "Dreamlight",
      "3 Blue Star Lily"
    ]
  },
  {
    "name": "Medium Green Chest",
    "category": "Functional Items",
    "materials": [
      "25 Hardwood",
      "5 Iron Ingot",
      "1000",
      "Dreamlight",
      "5 Green Rising Penstemon"
    ]
  },
  {
    "name": "Medium Red Chest",
    "category": "Functional Items",
    "materials": [
      "25 Hardwood",
      "5 Iron Ingot",
      "1000",
      "Dreamlight",
      "10 Red Bell Flower"
    ]
  },
  {
    "name": "Medium White Chest",
    "category": "Functional Items",
    "materials": [
      "25 Hardwood",
      "5 Iron Ingot",
      "1000",
      "Dreamlight",
      "6 White Marsh Milkweed"
    ]
  },
  {
    "name": "Medium Yellow Chest",
    "category": "Functional Items",
    "materials": [
      "25 Hardwood",
      "5 Iron Ingot",
      "1000",
      "Dreamlight",
      "6 Sunflower"
    ]
  },
  {
    "name": "Large Chest",
    "category": "Functional Items",
    "materials": [
      "25 Dark Wood",
      "5 Gold Ingot",
      "5000",
      "Dreamlight"
    ]
  },
  {
    "name": "Chest",
    "category": "Functional Items",
    "materials": [
      "Dreamlight",
      "5 Blue Passion Lily"
    ]
  },
  {
    "name": "Large Green Chest",
    "category": "Functional Items",
    "materials": [
      "25 Dark Wood",
      "5 Gold Ingot",
      "5000 Dreamlighty"
    ]
  },
  {
    "name": "Large Red Chest",
    "category": "Functional Items",
    "materials": [
      "10 Green Passion Lily",
      "25 Dark Wood",
      "5 Gold Ingot",
      "5000",
      "Dreamlight",
      "6 Red Nasturtium"
    ]
  },
  {
    "name": "Large White Chest",
    "category": "Functional Items",
    "materials": [
      "25 Dark Wood",
      "5 Gold Ingot",
      "5000",
      "Dreamlight",
      "10 White Impatiens"
    ]
  },
  {
    "name": "Large Yellow Chest",
    "category": "Functional Items",
    "materials": [
      "25 Dark Wood",
      "5 Gold Ingot",
      "5000",
      "Dreamlight",
      "3 Yellow Nasturtium"
    ]
  },
  {
    "name": "Chin Up White Mannequin",
    "category": "Functional Items",
    "materials": [
      "15 Dry Wood",
      "15 Fiber"
    ]
  },
  {
    "name": "Hand on Hip Black Mannequin",
    "category": "Functional Items",
    "materials": [
      "15 Dry Wood",
      "15 Fiber"
    ]
  },
  {
    "name": "Hesitant White Mannequin",
    "category": "Functional Items",
    "materials": [
      "15 Softwood",
      "15 Fiber"
    ]
  },
  {
    "name": "Mannequin",
    "category": "Functional Items",
    "materials": [
      "15 Fiber"
    ]
  },
  {
    "name": "Relaxed White Mannequin",
    "category": "Functional Items",
    "materials": [
      "15 Hardwood",
      "15 Fiber"
    ]
  },
  {
    "name": "Thoughtful Black Mannequin",
    "category": "Functional Items",
    "materials": [
      "15 Softwood",
      "15 Fiber",
      "15 Hardwood"
    ]
  },
  {
    "name": "Bayou Companion Home",
    "category": "Functional Items",
    "materials": [
      "5 Blue Marsh Milkweed",
      "1 Orange and Red Marsh Milkweed",
      "10 Clay",
      "1 Okra Seed"
    ]
  },
  {
    "name": "Cozy Companion Home",
    "category": "Functional Items",
    "materials": [
      "15 Softwood",
      "5 Sunflower",
      "5 White and Red Hydrangea",
      "1 Topaz"
    ]
  },
  {
    "name": "Tropical Companion Home",
    "category": "Functional Items",
    "materials": [
      "15 Tropical Wood",
      "10 Bamboo",
      "1 Spinel",
      "3 Green Glass- Like Flowers"
    ]
  },
  {
    "name": "Flying Companion Feeder",
    "category": "Functional Items",
    "materials": [
      "5 Softwood",
      "5 Clay",
      "5 Wheat",
      "2 Red Bell Flower"
    ]
  },
  {
    "name": "Fuzzy Friend Companion Dish",
    "category": "Functional Items",
    "materials": [
      "5 Clay",
      "5 Wheat",
      "2 Red Bell Flower"
    ]
  },
  {
    "name": "Ball",
    "category": "Functional Items",
    "materials": [
      "3 Red Bell Hydrangea"
    ]
  },
  {
    "name": "Playful Companion Pinwheel",
    "category": "Functional Items",
    "materials": [
      "5 Softwood",
      "5 Fiber",
      "5 Pink Hydrangea"
    ]
  },
  {
    "name": "Campfire",
    "category": "Functional Items",
    "materials": [
      "10 Iron Ingot",
      "7 Dry Wood",
      "3 Coal Ore"
    ]
  },
  {
    "name": "Custom Signpost",
    "category": "Functional Items",
    "materials": [
      "10 Softwood"
    ]
  },
  {
    "name": "Delicious Gift",
    "category": "Functional Items",
    "materials": [
      "1 Festive Wrapping Paper",
      "1 Hot Cocoa",
      "1 Minnie's Gingerbread Cookies"
    ]
  },
  {
    "name": "Handcrafted Gift",
    "category": "Functional Items",
    "materials": [
      "1 Festive Wrapping Paper",
      "1 Holiday Feast Chair"
    ]
  },
  {
    "name": "Naughty Gift",
    "category": "Functional Items",
    "materials": [
      "1 Festive Wrapping Paper",
      "1 Coal Ore"
    ]
  },
  {
    "name": "Shiny Gift",
    "category": "Functional Items",
    "materials": [
      "1 Festive Wrapping Paper",
      "1 Shiny Ruby",
      "1 Shiny Emerald"
    ]
  },
  {
    "name": "Purple Button",
    "category": "Functional Items",
    "materials": [
      "1 Blue Button",
      "2 Red Button",
      "100 Dreamlight"
    ]
  },
  {
    "name": "Slow Cooker",
    "category": "Functional Items",
    "materials": [
      "6 Iron Ingot",
      "2 Tinkering Parts",
      "20 Hardwood",
      "5000",
      "Dreamlight"
    ]
  },
  {
    "name": "Timebending Table",
    "category": "Functional Items",
    "materials": [
      "Parts",
      "10 Quartz",
      "10 Zinc",
      "3 Blue Luminescent Flower"
    ]
  },
  {
    "name": "Uncrafting Station Item Barrel Fragment",
    "category": "Furniture",
    "materials": [
      "Recipe",
      "5 Dark Wood",
      "1 Iron Ingot"
    ]
  },
  {
    "name": "Basket",
    "category": "Furniture",
    "materials": [
      "6 Fiber",
      "1 Pink Hydrangea"
    ]
  },
  {
    "name": "Bench",
    "category": "Furniture",
    "materials": [
      "5 Soft Wood",
      "1 Iron Ingot"
    ]
  },
  {
    "name": "Black and White Mickey Mouse Water Tower",
    "category": "Furniture",
    "materials": [
      "100 Iron Ingot",
      "10 Topaz 5 White Bell Flower"
    ]
  },
  {
    "name": "Black Wrought Iron Streetlamp",
    "category": "Furniture",
    "materials": [
      "5 Iron Ingot",
      "2 Glass 1 Topaz"
    ]
  },
  {
    "name": "Black, White, and Yellow Balloon Cluster",
    "category": "Furniture",
    "materials": [
      "5 Iron Ingot",
      "8 Sunflower",
      "8 Black Passion Lily",
      "8 White Marsh Milkweed"
    ]
  },
  {
    "name": "Blue Balloon Arch",
    "category": "Furniture",
    "materials": [
      "20 Blue Falling Penstemon",
      "20 Blue Star Lily",
      "20 Blue Marsh Milkweed"
    ]
  },
  {
    "name": "Blue Balloon Cluster",
    "category": "Furniture",
    "materials": [
      "5 Iron Ingot",
      "8 Blue Falling Penstemon",
      "8 Blue Star Lily",
      "8 Blue Marsh Milkweed"
    ]
  },
  {
    "name": "Blue Egg Lamppost",
    "category": "Furniture",
    "materials": [
      "5 Fishy Green Egg",
      "1 Sapphire",
      "1 Glass",
      "2 Gold Ingot",
      "1 Stone"
    ]
  },
  {
    "name": "Blue Light High Beach Torch",
    "category": "Furniture",
    "materials": [
      "5 Soft Wood",
      "5 Fiber",
      "3 Sand",
      "1 Aquamarine"
    ]
  },
  {
    "name": "Blue Light Low Beach Torch",
    "category": "Furniture",
    "materials": [
      "5 Soft Wood",
      "5 Fiber",
      "3 Sand",
      "1 Aquamarine"
    ]
  },
  {
    "name": "Blue Wrought Iron Streetlamp",
    "category": "Furniture",
    "materials": [
      "5 Iron Ingot",
      "2 Glass",
      "1 Aquamarine"
    ]
  },
  {
    "name": "Broken Carved Pillar Base",
    "category": "Furniture",
    "materials": [
      "25 Soil",
      "50 Stone",
      "15 Clay"
    ]
  },
  {
    "name": "Broken Pillar Base",
    "category": "Furniture",
    "materials": [
      "25 Soil",
      "50 Stone",
      "15 Clay"
    ]
  },
  {
    "name": "Bromeliad and Marsh Milkweed Pot",
    "category": "Furniture",
    "materials": [
      "1 Flower Pot",
      "3 Pink Bromeliad",
      "2 White Marsh Milkweed"
    ]
  },
  {
    "name": "Brown, Green, and Yellow Balloon Arch",
    "category": "Furniture",
    "materials": [
      "10 Iron Ingot",
      "20 Green Rising Penstemon",
      "20 Dandelion",
      "20 White Daisy"
    ]
  },
  {
    "name": "Brown, Green, and Yellow Balloon Cluster",
    "category": "Furniture",
    "materials": [
      "5 Iron Ingot",
      "8 Green Rising Penstemon",
      "8 Dandelion",
      "8 White Daisy"
    ]
  },
  {
    "name": "Burlap Bags",
    "category": "Furniture",
    "materials": [
      "10 Soil",
      "20 Fiber"
    ]
  },
  {
    "name": "Cart",
    "category": "Furniture",
    "materials": [
      "20 Dark Wood",
      "5 Iron Ingot"
    ]
  },
  {
    "name": "Classic Snowman",
    "category": "Furniture",
    "materials": [
      "10 Snowball",
      "1 Carrot",
      "2 Fabric",
      "3 Pebbles"
    ]
  },
  {
    "name": "Compass Ottoman",
    "category": "Furniture",
    "materials": [
      "8 Dark Wood",
      "8 Iron Ingot",
      "12 Fabric",
      "15 Tinkering Parts",
      "2 Rope"
    ]
  },
  {
    "name": "Crate",
    "category": "Furniture",
    "materials": [
      "Wood"
    ]
  },
  {
    "name": "Daisy and Marsh Milkweed Pot",
    "category": "Furniture",
    "materials": [
      "1 Flower Pot",
      "1 Red Daisy",
      "2 White Marsh Milkweed"
    ]
  },
  {
    "name": "Dandelion and Rising Penstemon Pot",
    "category": "Furniture",
    "materials": [
      "1 Flower Pot",
      "1 Dandelion",
      "1 Rising Purple Penstemon"
    ]
  },
  {
    "name": "DJ Booth Rig",
    "category": "Furniture",
    "materials": [
      "100 Iron Ingot",
      "6 Topaz",
      "6 Aquamarine",
      "6 Tourmaline"
    ]
  },
  {
    "name": "Egg Banner",
    "category": "Furniture",
    "materials": [
      "5 Fishy Green Egg",
      "5 Purple Spring Egg",
      "5 Wild Spring Egg",
      "5 Egg-cellent Fruit",
      "5 Spring V-EGG- table"
    ]
  },
  {
    "name": "Elegant Gazebo",
    "category": "Furniture",
    "materials": [
      "200 Dry Wood",
      "50 Glass",
      "10 Diamond",
      "10 Crystal"
    ]
  },
  {
    "name": "Elegant Town Square Clock",
    "category": "Furniture",
    "materials": [
      "200 Stone",
      "100 Hard Wood",
      "30 Gold Ingot",
      "10 Blue Passion Lily"
    ]
  },
  {
    "name": "Falling Penstemon and Bell Flower Pot",
    "category": "Furniture",
    "materials": [
      "1 Flower Pot",
      "1 Blue Falling Penstemon",
      "2 White Bell Flower"
    ]
  },
  {
    "name": "Festive Pennants",
    "category": "Furniture",
    "materials": [
      "5 Hard Wood",
      "5 Fiber",
      "2 Fabric"
    ]
  },
  {
    "name": "Flower Boxes",
    "category": "Furniture",
    "materials": [
      "6 Dry Wood",
      "2 Dandelion",
      "2 Pink Hydrangea",
      "2 Blue Marsh Milkweed"
    ]
  },
  {
    "name": "Flower Pots",
    "category": "Furniture",
    "materials": [
      "6 Clay",
      "2 Soil"
    ]
  },
  {
    "name": "Granite Fire Bowl",
    "category": "Furniture",
    "materials": [
      "1 Broken Sandstone",
      "20 Sand",
      "25 Stone",
      "10 Coal",
      "3 Red Falling Penstemon"
    ]
  },
  {
    "name": "Green Egg Lamppost",
    "category": "Furniture",
    "materials": [
      "5 Fishy Green Egg",
      "1 Emerald",
      "1 Glass",
      "2 Gold Ingot",
      "1 Stone"
    ]
  },
  {
    "name": "Green Light High Beach Torch",
    "category": "Furniture",
    "materials": [
      "5 Soft Wood",
      "5 Fiber",
      "3 Sand",
      "1 Peridot"
    ]
  },
  {
    "name": "Green Light Low Beach Torch",
    "category": "Furniture",
    "materials": [
      "5 Soft Wood",
      "5 Fiber",
      "3 Sand",
      "1 Peridot"
    ]
  },
  {
    "name": "Green Wrought Iron Streetlamp",
    "category": "Furniture",
    "materials": [
      "5 Iron Ingot",
      "2 Glass",
      "1 Emerald"
    ]
  },
  {
    "name": "Half-Barrel",
    "category": "Furniture",
    "materials": [
      "Dark Wood",
      "1 Iron Ingot"
    ]
  },
  {
    "name": "Haughty Snowman",
    "category": "Furniture",
    "materials": [
      "10 Snow Ball",
      "1 Crystal",
      "2 Fabric",
      "2 Garnet"
    ]
  },
  {
    "name": "Hay Bale",
    "category": "Furniture",
    "materials": [
      "10 Fiber",
      "10 Wheat"
    ]
  },
  {
    "name": "Hay Bales",
    "category": "Furniture",
    "materials": [
      "10 Fiber",
      "10 Wheat"
    ]
  },
  {
    "name": "Heavy Wooden Table",
    "category": "Furniture",
    "materials": [
      "Soft Wood"
    ]
  },
  {
    "name": "Helm Bookshelf",
    "category": "Furniture",
    "materials": [
      "25 Dark Wood",
      "5 Iron Ingot"
    ]
  },
  {
    "name": "Hydrangea and Bell Flower Pot",
    "category": "Furniture",
    "materials": [
      "1 Flower Pot",
      "1 Blue Hydrangea",
      "2 Purple Bell Flower"
    ]
  },
  {
    "name": "Impatiens and Bromeliad Pot",
    "category": "Furniture",
    "materials": [
      "1 Flower Pot",
      "1 Purple Impatiens",
      "2 Yellow Bromeliad"
    ]
  },
  {
    "name": "Jubilant Topiary",
    "category": "Furniture",
    "materials": [
      "5 Clay",
      "5 Soil",
      "3 Pink Houseleek"
    ]
  },
  {
    "name": "Lamppost with Blue Light",
    "category": "Furniture",
    "materials": [
      "3 Iron Ingot",
      "1 Glass",
      "1 Amethyst"
    ]
  },
  {
    "name": "Lamppost with Green Light",
    "category": "Furniture",
    "materials": [
      "3 Iron Ingot",
      "1 Glass",
      "1 Emerald"
    ]
  },
  {
    "name": "Lamppost with Red Light",
    "category": "Furniture",
    "materials": [
      "3 Iron Ingot",
      "1 Glass",
      "1 Garnet"
    ]
  },
  {
    "name": "Lamppost with Yellow Light",
    "category": "Furniture",
    "materials": [
      "3 Iron Ingot",
      "1 Glass",
      "1 Topaz"
    ]
  },
  {
    "name": "Left Signpost",
    "category": "Furniture",
    "materials": [
      "5 Hard Wood",
      "1 Iron Ingot"
    ]
  },
  {
    "name": "Low Sculpted Pillar",
    "category": "Furniture",
    "materials": [
      "25 Soil",
      "50 Stone 15 Clay"
    ]
  },
  {
    "name": "Mailbox",
    "category": "Furniture",
    "materials": [
      "4 Hard Wood",
      "2 Stone",
      "2 Iron Ingot"
    ]
  },
  {
    "name": "Map",
    "category": "Furniture",
    "materials": [
      "Dark Wood",
      "2 Gold Nugget",
      "8 Fabric"
    ]
  },
  {
    "name": "Mossy Circle-Carving Stone",
    "category": "Furniture",
    "materials": [
      "25 Soil",
      "50 Stone",
      "15 Clay"
    ]
  },
  {
    "name": "Mossy Eye-Carving Stone",
    "category": "Furniture",
    "materials": [
      "25 Soil",
      "50 Stone",
      "15 Clay"
    ]
  },
  {
    "name": "Mossy Fallen Pillar",
    "category": "Furniture",
    "materials": [
      "25 Soil",
      "50 Stone",
      "15 Clay"
    ]
  },
  {
    "name": "Nasturtium and Marsh Milkweed Pot",
    "category": "Furniture",
    "materials": [
      "1 Flower Pot",
      "1 Yellow Nasturtium",
      "1 Purple Marsh Milkweed"
    ]
  },
  {
    "name": "Nautical Themed Couch",
    "category": "Furniture",
    "materials": [
      "10 Dark Wood",
      "10 Iron Ingot",
      "2 Rope",
      "15 Tinkering Parts",
      "10 Fabric"
    ]
  },
  {
    "name": "Old Barrel",
    "category": "Furniture",
    "materials": [
      "5 Dark Wood",
      "1 Iron Ingot"
    ]
  },
  {
    "name": "Outhouse",
    "category": "Furniture",
    "materials": [
      "20 Soft Wood",
      "20 Hard Wood",
      "10 Soil",
      "3 Iron Ingot"
    ]
  },
  {
    "name": "Painted Wood Table Pot",
    "category": "Furniture",
    "materials": [
      "10 Dry Wood",
      "5 Blue Passion Lily",
      "1 Orange Houseleek",
      "1 White Passion Lily"
    ]
  },
  {
    "name": "Pink and Blue Flower Disk",
    "category": "Furniture",
    "materials": [
      "1 Round Soil Area",
      "2 Purple Impatiens",
      "2 Blue Star Lily",
      "1 Pink Bromelia"
    ]
  },
  {
    "name": "Pink, Blue, and Purple Flower Rectangle",
    "category": "Furniture",
    "materials": [
      "1 Rectangular Soil Area",
      "1 Pink Houseleek",
      "2 Blue Marsh Milkweed",
      "2 Purple Impatiens"
    ]
  },
  {
    "name": "Pink, Red, and Purple Flower Rectangle",
    "category": "Furniture",
    "materials": [
      "1 Rectangular Soil Area",
      "2 Purple Hydrangea",
      "3 Red Bell Flower",
      "3 Orange Marsh Milkweed"
    ]
  },
  {
    "name": "Pink, Yellow, and Black Flower Disk",
    "category": "Furniture",
    "materials": [
      "1 Round Soil Area",
      "1 Pink Houseleek",
      "2 Orange Star Lily",
      "1 Red Nasturtium"
    ]
  },
  {
    "name": "Pink, Yellow, and Blue Balloon Arch",
    "category": "Furniture",
    "materials": [
      "20 Pink Bromeliad",
      "20 Blue Falling Penstemon",
      "20 Yellow Bromeliad"
    ]
  },
  {
    "name": "Pink, Yellow, and Blue Balloon Cluster",
    "category": "Furniture",
    "materials": [
      "5 Iron Ingot",
      "8 Pink Bromeliad",
      "8 Blue Falling Penstemon",
      "8 Yellow Bromeliad"
    ]
  },
  {
    "name": "Purple Egg Lamppost",
    "category": "Furniture",
    "materials": [
      "5 Fishy Green Egg",
      "1 Amethyst",
      "1 Glass",
      "2 Gold Ingot",
      "1 Stone"
    ]
  },
  {
    "name": "Purple Wrought Iron Streetlamp",
    "category": "Furniture",
    "materials": [
      "5 Iron Ingot",
      "2 Glass Shard",
      "1 Amethyst"
    ]
  },
  {
    "name": "Purple, Pink, and Yellow Flower Disk",
    "category": "Furniture",
    "materials": [
      "1 Round Soil Area",
      "2 Pink Hydrangea",
      "2 Purple Bell Flower",
      "1 Yellow Daisy"
    ]
  },
  {
    "name": "Rectangular Soil Area",
    "category": "Furniture",
    "materials": [
      "8 Stone",
      "8 Soil"
    ]
  },
  {
    "name": "Red and Black Passion Lily Pot",
    "category": "Furniture",
    "materials": [
      "1 Flower Pot",
      "1 Red Passion Lily",
      "1 Black Passion Lily"
    ]
  },
  {
    "name": "Red Egg Lamppost",
    "category": "Furniture",
    "materials": [
      "5 Fishy Green Egg",
      "1 Ruby",
      "1 Glass",
      "2 Gold Ingot",
      "1 Stone"
    ]
  },
  {
    "name": "Red and Yellow Flower Disk",
    "category": "Furniture",
    "materials": [
      "2 Dandelion",
      "1 White Daisy",
      "2 Red Falling Panstemon"
    ]
  },
  {
    "name": "Red Light High Beach Torch",
    "category": "Furniture",
    "materials": [
      "5 Soft Wood",
      "5 Fiber",
      "3 Sand",
      "1 Garnet"
    ]
  },
  {
    "name": "Red, Blue, and Green Flower Rectangle",
    "category": "Furniture",
    "materials": [
      "1 Rectangular Soil Area",
      "2 Green Passion Lily",
      "2 Blue Falling Penstemon",
      "4 Red Nasturtium"
    ]
  },
  {
    "name": "Red, White, and Purple Flower Rectangle",
    "category": "Furniture",
    "materials": [
      "1 Rectangular Soil Area",
      "2 Red Bromeliad",
      "2 White Impatiens",
      "2 Purple Rising Penstemon"
    ]
  },
  {
    "name": "Red, Yellow, and Black Balloon Cluster",
    "category": "Furniture",
    "materials": [
      "5 Iron Ingot",
      "8 Yellow Nasturtium",
      "8 Red Nasturtium",
      "8 Black Passion Lily"
    ]
  },
  {
    "name": "Refreshment Chest",
    "category": "Furniture",
    "materials": [
      "15 Dark Wood",
      "10 Iron Ingot",
      "2 Gold Nuggets"
    ]
  },
  {
    "name": "Right Signpost",
    "category": "Furniture",
    "materials": [
      "5 Hard Wood",
      "1 Iron Ingot"
    ]
  },
  {
    "name": "Round Blue Three-Pronged",
    "category": "Furniture",
    "materials": [
      "4 Iron Ingots",
      "3 Glass",
      "3 Amethyst"
    ]
  },
  {
    "name": "Round Lamppost with Blue Light",
    "category": "Furniture",
    "materials": [
      "3 Iron Ingot",
      "1 Glass 1 Amethyst"
    ]
  },
  {
    "name": "Round Lamppost with Orange Light",
    "category": "Furniture",
    "materials": [
      "3 Iron Ingot",
      "1 Glass",
      "1 Citrine"
    ]
  },
  {
    "name": "Round Lamppost with Pink Light",
    "category": "Furniture",
    "materials": [
      "3 Iron Ingot",
      "1 Glass",
      "1 Tourmaline"
    ]
  },
  {
    "name": "Round Lamppost with White Light",
    "category": "Furniture",
    "materials": [
      "3 Iron Ingot",
      "1 Glass",
      "1 Diamond"
    ]
  },
  {
    "name": "Round Orange Three- Pronged Lamppost",
    "category": "Furniture",
    "materials": [
      "4 Iron Ingot",
      "3 Glass",
      "3 Citrine"
    ]
  },
  {
    "name": "Round Pink Three- ProngedLamppost",
    "category": "Furniture",
    "materials": [
      "4 Iron Ingot",
      "3 Glass",
      "3 Tourmaline"
    ]
  },
  {
    "name": "Round Soil Area",
    "category": "Furniture",
    "materials": [
      "5 Stone",
      "5 Soil"
    ]
  },
  {
    "name": "Round White Three- Pronged Lamppost",
    "category": "Furniture",
    "materials": [
      "4 Iron Ingot",
      "3 Glass",
      "3 Diamond"
    ]
  },
  {
    "name": "Rustic Clock Tower",
    "category": "Furniture",
    "materials": [
      "100 Stone",
      "100 Hard Wood",
      "30 Iron Ingot",
      "200 Clay"
    ]
  },
  {
    "name": "Rustic Wooden Case",
    "category": "Furniture",
    "materials": [
      "Wood"
    ]
  },
  {
    "name": "Sack",
    "category": "Furniture",
    "materials": [
      "15 Fiber",
      "5 Soil"
    ]
  },
  {
    "name": "Scrooge McDuck's Store Sign",
    "category": "Furniture",
    "materials": [
      "Wood"
    ]
  },
  {
    "name": "Ship Coffee Table",
    "category": "Furniture",
    "materials": [
      "10 Dark Wood",
      "10 Iron Ingot",
      "15 Tinkering Parts"
    ]
  },
  {
    "name": "Short Birdhouse",
    "category": "Furniture",
    "materials": [
      "8 Soft Wood",
      "3 Yellow Bromeliad Pink Hydrangea"
    ]
  },
  {
    "name": "Snow Kid",
    "category": "Furniture",
    "materials": [
      "8 Snow Ball",
      "1 Carrot",
      "2 Fabric",
      "3 Pebbles"
    ]
  },
  {
    "name": "Snow Lady",
    "category": "Furniture",
    "materials": [
      "10 Snow Ball",
      "1 Carrot",
      "2 Fabric",
      "3 Pebbles"
    ]
  },
  {
    "name": "Stack of Firewood",
    "category": "Furniture",
    "materials": [
      "Wood"
    ]
  },
  {
    "name": "Stall",
    "category": "Furniture",
    "materials": [
      "20 Hard Wood",
      "3 Iron Ingot",
      "3 Fabric"
    ]
  },
  {
    "name": "Star Lily and Falling Penstemon Pot",
    "category": "Furniture",
    "materials": [
      "1 Flower Pot",
      "1 Blue Star Lily",
      "1 White and Pink Falling Penstemon"
    ]
  },
  {
    "name": "Stellar Blue DJ Booth",
    "category": "Furniture",
    "materials": [
      "100 Dry Wood",
      "50 Iron Ingot",
      "10 Blue Hydrangea"
    ]
  },
  {
    "name": "Stellar Pink DJ Booth",
    "category": "Furniture",
    "materials": [
      "100 Dry Wood",
      "50 Iron Ingot",
      "10 Pink Hydrangea"
    ]
  },
  {
    "name": "Stone Well",
    "category": "Furniture",
    "materials": [
      "20 Soft Wood",
      "50 Stone",
      "10 Fiber"
    ]
  },
  {
    "name": "Sturdy Chair",
    "category": "Furniture",
    "materials": [
      "Wood"
    ]
  },
  {
    "name": "Swimming Pool",
    "category": "Furniture",
    "materials": [
      "300 Stone",
      "50 Soft Wood",
      "10 White Daisy"
    ]
  },
  {
    "name": "Tall Birdhouse",
    "category": "Furniture",
    "materials": [
      "8 Soft Wood",
      "3 Blue Falling Penstemon",
      "3 White Daisy"
    ]
  },
  {
    "name": "Tool Rack Training Mannequin",
    "category": "Furniture",
    "materials": [
      "10 Dark Wood",
      "4 Iron Ingot",
      "3 Soil",
      "5 Hardwood",
      "3 Red Bell Flower"
    ]
  },
  {
    "name": "Trellis",
    "category": "Furniture",
    "materials": [
      "3 Red Falling Penstemon",
      "10 Soft Wood",
      "3 Soil",
      "2 White and Pink Falling Penstemon"
    ]
  },
  {
    "name": "Trellis Arch",
    "category": "Furniture",
    "materials": [
      "15 Soft Wood",
      "3 Soil",
      "3 White and Pink Falling Penstemon"
    ]
  },
  {
    "name": "White, Red, and Purple Flower Disk",
    "category": "Furniture",
    "materials": [
      "1 Round Soil Area",
      "2 White Impatiens",
      "2 Purple Rising Penstemon",
      "3 Orange and Red Marsh Milkweed"
    ]
  },
  {
    "name": "Wide Arched Window",
    "category": "Furniture",
    "materials": [
      "20 Dark Wood",
      "12 Glass",
      "10 Gold Nugget"
    ]
  },
  {
    "name": "Wooden Bucket",
    "category": "Furniture",
    "materials": [
      "3 Soft Wood",
      "1 Iron Ingot"
    ]
  },
  {
    "name": "Wooden Lamppost with Yellow Light",
    "category": "Furniture",
    "materials": [
      "4 Dry Wood",
      "1 Glass",
      "2 Iron Ingot",
      "1 Topaz"
    ]
  },
  {
    "name": "Wooden Table",
    "category": "Furniture",
    "materials": [
      "20 Soft Wood",
      "2 Fabric"
    ]
  },
  {
    "name": "Wrought Iron Arch",
    "category": "Furniture",
    "materials": [
      "10 Iron Ingot",
      "4 Fabric"
    ]
  },
  {
    "name": "Yellow and White Flower Rectangle",
    "category": "Furniture",
    "materials": [
      "Area",
      "2 White Daisy",
      "1 Yellow Bromeliad",
      "3 Orange Star Lily"
    ]
  },
  {
    "name": "Yellow Light High Beach Torch",
    "category": "Furniture",
    "materials": [
      "5 Soft Wood",
      "5 Fiber",
      "3 Sand",
      "1 Topaz"
    ]
  },
  {
    "name": "Yellow Light Low Beach Torch",
    "category": "Furniture",
    "materials": [
      "5 Soft Wood",
      "5 Fiber",
      "3 Sand",
      "1 Topaz"
    ]
  },
  {
    "name": "Yellow Light Low Beach Torch",
    "category": "Furniture",
    "materials": [
      "5 Soft Wood",
      "5 Fiber",
      "3 Sand",
      "1 Garnet"
    ]
  },
  {
    "name": "Yellow, Black, and White Balloon Arch",
    "category": "Furniture",
    "materials": [
      "10 Iron Ingot",
      "20 Sunflower",
      "20 Black Passion Lily",
      "20 White Marsh Milkweed"
    ]
  },
  {
    "name": "Yellow, Green, and Purple Flower Rectangle",
    "category": "Furniture",
    "materials": [
      "2 Purple Falling Penstemon",
      "2 Dandelion",
      "2 Green Rising Penstemon"
    ]
  },
  {
    "name": "Shadowy Demon Snippet",
    "category": "Refined Materials",
    "materials": [
      "1x White Snippet"
    ]
  },
  {
    "name": "Fountain",
    "category": "Furniture",
    "materials": [
      "50 Stone",
      "20 Pebbles",
      "10 Gold Ingot"
    ]
  },
  {
    "name": "Sunflower and Daisy Pot",
    "category": "Furniture",
    "materials": [
      "1 Flower Pot",
      "2 Yellow Daisy",
      "1 Sunflower"
    ]
  }
];

// Fish, Gems & Minerals, and Vendor Ware tables — pending PDF-sourced reference data.
// Shapes:
//   KNOWN_FISH:         { name, zones: [string, ...], rarity }
//   KNOWN_GEMS:         { name, color, zones: [string, ...] }
//   KNOWN_VENDOR_ITEMS: { vendor, name, price }
const KNOWN_CROPS = [
  {
    "name": "Asparagus",
    "ingredientType": "Vegetables",
    "zones": [
      "Frosted Heights"
    ],
    "growTime": "2h 15min",
    "waterings": "2",
    "yield": "3",
    "seedPrice": "150",
    "sellPrice": "133",
    "profit": "249",
    "coinsPerMin": "1.84"
  },
  {
    "name": "Barley",
    "ingredientType": "Grains",
    "zones": [
      "The Bind"
    ],
    "growTime": "15min",
    "waterings": null,
    "yield": "1",
    "seedPrice": "15",
    "sellPrice": "15",
    "profit": "0",
    "coinsPerMin": "0"
  },
  {
    "name": "Beans Oil",
    "ingredientType": "Dairy and",
    "zones": [
      "Glittering Dunes"
    ],
    "growTime": "1h",
    "waterings": "1",
    "yield": "3",
    "seedPrice": "50",
    "sellPrice": "49",
    "profit": "97",
    "coinsPerMin": "1.62"
  },
  {
    "name": "Beetroot",
    "ingredientType": "Vegetables",
    "zones": [
      "Wishblossom Ranch",
      "Wishing Way"
    ],
    "growTime": "5min",
    "waterings": null,
    "yield": "1",
    "seedPrice": "10",
    "sellPrice": "21",
    "profit": "11",
    "coinsPerMin": "2.2"
  },
  {
    "name": "Bell Pepper",
    "ingredientType": "Vegetables",
    "zones": [
      "Forest of Valor"
    ],
    "growTime": "15min",
    "waterings": "1",
    "yield": "1",
    "seedPrice": "12",
    "sellPrice": "33",
    "profit": "21",
    "coinsPerMin": "1.4"
  },
  {
    "name": "Black Pepper",
    "ingredientType": "Spices",
    "zones": [
      "Mythopia"
    ],
    "growTime": "1hr 30min",
    "waterings": null,
    "yield": "1",
    "seedPrice": "70",
    "sellPrice": "83",
    "profit": "13",
    "coinsPerMin": "0.14"
  },
  {
    "name": "Broccoli",
    "ingredientType": "Vegetables",
    "zones": [
      "Glittering Dunes"
    ],
    "growTime": "40min",
    "waterings": "2",
    "yield": "1",
    "seedPrice": "60",
    "sellPrice": "152",
    "profit": "92",
    "coinsPerMin": "2.3"
  },
  {
    "name": "Cabbage",
    "ingredientType": "Vegetables",
    "zones": [
      "Wild Tangle"
    ],
    "growTime": "1h",
    "waterings": "2",
    "yield": "1",
    "seedPrice": "150",
    "sellPrice": "256",
    "profit": "106",
    "coinsPerMin": "1.77"
  },
  {
    "name": "Canola Oil",
    "ingredientType": "Dairy and",
    "zones": [
      "Forest of Valor"
    ],
    "growTime": "35min",
    "waterings": "4",
    "yield": "1",
    "seedPrice": "25",
    "sellPrice": "109",
    "profit": "84",
    "coinsPerMin": "2.4"
  },
  {
    "name": "Carrot",
    "ingredientType": "Vegetables",
    "zones": [
      "Peaceful Meadow"
    ],
    "growTime": "15min",
    "waterings": "1",
    "yield": "1",
    "seedPrice": "10",
    "sellPrice": "44",
    "profit": "34",
    "coinsPerMin": "2.27"
  },
  {
    "name": "Cauliflower",
    "ingredientType": "Vegetables",
    "zones": [
      "The Bind"
    ],
    "growTime": "10min",
    "waterings": null,
    "yield": "1",
    "seedPrice": "10",
    "sellPrice": "25",
    "profit": "15",
    "coinsPerMin": "1.5"
  },
  {
    "name": "Celery",
    "ingredientType": "Vegetables",
    "zones": [
      "Ancient's Landing"
    ],
    "growTime": "10min",
    "waterings": "1",
    "yield": "1",
    "seedPrice": "20",
    "sellPrice": "65",
    "profit": "45",
    "coinsPerMin": "4.5"
  },
  {
    "name": "Chia Seeds Oil",
    "ingredientType": "Dairy and",
    "zones": [
      "The Bind"
    ],
    "growTime": "5min",
    "waterings": null,
    "yield": "1",
    "seedPrice": "5",
    "sellPrice": "6",
    "profit": "1",
    "coinsPerMin": "0.2"
  },
  {
    "name": "Chili Pepper",
    "ingredientType": "Vegetables",
    "zones": [
      "Sunlit Plateau"
    ],
    "growTime": "45min",
    "waterings": "1",
    "yield": "1",
    "seedPrice": "20",
    "sellPrice": "78",
    "profit": "58",
    "coinsPerMin": "1.29"
  },
  {
    "name": "Corn",
    "ingredientType": "Grains",
    "zones": [
      "Dazzle Beach"
    ],
    "growTime": "12min",
    "waterings": "1",
    "yield": "2",
    "seedPrice": "15",
    "sellPrice": "16",
    "profit": "17",
    "coinsPerMin": "1.42"
  },
  {
    "name": "Cosmic Figs",
    "ingredientType": "Fruit",
    "zones": [
      "Ancient's Landing"
    ],
    "growTime": "25min",
    "waterings": "2",
    "yield": "2",
    "seedPrice": "10",
    "sellPrice": "22",
    "profit": "34",
    "coinsPerMin": "1.36"
  },
  {
    "name": "Cotton Materials",
    "ingredientType": "Crafting",
    "zones": [
      "Sunlit Plateau"
    ],
    "growTime": "25min",
    "waterings": "4",
    "yield": "1",
    "seedPrice": "42",
    "sellPrice": "37",
    "profit": null,
    "coinsPerMin": null
  },
  {
    "name": "Cucumber",
    "ingredientType": "Vegetables",
    "zones": [
      "Frosted Heights"
    ],
    "growTime": "1h 15min",
    "waterings": "1",
    "yield": "1",
    "seedPrice": "40",
    "sellPrice": "159",
    "profit": "119",
    "coinsPerMin": "1.59"
  },
  {
    "name": "Dark Chocolate Coffee Beans",
    "ingredientType": "Fruit",
    "zones": [
      "Wishblossom Ranch",
      "Wishing Way"
    ],
    "growTime": "30min",
    "waterings": null,
    "yield": "2",
    "seedPrice": "60",
    "sellPrice": "66",
    "profit": "72",
    "coinsPerMin": "2.4"
  },
  {
    "name": "Dill",
    "ingredientType": "Spices",
    "zones": [
      "Wishing Alps"
    ],
    "growTime": "2min",
    "waterings": "1",
    "yield": null,
    "seedPrice": null,
    "sellPrice": "40",
    "profit": "40",
    "coinsPerMin": "20"
  },
  {
    "name": "Eggplant",
    "ingredientType": "Vegetables",
    "zones": [
      "Frosted Heights"
    ],
    "growTime": "3h",
    "waterings": "2",
    "yield": "1",
    "seedPrice": "95",
    "sellPrice": "308",
    "profit": "213",
    "coinsPerMin": "1.18"
  },
  {
    "name": "Faerie Rye",
    "ingredientType": "Grains",
    "zones": [
      "Everafter"
    ],
    "growTime": "1hr 15min",
    "waterings": null,
    "yield": "1",
    "seedPrice": "60",
    "sellPrice": "62",
    "profit": "2",
    "coinsPerMin": "0.03"
  },
  {
    "name": "Fairy Kamut",
    "ingredientType": "Grains",
    "zones": [
      "Sundae Shores"
    ],
    "growTime": "50min",
    "waterings": null,
    "yield": "3",
    "seedPrice": "200",
    "sellPrice": "107",
    "profit": "121",
    "coinsPerMin": "2.42"
  },
  {
    "name": "Fairy Sprinkles",
    "ingredientType": "Spices",
    "zones": [
      "Pixie Acres"
    ],
    "growTime": "2min",
    "waterings": "1",
    "yield": null,
    "seedPrice": null,
    "sellPrice": "80",
    "profit": "80",
    "coinsPerMin": "40"
  },
  {
    "name": "Flute Root",
    "ingredientType": "Vegetables",
    "zones": [
      "Glittering Dunes"
    ],
    "growTime": "1h 15min",
    "waterings": "2",
    "yield": "2",
    "seedPrice": "70",
    "sellPrice": "112",
    "profit": "154",
    "coinsPerMin": "2.05"
  },
  {
    "name": "Grapes",
    "ingredientType": "Fruit",
    "zones": [
      "Ancient's Landing"
    ],
    "growTime": "20min",
    "waterings": "1",
    "yield": "3",
    "seedPrice": "5",
    "sellPrice": "9",
    "profit": "22",
    "coinsPerMin": "1.1"
  },
  {
    "name": "Green Beans",
    "ingredientType": "Vegetables",
    "zones": [
      "Everafter"
    ],
    "growTime": "4hr",
    "waterings": null,
    "yield": "1",
    "seedPrice": "250",
    "sellPrice": "209",
    "profit": null,
    "coinsPerMin": null
  },
  {
    "name": "Honeydew Melon",
    "ingredientType": "Fruit",
    "zones": [
      "Mythopia"
    ],
    "growTime": "45min",
    "waterings": null,
    "yield": "1",
    "seedPrice": "40",
    "sellPrice": "125",
    "profit": "85",
    "coinsPerMin": "1.89"
  },
  {
    "name": "Leek",
    "ingredientType": "Vegetables",
    "zones": [
      "Forgotten Lands"
    ],
    "growTime": "2h",
    "waterings": "2",
    "yield": "1",
    "seedPrice": "120",
    "sellPrice": "309",
    "profit": "189",
    "coinsPerMin": "1.58"
  },
  {
    "name": "Lettuce",
    "ingredientType": "Vegetables",
    "zones": [
      "Peaceful Meadow"
    ],
    "growTime": "3min",
    "waterings": "1",
    "yield": "1",
    "seedPrice": "3",
    "sellPrice": "8",
    "profit": "5",
    "coinsPerMin": "1.67"
  },
  {
    "name": "Lollipop Fruit",
    "ingredientType": "Fruit",
    "zones": [
      "Sundae Shores"
    ],
    "growTime": "40min",
    "waterings": null,
    "yield": "2",
    "seedPrice": "175",
    "sellPrice": "115",
    "profit": "55",
    "coinsPerMin": "1.37"
  },
  {
    "name": "Melon",
    "ingredientType": "Fruit",
    "zones": [
      "Glittering Dunes"
    ],
    "growTime": "30min",
    "waterings": "1",
    "yield": "1",
    "seedPrice": "40",
    "sellPrice": "93",
    "profit": "53",
    "coinsPerMin": "1.77"
  },
  {
    "name": "Oats",
    "ingredientType": "Grains",
    "zones": [
      "Everafter"
    ],
    "growTime": "2hr",
    "waterings": null,
    "yield": "1",
    "seedPrice": "150",
    "sellPrice": "99",
    "profit": null,
    "coinsPerMin": null
  },
  {
    "name": "Okra",
    "ingredientType": "Vegetables",
    "zones": [
      "Glade of Trust"
    ],
    "growTime": "2h",
    "waterings": "1",
    "yield": "3",
    "seedPrice": "135",
    "sellPrice": "114",
    "profit": "207",
    "coinsPerMin": "1.72"
  },
  {
    "name": "Onion",
    "ingredientType": "Vegetables",
    "zones": [
      "Forest of Valor"
    ],
    "growTime": "1h 15min",
    "waterings": "3",
    "yield": "1",
    "seedPrice": "50",
    "sellPrice": "170",
    "profit": "120",
    "coinsPerMin": "1.6"
  },
  {
    "name": "Pearly Barley",
    "ingredientType": "Grains",
    "zones": [
      "Wishblossom Ranch",
      "Wishing Way"
    ],
    "growTime": "20min",
    "waterings": null,
    "yield": "2",
    "seedPrice": "50",
    "sellPrice": "45",
    "profit": "40",
    "coinsPerMin": "2"
  },
  {
    "name": "Pineapple",
    "ingredientType": "Fruit",
    "zones": [
      "Wild Tangle"
    ],
    "growTime": "3h",
    "waterings": "3",
    "yield": "1",
    "seedPrice": "200",
    "sellPrice": "532",
    "profit": "332",
    "coinsPerMin": "1.84"
  },
  {
    "name": "Potato",
    "ingredientType": "Vegetables",
    "zones": [
      "Forgotten Lands"
    ],
    "growTime": "35min",
    "waterings": "3",
    "yield": "1",
    "seedPrice": "55",
    "sellPrice": "126",
    "profit": "71",
    "coinsPerMin": "2.03"
  },
  {
    "name": "Pumpkin",
    "ingredientType": "Vegetables",
    "zones": [
      "Forgotten Lands"
    ],
    "growTime": "4h",
    "waterings": "2",
    "yield": "1",
    "seedPrice": "275",
    "sellPrice": "664",
    "profit": "389",
    "coinsPerMin": "1.62"
  },
  {
    "name": "Radicchio",
    "ingredientType": "Vegetables",
    "zones": [
      "Mythopia"
    ],
    "growTime": "1hr",
    "waterings": null,
    "yield": "1",
    "seedPrice": "50",
    "sellPrice": "127",
    "profit": "77",
    "coinsPerMin": "1.28"
  },
  {
    "name": "Radish",
    "ingredientType": "Vegetables",
    "zones": [
      "Everafter"
    ],
    "growTime": "1hr 45min",
    "waterings": null,
    "yield": "1",
    "seedPrice": "100",
    "sellPrice": "133",
    "profit": "33",
    "coinsPerMin": "0.31"
  },
  {
    "name": "Rice",
    "ingredientType": "Grains",
    "zones": [
      "Glade of Trust"
    ],
    "growTime": "50min",
    "waterings": "2",
    "yield": "2",
    "seedPrice": "35",
    "sellPrice": "61",
    "profit": "87",
    "coinsPerMin": "1.74"
  },
  {
    "name": "Ring Squash",
    "ingredientType": "Vegetables",
    "zones": [
      "The Bind"
    ],
    "growTime": "30min",
    "waterings": null,
    "yield": "1",
    "seedPrice": "20",
    "sellPrice": "41",
    "profit": "21",
    "coinsPerMin": "0.7"
  },
  {
    "name": "Rhubarb",
    "ingredientType": "Fruit",
    "zones": [
      "Everafter"
    ],
    "growTime": "3hr",
    "waterings": null,
    "yield": "1",
    "seedPrice": "200",
    "sellPrice": "229",
    "profit": "29",
    "coinsPerMin": "0.16"
  },
  {
    "name": "Ruby Lentils Oil",
    "ingredientType": "Dairy and",
    "zones": [
      "Wild Tangle"
    ],
    "growTime": "2h",
    "waterings": "1",
    "yield": "3",
    "seedPrice": "250",
    "sellPrice": "156",
    "profit": "218",
    "coinsPerMin": "1.82"
  },
  {
    "name": "Scarlet Kale",
    "ingredientType": "Vegetables",
    "zones": [
      "Wishblossom Ranch",
      "Wishing Way"
    ],
    "growTime": "10min",
    "waterings": null,
    "yield": "2",
    "seedPrice": "15",
    "sellPrice": "29",
    "profit": "44",
    "coinsPerMin": "4.4"
  },
  {
    "name": "Soya Oil",
    "ingredientType": "Dairy and",
    "zones": [
      "Sunlit Plateau"
    ],
    "growTime": "1h 30min",
    "waterings": "2",
    "yield": "3",
    "seedPrice": "60",
    "sellPrice": "69",
    "profit": "147",
    "coinsPerMin": "1.63"
  },
  {
    "name": "Spinach",
    "ingredientType": "Vegetables",
    "zones": [
      "Glade of Trust"
    ],
    "growTime": "60min",
    "waterings": "2",
    "yield": "3",
    "seedPrice": "45",
    "sellPrice": "41",
    "profit": "78",
    "coinsPerMin": "1.3"
  },
  {
    "name": "Sugarcane",
    "ingredientType": "Sweets",
    "zones": [
      "Dazzle Beach"
    ],
    "growTime": "7min",
    "waterings": "1",
    "yield": "1",
    "seedPrice": "5",
    "sellPrice": "19",
    "profit": "14",
    "coinsPerMin": "2"
  },
  {
    "name": "Tomato",
    "ingredientType": "Vegetables",
    "zones": [
      "Dazzle Beach"
    ],
    "growTime": "25min",
    "waterings": "2",
    "yield": "3",
    "seedPrice": "8",
    "sellPrice": "22",
    "profit": "58",
    "coinsPerMin": "2.32"
  },
  {
    "name": "Turnip",
    "ingredientType": "Vegetables",
    "zones": [
      "Wild Tangle"
    ],
    "growTime": "4h",
    "waterings": "1",
    "yield": "2",
    "seedPrice": "100",
    "sellPrice": "187",
    "profit": "274",
    "coinsPerMin": "1.15"
  },
  {
    "name": "Wheat",
    "ingredientType": "Grains",
    "zones": [
      "Peaceful Meadow"
    ],
    "growTime": "1min",
    "waterings": "1",
    "yield": "2",
    "seedPrice": "1",
    "sellPrice": "2",
    "profit": "3",
    "coinsPerMin": "3"
  },
  {
    "name": "Yam",
    "ingredientType": "Vegetables",
    "zones": [
      "Ancient's Landing"
    ],
    "growTime": "15min",
    "waterings": "2",
    "yield": "1",
    "seedPrice": "15",
    "sellPrice": "36",
    "profit": "21",
    "coinsPerMin": "1.4"
  },
  {
    "name": "Zucchini",
    "ingredientType": "Vegetables",
    "zones": [
      "Sunlit Plateau"
    ],
    "growTime": "40min",
    "waterings": "2",
    "yield": "2",
    "seedPrice": "30",
    "sellPrice": "52",
    "profit": "74",
    "coinsPerMin": "1.85"
  },
  {
    "name": "Time Crops",
    "ingredientType": null,
    "zones": [],
    "growTime": null,
    "waterings": null,
    "yield": null,
    "seedPrice": null,
    "sellPrice": null,
    "profit": null,
    "coinsPerMin": null
  }
];

const KNOWN_FISH = [
  {
    "name": "Acorn Snail",
    "sellPrice": "75",
    "energy": "300",
    "ripples": "White",
    "zones": [
      "Honeyglow Woods"
    ],
    "ingredientCategory": "Dairy and Oil",
    "notes": null
  },
  {
    "name": "Anglerfish",
    "sellPrice": "1,500",
    "energy": "2,000",
    "ripples": "Gold",
    "zones": [
      "Forgotten Lands",
      "Peaceful Meadow"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Bass",
    "sellPrice": "25",
    "energy": "150",
    "ripples": "None or White",
    "zones": [
      "Forest of Valor",
      "Sunlit Plateau",
      "Frosted Heights",
      "Oasis"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Bream",
    "sellPrice": "280",
    "energy": "700",
    "ripples": "Blue",
    "zones": [
      "Wild Tangle",
      "Peaceful Meadow"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Brilliant Blue Starfish",
    "sellPrice": "875",
    "energy": "1,650",
    "ripples": "Gold",
    "zones": [
      "The Oasis"
    ],
    "ingredientCategory": "Seafood",
    "notes": null
  },
  {
    "name": "Carp",
    "sellPrice": "400",
    "energy": "800",
    "ripples": "Blue, can be White",
    "zones": [
      "Forest of Valor",
      "Sunlit Plateau"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Catfish",
    "sellPrice": "550",
    "energy": "1,200",
    "ripples": "Gold",
    "zones": [
      "Peaceful Meadow",
      "Dazzle Beach"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Cod",
    "sellPrice": "35",
    "energy": "150",
    "ripples": "None or White",
    "zones": [
      "Forgotten Lands",
      "Glade of Trust",
      "The Docks",
      "The Overlook",
      "Everafter"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Crab",
    "sellPrice": "600",
    "energy": "1,200",
    "ripples": "Blue, can be White",
    "zones": [
      "Glamour Gulch",
      "Frosted Heights",
      "Wishing Alps"
    ],
    "ingredientCategory": "Seafood",
    "notes": null
  },
  {
    "name": "Dunebopper",
    "sellPrice": "550",
    "energy": "1,100",
    "ripples": "Blue",
    "zones": [
      "The Oasis"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Electric Eel",
    "sellPrice": "1,025",
    "energy": "1,550",
    "ripples": "Gold",
    "zones": [
      "The Promenade"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Flying Fish",
    "sellPrice": "60",
    "energy": "150",
    "ripples": "None, can be White",
    "zones": [
      "Mythopia"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Fugu",
    "sellPrice": "900",
    "energy": "1,700",
    "ripples": "Gold",
    "zones": [
      "Dazzle Beach",
      "Peaceful Meadow"
    ],
    "ingredientCategory": "Fish Requires",
    "notes": "rain"
  },
  {
    "name": "Here and There Fish",
    "sellPrice": "2,000",
    "energy": "1,000",
    "ripples": "None, can be White",
    "zones": [
      "Dazzle Beach",
      "Glade of Trust",
      "Forest of Valor",
      "Sunlit Plateau",
      "Frosted Heights"
    ],
    "ingredientCategory": "Requires (6-10am) (6-10pm) Fish completing and There Again",
    "notes": "morning or evening after Here and Back"
  },
  {
    "name": "Herring",
    "sellPrice": "65",
    "energy": "250",
    "ripples": "White",
    "zones": [
      "Forgotten Lands",
      "Dazzle Beach",
      "Glade of Trust"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Hippocampus",
    "sellPrice": "800",
    "energy": "500",
    "ripples": "White, can be Blue",
    "zones": [
      "Mythopia"
    ],
    "ingredientCategory": "Seafood",
    "notes": null
  },
  {
    "name": "Jellied Fish",
    "sellPrice": "1,000",
    "energy": "1,500",
    "ripples": "Gold",
    "zones": [
      "Glamour Gulch"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Kingfish",
    "sellPrice": "450",
    "energy": "800",
    "ripples": "Blue",
    "zones": [
      "Dazzle Beach"
    ],
    "ingredientCategory": "Requires Fish (6pm-5am)",
    "notes": "night"
  },
  {
    "name": "Koi",
    "sellPrice": "50",
    "energy": "150",
    "ripples": "None",
    "zones": [
      "The Bind"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Lancetfish",
    "sellPrice": "650",
    "energy": "1,300",
    "ripples": "Blue,can be White",
    "zones": [
      "Forgotten Lands"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Lamprey",
    "sellPrice": "1,500",
    "energy": "1,800",
    "ripples": "Gold",
    "zones": [
      "Everafter"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Lobster",
    "sellPrice": "950",
    "energy": "1,600",
    "ripples": "Gold",
    "zones": [
      "Glade of Trust"
    ],
    "ingredientCategory": "Seafood",
    "notes": null
  },
  {
    "name": "Measuring-Tape Snail",
    "sellPrice": null,
    "energy": null,
    "ripples": null,
    "zones": [
      "Glamour Gulch"
    ],
    "ingredientCategory": null,
    "notes": null
  },
  {
    "name": "Mountain Whitefish",
    "sellPrice": "30",
    "energy": "150",
    "ripples": "White, can be None",
    "zones": [
      "Wishing Alps"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Mussel",
    "sellPrice": "75",
    "energy": "150",
    "ripples": "None",
    "zones": [
      "Mythopia"
    ],
    "ingredientCategory": "Seafood",
    "notes": null
  },
  {
    "name": "Octopus",
    "sellPrice": "290",
    "energy": "700",
    "ripples": "Blue, can be White",
    "zones": [
      "The Docks",
      "The Overlook"
    ],
    "ingredientCategory": "Seafood",
    "notes": null
  },
  {
    "name": "Perch",
    "sellPrice": "80",
    "energy": "400",
    "ripples": "Blue, can be White",
    "zones": [
      "Forest of Valor",
      "Sunlit Plateau",
      "The Grove"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Pike",
    "sellPrice": "800",
    "energy": "1,500",
    "ripples": "Gold",
    "zones": [
      "The Lagoon",
      "Forest of Valor"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Piranha",
    "sellPrice": "1,300",
    "energy": "1,900",
    "ripples": "Gold",
    "zones": [
      "The Lagoon",
      "The Grasslands"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Pirarucu",
    "sellPrice": "625",
    "energy": "1,250",
    "ripples": "Blue",
    "zones": [
      "The Promenade",
      "The Grove"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Plush Fish",
    "sellPrice": "900",
    "energy": "1,400",
    "ripples": "Gold",
    "zones": [
      "The Lagoon",
      "Honeyglow Woods"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Pretty Pink Starfish",
    "sellPrice": "875",
    "energy": "1,500",
    "ripples": "Gold",
    "zones": [
      "The Oasis"
    ],
    "ingredientCategory": "Seafood",
    "notes": null
  },
  {
    "name": "Prisma Shrimp",
    "sellPrice": "1,100",
    "energy": "1,600",
    "ripples": "Gold",
    "zones": [
      "The Grove"
    ],
    "ingredientCategory": "Seafood",
    "notes": null
  },
  {
    "name": "Rainbow Trout",
    "sellPrice": "50",
    "energy": "300",
    "ripples": "White",
    "zones": [
      "Peaceful Meadow",
      "Forest of Valor"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Red Alpine Bass",
    "sellPrice": "750",
    "energy": "1,250",
    "ripples": "Gold",
    "zones": [
      "Everafter",
      "Wishing Alps"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Robot Fish",
    "sellPrice": "625",
    "energy": "1,350",
    "ripples": "Gold",
    "zones": [
      "The Overlook"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Salmon",
    "sellPrice": "150",
    "energy": "500",
    "ripples": "White, can be Blue",
    "zones": [
      "Frosted Heights",
      "Sunlit Plateau",
      "The Grasslands",
      "The Promenade"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Sand Fish",
    "sellPrice": "30",
    "energy": "150",
    "ripples": "None, can be White",
    "zones": [
      "The Plains",
      "The Wastes",
      "The Borderlands"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Sand Worm",
    "sellPrice": "800",
    "energy": "1,650",
    "ripples": "Gold",
    "zones": [
      "The Plains",
      "The Wastes",
      "The Borderlands"
    ],
    "ingredientCategory": "Dairy and Oil",
    "notes": null
  },
  {
    "name": "Satin-Finned Betta",
    "sellPrice": "450",
    "energy": "950",
    "ripples": "Blue",
    "zones": [
      "Glamour Gulch"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Scorpion",
    "sellPrice": "425",
    "energy": "900",
    "ripples": "Blue (Pink)",
    "zones": [
      "The Plains",
      "The Wastes",
      "The Borderlands"
    ],
    "ingredientCategory": "Dairy and Oil",
    "notes": null
  },
  {
    "name": "Sea Snail",
    "sellPrice": "250",
    "energy": "800",
    "ripples": "Blue, can be White",
    "zones": [
      "The Docks",
      "The Overlook"
    ],
    "ingredientCategory": "Seafood",
    "notes": null
  },
  {
    "name": "Sea Wolf",
    "sellPrice": "75",
    "energy": "300",
    "ripples": "White, can be Blue",
    "zones": [
      "The Bind"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Shad",
    "sellPrice": "60",
    "energy": "300",
    "ripples": "White",
    "zones": [
      "The Docks",
      "The Overlook"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Shrimp",
    "sellPrice": "300",
    "energy": "750",
    "ripples": "Blue, can be White",
    "zones": [
      "Dazzle Beach"
    ],
    "ingredientCategory": "Seafood",
    "notes": null
  },
  {
    "name": "Skeleton Fish",
    "sellPrice": "100",
    "energy": "500",
    "ripples": "White, can be Blue (Pink)",
    "zones": [
      "The Plains",
      "The Wastes",
      "The Borderlands"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Sole",
    "sellPrice": "200",
    "energy": "500",
    "ripples": "White, can be Blue",
    "zones": [
      "Forgotten Lands",
      "The Docks",
      "The Overlook"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Sorcerer Hat Hermit Crab",
    "sellPrice": "800",
    "energy": "1,500",
    "ripples": "Gold",
    "zones": [
      "The Bind"
    ],
    "ingredientCategory": "Seafood",
    "notes": null
  },
  {
    "name": "Squid",
    "sellPrice": "500",
    "energy": "1,000",
    "ripples": "Blue, can be White",
    "zones": [
      "Glade of Trust",
      "Forgotten Lands"
    ],
    "ingredientCategory": "Seafood",
    "notes": null
  },
  {
    "name": "Stygian Mudskipper",
    "sellPrice": "1,500",
    "energy": "1,800",
    "ripples": "Gold",
    "zones": [
      "Mythopia",
      "Mythopia"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Sweet Jelly",
    "sellPrice": "450",
    "energy": "900",
    "ripples": "Blue",
    "zones": [
      "Honeyglow Woods"
    ],
    "ingredientCategory": "Sweets",
    "notes": null
  },
  {
    "name": "Swordfish",
    "sellPrice": "700",
    "energy": "1,500",
    "ripples": "Gold",
    "zones": [
      "Dazzle Beach"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Tigger Fish",
    "sellPrice": "1,600",
    "energy": "1,600",
    "ripples": "Gold",
    "zones": [
      "Pixie Acres"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Tilapia",
    "sellPrice": "600",
    "energy": "1,150",
    "ripples": "Blue, can be White",
    "zones": [
      "Sunlit Plateau",
      "Frosted Heights",
      "Pixie Acres"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Tuna",
    "sellPrice": "95",
    "energy": "350",
    "ripples": "White, can be Blue",
    "zones": [
      "Forgotten Lands",
      "Glade of Trust",
      "The Bind",
      "Wishing Alps"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Walleye",
    "sellPrice": "1,100",
    "energy": "1,700",
    "ripples": "Gold",
    "zones": [
      "Sunlit Plateau"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "White Sturgeon",
    "sellPrice": "1,250",
    "energy": "1,800",
    "ripples": "Gold",
    "zones": [
      "Frosted Heights"
    ],
    "ingredientCategory": "Fish",
    "notes": null
  },
  {
    "name": "Festive Anglerfish",
    "sellPrice": null,
    "energy": null,
    "ripples": "+2,000",
    "zones": [
      "Forgotten Lands"
    ],
    "ingredientCategory": null,
    "notes": null
  },
  {
    "name": "[1] Festive Bass",
    "sellPrice": null,
    "energy": null,
    "ripples": "+150",
    "zones": [
      "Peaceful Meadow"
    ],
    "ingredientCategory": null,
    "notes": null
  },
  {
    "name": "[1][3] Festive Fugu",
    "sellPrice": null,
    "energy": null,
    "ripples": "+1,700",
    "zones": [
      "Dazzle Beach"
    ],
    "ingredientCategory": null,
    "notes": null
  },
  {
    "name": "[1] Festive Salmon",
    "sellPrice": null,
    "energy": null,
    "ripples": "+500",
    "zones": [
      "Sunlit Plateau"
    ],
    "ingredientCategory": null,
    "notes": null
  },
  {
    "name": "[1] Festive Squid",
    "sellPrice": null,
    "energy": null,
    "ripples": "+1,000",
    "zones": [
      "Glade of Trust"
    ],
    "ingredientCategory": null,
    "notes": null
  },
  {
    "name": "Fishy Green Egg",
    "sellPrice": null,
    "energy": null,
    "ripples": "+100",
    "zones": [
      "Dazzle Beach"
    ],
    "ingredientCategory": null,
    "notes": null
  },
  {
    "name": "available during night (6pm-5am) rain available during",
    "sellPrice": null,
    "energy": null,
    "ripples": null,
    "zones": [],
    "ingredientCategory": null,
    "notes": null
  },
  {
    "name": "Crystal 20",
    "sellPrice": null,
    "energy": "25",
    "ripples": "Everafter",
    "zones": [],
    "ingredientCategory": "Spices & Herbs",
    "notes": null
  },
  {
    "name": "20",
    "sellPrice": null,
    "energy": "25",
    "ripples": "Everywhere",
    "zones": [],
    "ingredientCategory": "Vegetables",
    "notes": null
  },
  {
    "name": "Materials",
    "sellPrice": null,
    "energy": null,
    "ripples": null,
    "zones": [],
    "ingredientCategory": null,
    "notes": null
  },
  {
    "name": "Festive Anglerfish",
    "sellPrice": null,
    "energy": "2,000",
    "ripples": "Red & Green",
    "zones": [
      "Forgotten Lands"
    ],
    "ingredientCategory": null,
    "notes": "Event-only (Gift of Giving); requires night (6pm-5am)"
  },
  {
    "name": "Festive Bass",
    "sellPrice": null,
    "energy": "150",
    "ripples": "Red & Green",
    "zones": [
      "Peaceful Meadow"
    ],
    "ingredientCategory": null,
    "notes": "Event-only (Gift of Giving)"
  },
  {
    "name": "Festive Fugu",
    "sellPrice": null,
    "energy": "1,700",
    "ripples": "Red & Green",
    "zones": [
      "Dazzle Beach"
    ],
    "ingredientCategory": null,
    "notes": "Event-only (Gift of Giving); requires rain"
  },
  {
    "name": "Festive Salmon",
    "sellPrice": null,
    "energy": "500",
    "ripples": "Red & Green",
    "zones": [
      "Sunlit Plateau"
    ],
    "ingredientCategory": null,
    "notes": "Event-only (Gift of Giving)"
  },
  {
    "name": "Festive Squid",
    "sellPrice": null,
    "energy": "1,000",
    "ripples": "Red & Green",
    "zones": [
      "Glade of Trust"
    ],
    "ingredientCategory": null,
    "notes": "Event-only (Gift of Giving)"
  },
  {
    "name": "Fishy Green Egg",
    "sellPrice": null,
    "energy": "100",
    "ripples": "Purple",
    "zones": [
      "Dazzle Beach"
    ],
    "ingredientCategory": null,
    "notes": "Event-only (Eggstravaganza)"
  }
];
const KNOWN_GEMS = [
  {
    "name": "Stone",
    "color": null,
    "sellPrice": "2",
    "zones": [
      "All Biomes"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Coal Ore",
    "color": null,
    "sellPrice": "5",
    "zones": [
      "All Biomes"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Iron Ore",
    "color": null,
    "sellPrice": "10",
    "zones": [
      "Forest of Valor",
      "Glade of Trust",
      "Sunlit Plateau",
      "Frosted Heights",
      "Forgotten Lands",
      "Vitalys Mine",
      "The Bind"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Gold Nugget",
    "color": null,
    "sellPrice": "20",
    "zones": [
      "Everafter",
      "Frosted Heights",
      "Sunlit Plateau",
      "Forgotten Lands",
      "Vitalys Mine",
      "Mythopia"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Crystal",
    "color": null,
    "sellPrice": "30",
    "zones": [
      "Forgotten Lands"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Copper",
    "color": null,
    "sellPrice": "15",
    "zones": [
      "Ancient's Landing",
      "Glittering Dunes",
      "Wild Tangle"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Quartz",
    "color": null,
    "sellPrice": "20",
    "zones": [
      "Ancient's Landing"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Tin",
    "color": null,
    "sellPrice": "25",
    "zones": [
      "Glittering Dunes"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Zinc",
    "color": null,
    "sellPrice": "30",
    "zones": [
      "Wild Tangle"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Petrified Wood",
    "color": null,
    "sellPrice": "20",
    "zones": [
      "The Bind",
      "Everafter"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Marble",
    "color": null,
    "sellPrice": "30",
    "zones": [
      "Mythopia"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Antique Clothes Iron",
    "color": null,
    "sellPrice": "20",
    "zones": [
      "Glamour Gulch"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Grassy Ore",
    "color": null,
    "sellPrice": "25",
    "zones": [
      "Pixie Acres"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Pixie Dust",
    "color": null,
    "sellPrice": "15",
    "zones": [
      "Glamour Gulch",
      "Pixie Acres"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Silver Ore",
    "color": null,
    "sellPrice": "2",
    "zones": [
      "Wishing Alps"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Amethyst",
    "color": "Purple",
    "shape": "Square",
    "sellPrice": "500 Coins",
    "zones": [
      "Forgotten Lands",
      "Frosted Heights"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Amethyst.png"
  },
  {
    "name": "Shiny Amethyst",
    "color": "Purple",
    "shape": "Square",
    "sellPrice": "2,000 Coins",
    "zones": [
      "Forgotten Lands",
      "Frosted Heights"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Amethyst.png"
  },
  {
    "name": "Aquamarine",
    "color": "Light Blue",
    "shape": "Oval",
    "sellPrice": "250 Coins",
    "zones": [
      "Dazzle Beach",
      "Forest of Valor"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Aquamarine.png"
  },
  {
    "name": "Shiny Aquamarine",
    "color": "Light Blue",
    "shape": "Oval",
    "sellPrice": "1,000 Coins",
    "zones": [
      "Dazzle Beach",
      "Forest of Valor"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Aquamarine.png"
  },
  {
    "name": "Citrine",
    "color": "Orange",
    "shape": "Oval",
    "sellPrice": "380 Coins",
    "zones": [
      "Sunlit Plateau",
      "Glade of Trust"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Citrine.png"
  },
  {
    "name": "Shiny Citrine",
    "color": "Orange",
    "shape": "Oval",
    "sellPrice": "1,500 Coins",
    "zones": [
      "Sunlit Plateau",
      "Glade of Trust"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Citrine.png"
  },
  {
    "name": "Diamond",
    "color": "White",
    "shape": "Diamond",
    "sellPrice": "600 Coins",
    "zones": [
      "Forgotten Lands"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Diamond.png"
  },
  {
    "name": "Shiny Diamond",
    "color": "White",
    "shape": "Diamond",
    "sellPrice": "2,400 Coins",
    "zones": [
      "Forgotten Lands"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Diamond.png"
  },
  {
    "name": "Emerald",
    "color": "Green",
    "shape": "Square",
    "sellPrice": "325 Coins",
    "zones": [
      "Forest of Valor",
      "Glade of Trust"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Emerald.png"
  },
  {
    "name": "Shiny Emerald",
    "color": "Green",
    "shape": "Square",
    "sellPrice": "1,300 Coins",
    "zones": [
      "Forest of Valor",
      "Glade of Trust"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Emerald.png"
  },
  {
    "name": "Garnet",
    "color": "Red",
    "shape": "Oval",
    "sellPrice": "160 Coins",
    "zones": [
      "Peaceful Meadow",
      "Plaza"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Garnet.png"
  },
  {
    "name": "Shiny Garnet",
    "color": "Red",
    "shape": "Oval",
    "sellPrice": "640 Coins",
    "zones": [
      "Peaceful Meadow",
      "Plaza"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Garnet.png"
  },
  {
    "name": "Onyx",
    "color": "Black",
    "shape": "Square",
    "sellPrice": "300 Coins",
    "zones": [
      "All Biomes"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Onyx.png"
  },
  {
    "name": "Peridot",
    "color": "Green",
    "shape": "Oval",
    "sellPrice": "200 Coins",
    "zones": [
      "Dazzle Beach",
      "Peaceful Meadow"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Peridot.png"
  },
  {
    "name": "Shiny Peridot",
    "color": "Green",
    "shape": "Oval",
    "sellPrice": "800 Coins",
    "zones": [
      "Dazzle Beach",
      "Peaceful Meadow"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Peridot.png"
  },
  {
    "name": "Ruby",
    "color": "Red",
    "shape": "Square",
    "sellPrice": "350 Coins",
    "zones": [
      "Sunlit Plateau",
      "Vitalys Mine"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Ruby.png"
  },
  {
    "name": "Shiny Ruby",
    "color": "Red",
    "shape": "Square",
    "sellPrice": "1,400 Coins",
    "zones": [
      "Sunlit Plateau",
      "Vitalys Mine"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Ruby.png"
  },
  {
    "name": "Sapphire",
    "color": "Dark Blue",
    "shape": "Square",
    "sellPrice": "350 Coins",
    "zones": [
      "Sunlit Plateau",
      "Vitalys Mine"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Sapphire.png"
  },
  {
    "name": "Shiny Sapphire",
    "color": "Dark Blue",
    "shape": "Square",
    "sellPrice": "1,400 Coins",
    "zones": [
      "Sunlit Plateau",
      "Vitalys Mine"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Sapphire.png"
  },
  {
    "name": "Topaz",
    "color": "Yellow",
    "shape": "Square",
    "sellPrice": "240 Coins",
    "zones": [
      "Plaza"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Topaz.png"
  },
  {
    "name": "Shiny Topaz",
    "color": "Yellow",
    "shape": "Square",
    "sellPrice": "960 Coins",
    "zones": [
      "Plaza"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Topaz.png"
  },
  {
    "name": "Tourmaline",
    "color": "Pink",
    "shape": "Oval",
    "sellPrice": "420 Coins",
    "zones": [
      "Frosted Heights",
      "Sunlit Plateau"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Tourmaline.png"
  },
  {
    "name": "Shiny Tourmaline",
    "color": "Pink",
    "shape": "Oval",
    "sellPrice": "1,600 Coins",
    "zones": [
      "Frosted Heights",
      "Sunlit Plateau"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Tourmaline.png"
  },
  {
    "name": "Vitalys Crystal",
    "color": null,
    "sellPrice": "30",
    "zones": [
      "Vitalys Mine"
    ],
    "shape": null,
    "icon": null
  },
  {
    "name": "Alexandrite",
    "color": "Pink and Green",
    "shape": "Oval",
    "sellPrice": "350 Coins",
    "zones": [
      "The Wastes",
      "The Oasis"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Alexandrite.png"
  },
  {
    "name": "Shiny Alexandrite",
    "color": "Green",
    "shape": "Oval",
    "sellPrice": "1,400 Coins",
    "zones": [
      "The Wastes",
      "The Oasis"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Alexandrite.png"
  },
  {
    "name": "Blue Zircon",
    "color": "Blue",
    "shape": "Oval",
    "sellPrice": "500 Coins",
    "zones": [
      "The Lagoon"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Blue_Zircon.png"
  },
  {
    "name": "Shiny Blue Zircon",
    "color": "Blue",
    "shape": "Oval",
    "sellPrice": "2,000 Coins",
    "zones": [
      "The Lagoon"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Blue_Zircon.png"
  },
  {
    "name": "Bumblestone",
    "color": "Orange",
    "shape": "Geode",
    "sellPrice": "400 Coins",
    "zones": [
      "The Borderlands"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Bumblestone.png"
  },
  {
    "name": "Shiny Bumblestone",
    "color": "Orange",
    "shape": "Geode",
    "sellPrice": "1,600 Coins",
    "zones": [
      "The Borderlands"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Bumblestone.png"
  },
  {
    "name": "Evergem",
    "color": "Orange",
    "shape": "N/A",
    "sellPrice": "300 Coins",
    "zones": [
      "The Ruins"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Evergem.png"
  },
  {
    "name": "Shiny Evergem",
    "color": "Orange",
    "shape": "N/A",
    "sellPrice": "1,200 Coins",
    "zones": [
      "The Ruins"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Evergem.png"
  },
  {
    "name": "Jade",
    "color": "Green",
    "shape": "Triangle",
    "sellPrice": "250 Coins",
    "zones": [
      "The Courtyard",
      "The Overlook"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Jade.png"
  },
  {
    "name": "Shiny Jade",
    "color": "Green",
    "shape": "Triangle",
    "sellPrice": "1,000 Coins",
    "zones": [
      "The Courtyard",
      "The Overlook"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Jade.png"
  },
  {
    "name": "Spinel",
    "color": "Dark Red",
    "shape": "Square",
    "sellPrice": "450 Coins",
    "zones": [
      "The Promenade",
      "The Grove"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Spinel.png"
  },
  {
    "name": "Shiny Spinel",
    "color": "Dark Red",
    "shape": "Square",
    "sellPrice": "1,800 Coins",
    "zones": [
      "The Promenade",
      "The Grove"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Spinel.png"
  },
  {
    "name": "Opal",
    "color": "White",
    "shape": "Circle",
    "sellPrice": "300 Coins",
    "zones": [
      "Storybook Vale",
      "The Bind"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Opal.png"
  },
  {
    "name": "Shiny Opal",
    "color": "White",
    "shape": "Circle",
    "sellPrice": "1200 Coins",
    "zones": [
      "Storybook Vale",
      "The Bind"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Opal.png"
  },
  {
    "name": "Pure Ice",
    "color": "Light Blue",
    "shape": "Prisms",
    "sellPrice": "300 Coins",
    "zones": [
      "The Wild Woods",
      "Teapot Falls",
      "The Fallen Fortress",
      "The Beanstalk Marshes"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Pure_Ice.png"
  },
  {
    "name": "Shiny Pure Ice",
    "color": "Light Blue",
    "shape": "Prisms",
    "sellPrice": "1200 Coins",
    "zones": [
      "The Wild Woods",
      "Teapot Falls",
      "The Fallen Fortress",
      "The Beanstalk Marshes"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Pure_Ice.png"
  },
  {
    "name": "Star Sapphire",
    "color": "Dark Blue",
    "shape": "Star",
    "sellPrice": "450 Coins",
    "zones": [
      "Teapot Falls",
      "The Fallen Fortress",
      "The Beanstalk Marshes"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Star_Sapphire.png"
  },
  {
    "name": "Shiny Star Sapphire",
    "color": "Dark Blue",
    "shape": "Star",
    "sellPrice": "1800 Coins",
    "zones": [
      "The Wild Woods",
      "Teapot Falls",
      "The Fallen Fortress",
      "The Beanstalk Marshes"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Star_Sapphire.png"
  },
  {
    "name": "Magma",
    "color": "Black and Orange",
    "shape": "N/A",
    "sellPrice": "400 Coins",
    "zones": [
      "The Elysian Fields",
      "The Fiery Plains",
      "Statue's Shadow",
      "Mount Olympus"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Magma.png"
  },
  {
    "name": "Shiny Magma",
    "color": "Black and Orange",
    "shape": "N/A",
    "sellPrice": "1600 Coins",
    "zones": [
      "The Elysian Fields",
      "The Fiery Plains",
      "Statue's Shadow",
      "Mount Olympus"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Magma.png"
  },
  {
    "name": "Honeycomb Stone",
    "color": "Yellow",
    "shape": "N/A",
    "sellPrice": "550 Coins",
    "zones": [
      "Sundae Shores",
      "Hundred Acre Fields",
      "Pixie Flats",
      "Hunny Falls"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Honeycomb_Stone.png"
  },
  {
    "name": "Shiny Honeycomb Stone",
    "color": "Yellow",
    "shape": "N/A",
    "sellPrice": "2200 Coins",
    "zones": [
      "Sundae Shores",
      "Hundred Acre Fields",
      "Pixie Flats",
      "Hunny Falls"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Honeycomb_Stone.png"
  },
  {
    "name": "Jasper",
    "color": "White",
    "shape": "Oval",
    "sellPrice": "400 Coins",
    "zones": [
      "Haute Plateau",
      "Runway River",
      "Paisley Park",
      "Modish Marsh",
      "Glamour Gulch"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Jasper.png"
  },
  {
    "name": "Shiny Jasper",
    "color": "White",
    "shape": "Oval",
    "sellPrice": "1600 Coins",
    "zones": [
      "Haute Plateau",
      "Runway River",
      "Paisley Park",
      "Modish Marsh",
      "Glamour Gulch"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Jasper.png"
  },
  {
    "name": "Pyrite",
    "color": "Yellow",
    "shape": "N/A",
    "sellPrice": "250 Coins",
    "zones": [
      "Wishblossom Ranch",
      "Wishing Way",
      "Silver Summit",
      "Delver Dale"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Pyrite.png"
  },
  {
    "name": "Shiny Pyrite",
    "color": "Yellow",
    "shape": "N/A",
    "sellPrice": "1000 Coins",
    "zones": [
      "Wishblossom Ranch",
      "Wishing Way",
      "Silver Summit",
      "Delver Dale"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Pyrite.png"
  },
  {
    "name": "Honey Agate",
    "color": "Yellow and Red",
    "shape": "Oval",
    "sellPrice": "400 Coins",
    "zones": [
      "Honeyglow Woods"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Honey_Agate.png"
  },
  {
    "name": "Shiny Honey Agate",
    "color": "Yellow and Red",
    "shape": "Oval",
    "sellPrice": "1600 Coins",
    "zones": [
      "Honeyglow Woods"
    ],
    "icon": "dev/cooking-recipes-images/gem_icons/Shiny_Honey_Agate.png"
  }
];
const KNOWN_VENDOR_ITEMS = [
  {
    "vendor": "Goofy's Stall",
    "name": "Lettuce Seed",
    "zone": "Peaceful Meadow",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 3
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Wheat Seed",
    "zone": "Peaceful Meadow",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 1
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Carrot Seed",
    "zone": "Peaceful Meadow",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 10
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Apple",
    "zone": "Peaceful Meadow",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 50
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Carrot",
    "zone": "Peaceful Meadow",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 66
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Lettuce",
    "zone": "Peaceful Meadow",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 12
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Raspberry",
    "zone": "Peaceful Meadow",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 42
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Wheat",
    "zone": "Peaceful Meadow",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 3
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Sugarcane Seed",
    "zone": "Dazzle Beach",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 5
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Tomato Seed",
    "zone": "Dazzle Beach",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 8
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Corn Seed",
    "zone": "Dazzle Beach",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 15
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Banana",
    "zone": "Dazzle Beach",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 58
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Corn",
    "zone": "Dazzle Beach",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 24
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Sugarcane",
    "zone": "Dazzle Beach",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 29
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Tomato",
    "zone": "Dazzle Beach",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 33
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Bell Pepper Seed",
    "zone": "Forest of Valor",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 12
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Canola Seed",
    "zone": "Forest of Valor",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 25
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Onion Seed",
    "zone": "Forest of Valor",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 50
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Bell Pepper",
    "zone": "Forest of Valor",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 50
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Blueberry",
    "zone": "Forest of Valor",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 58
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Canola",
    "zone": "Forest of Valor",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 164
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Onion",
    "zone": "Forest of Valor",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 255
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Rice Seed",
    "zone": "Glade of Trust",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 35
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Spinach Seed",
    "zone": "Glade of Trust",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 45
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Okra Seed",
    "zone": "Glade of Trust",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 135
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Lemon",
    "zone": "Glade of Trust",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 67
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Okra",
    "zone": "Glade of Trust",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 171
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Rice",
    "zone": "Glade of Trust",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 92
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Spinach",
    "zone": "Glade of Trust",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 62
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Chili Pepper Seed",
    "zone": "Sunlit Plateau",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 20
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Cotton Seed",
    "zone": "Sunlit Plateau",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 42
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Zucchini Seed",
    "zone": "Sunlit Plateau",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 30
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Soya Seed",
    "zone": "Sunlit Plateau",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 60
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Chili Pepper",
    "zone": "Sunlit Plateau",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 117
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Cocoa Bean",
    "zone": "Sunlit Plateau",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 75
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Soya",
    "zone": "Sunlit Plateau",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 104
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Zucchini",
    "zone": "Sunlit Plateau",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 78
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Cucumber Seed",
    "zone": "Frosted Heights",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 40
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Eggplant Seed",
    "zone": "Frosted Heights",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 95
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Asparagus Seed",
    "zone": "Frosted Heights",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 150
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Asparagus",
    "zone": "Frosted Heights",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 200
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Cherry",
    "zone": "Frosted Heights",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 83
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Cucumber",
    "zone": "Frosted Heights",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 239
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Eggplant",
    "zone": "Frosted Heights",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 462
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Pumpkin Seed",
    "zone": "Forgotten Lands",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 275
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Potato Seed",
    "zone": "Forgotten Lands",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 55
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Leek Seed",
    "zone": "Forgotten Lands",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Seed",
    "price": 120
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Gooseberry",
    "zone": "Forgotten Lands",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 100
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Leek",
    "zone": "Forgotten Lands",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 464
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Potato",
    "zone": "Forgotten Lands",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 189
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Pumpkin",
    "zone": "Forgotten Lands",
    "realm": "Dreamlight Valley (Base Game)",
    "itemType": "Ingredient",
    "price": 996
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Wheat Seed",
    "zone": "Ancient’s Landing",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 1
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Celery Seed",
    "zone": "Ancient’s Landing",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 20
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Canola Seed",
    "zone": "Ancient’s Landing",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 25
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Grape Seed",
    "zone": "Ancient’s Landing",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 5
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Yam Seed",
    "zone": "Ancient’s Landing",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 15
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Cosmic Fig Seed",
    "zone": "Ancient’s Landing",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 10
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Corn Seed",
    "zone": "Glittering Dunes",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 15
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Broccoli Seed",
    "zone": "Glittering Dunes",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 60
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Chili Pepper Seed",
    "zone": "Glittering Dunes",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 20
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Melon Seed",
    "zone": "Glittering Dunes",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 40
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Bean Seed",
    "zone": "Glittering Dunes",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 50
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Flute Root Seed",
    "zone": "Glittering Dunes",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 70
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Tomato Seed",
    "zone": "Wild Tangle",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 8
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Cabbage Seed",
    "zone": "Wild Tangle",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 150
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Turnip Seed",
    "zone": "Wild Tangle",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 100
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Pineapple Seed",
    "zone": "Wild Tangle",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 200
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Potato Seed",
    "zone": "Wild Tangle",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 55
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Ruby Lentil Seed",
    "zone": "Wild Tangle",
    "realm": "Eternity Isle (DLC)",
    "itemType": "Seed",
    "price": 250
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Chia Seed",
    "zone": "The Bind",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 5
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Cauliflower Seed",
    "zone": "The Bind",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 10
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Barley Seed",
    "zone": "The Bind",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 15
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Ring Squash Seed",
    "zone": "The Bind",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 20
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Shovel Bird Eggs",
    "zone": "The Bind",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 160
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Flyleaf Feta",
    "zone": "The Bind",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 150
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Radish Seed",
    "zone": "Everafter",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 100
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Oat Seed",
    "zone": "Everafter",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 150
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Rhubarb Seed",
    "zone": "Everafter",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 200
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Green Bean Seed",
    "zone": "Everafter",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 250
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Plain Yogurt",
    "zone": "Everafter",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 240
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Faerie Rye Seed",
    "zone": "Everafter",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 60
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Honeydew Seed",
    "zone": "Mythopia",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 40
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Radicchio Seed",
    "zone": "Mythopia",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 50
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Elysian Grain",
    "zone": "Mythopia",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 260
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Black Pepper Seed",
    "zone": "Mythopia",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 70
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Ambrosia",
    "zone": "Mythopia",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 140
  },
  {
    "vendor": "Goofy's Stall",
    "name": "Golden Apple",
    "zone": "Mythopia",
    "realm": "Storybook Vale (DLC)",
    "itemType": "Seed",
    "price": 220
  }
];

