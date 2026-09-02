require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const dailyContent = require('./content/daily-content');
const {
  jokes,
  facts,
  questions,
  riddles,
  dailyTips,
  quizzes,
  curiosityWeeks,
  curiosityPreview,
  wouldYouRather
} = dailyContent;
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA = path.join(ROOT, 'data.json');

function readData(){ try { return JSON.parse(fs.readFileSync(DATA,'utf8')); } catch { return {ads:[]}; } }
function writeData(data){ fs.writeFileSync(DATA, JSON.stringify(data,null,2)); }
function send(res,status,body,type='application/json'){ res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store'}); res.end(type.includes('json')?JSON.stringify(body):body); }
function body(req){ return new Promise((resolve,reject)=>{ let d=''; req.on('data',c=>{d+=c; if(d.length>8e6) reject(new Error('too large'));}); req.on('end',()=>{ try{resolve(d?JSON.parse(d):{});}catch(e){reject(e);} }); }); }
function safeFile(p){ const full=path.normalize(path.join(ROOT,p)); return full.startsWith(ROOT)?full:null; }

const verses = [
  [
    'Galatians 5:13',
    'Serve one another humbly in love.',
    'https://www.pastorrick.com/'
  ]
];







// Daily Crumbs full-year fixed-date celebration calendar
// Uses MM-DD keys so the same fixed-date calendar works every year.
// Note: movable observances (for example, those tied to a weekday) are intentionally excluded.
const nationalDays = {
  '01-01': ['New Year\'s Day', 'National Hangover Day'],
  '01-02': ['National Science Fiction Day', 'National Buffet Day'],
  '01-03': ['National Chocolate Covered Cherry Day', 'National Drinking Straw Day'],
  '01-04': ['National Trivia Day', 'National Spaghetti Day'],
  '01-05': ['National Bird Day', 'National Whipped Cream Day'],
  '01-06': ['National Bean Day', 'National Cuddle Up Day'],
  '01-07': ['National Bobblehead Day', 'National Tempura Day'],
  '01-08': ['National Bubble Bath Day', 'National English Toffee Day'],
  '01-09': ['National Apricot Day', 'National Static Electricity Day'],
  '01-10': ['National Bittersweet Chocolate Day', 'National Save the Eagles Day'],
  '01-11': ['National Milk Day', 'National Hot Toddy Day'],
  '01-12': ['National Pharmacist Day', 'National Marzipan Day'],
  '01-13': ['National Rubber Ducky Day', 'National Sticker Day'],
  '01-14': ['National Dress Up Your Pet Day', 'National Hot Pastrami Sandwich Day'],
  '01-15': ['National Bagel Day', 'National Hat Day'],
  '01-16': ['National Fig Newton Day', 'National Nothing Day'],
  '01-17': ['National Hot Buttered Rum Day', 'Ditch New Year\'s Resolutions Day'],
  '01-18': ['National Winnie the Pooh Day', 'National Gourmet Coffee Day'],
  '01-19': ['National Popcorn Day', 'National Tin Can Day'],
  '01-20': ['National Cheese Lover\'s Day', 'National Penguin Day'],
  '01-21': ['National Granola Bar Day', 'National Hugging Day'],
  '01-22': ['National Blonde Brownie Day', 'National Hot Sauce Day'],
  '01-23': ['National Pie Day', 'National Handwriting Day'],
  '01-24': ['National Peanut Butter Day', 'National Compliment Day'],
  '01-25': ['National Opposite Day', 'National Irish Coffee Day'],
  '01-26': ['National Peanut Brittle Day', 'National Spouses Day'],
  '01-27': ['National Chocolate Cake Day', 'National Geographic Day'],
  '01-28': ['National Blueberry Pancake Day', 'National Kazoo Day'],
  '01-29': ['National Puzzle Day', 'National Corn Chip Day'],
  '01-30': ['National Croissant Day', 'National Draw a Dinosaur Day'],
  '01-31': ['National Hot Chocolate Day', 'National Backward Day'],

  '02-01': ['National Freedom Day', 'National Baked Alaska Day'],
  '02-02': ['Groundhog Day', 'National Tater Tot Day'],
  '02-03': ['National Carrot Cake Day', 'National Golden Retriever Day'],
  '02-04': ['National Homemade Soup Day', 'National Thank a Mail Carrier Day'],
  '02-05': ['National Weatherperson\'s Day', 'World Nutella Day'],
  '02-06': ['National Frozen Yogurt Day', 'National Chopsticks Day'],
  '02-07': ['National Fettuccine Alfredo Day', 'National Send a Card to a Friend Day'],
  '02-08': ['National Kite Flying Day', 'National Boy Scouts Day'],
  '02-09': ['National Pizza Day', 'National Toothache Day'],
  '02-10': ['National Umbrella Day', 'National Cream Cheese Brownie Day'],
  '02-11': ['National Inventors\' Day', 'National Peppermint Patty Day'],
  '02-12': ['National Plum Pudding Day', 'Darwin Day'],
  '02-13': ['National Tortellini Day', 'Galentine\'s Day'],
  '02-14': ['Valentine\'s Day', 'National Cream-Filled Chocolates Day'],
  '02-15': ['National Gumdrop Day', 'Singles Awareness Day'],
  '02-16': ['National Almond Day', 'Do a Grouch a Favor Day'],
  '02-17': ['National Random Acts of Kindness Day', 'National Cabbage Day'],
  '02-18': ['National Drink Wine Day', 'National Battery Day'],
  '02-19': ['National Chocolate Mint Day', 'National Vet Girls ROCK Day'],
  '02-20': ['National Love Your Pet Day', 'National Cherry Pie Day'],
  '02-21': ['National Sticky Bun Day', 'National Grain-Free Day'],
  '02-22': ['National Margarita Day', 'National Cook a Sweet Potato Day'],
  '02-23': ['National Banana Bread Day', 'National Dog Biscuit Day'],
  '02-24': ['National Tortilla Chip Day', 'National Bartender Day'],
  '02-25': ['National Chocolate Covered Nut Day', 'National Clam Chowder Day'],
  '02-26': ['National Pistachio Day', 'National Tell a Fairy Tale Day'],
  '02-27': ['National Strawberry Day', 'National Polar Bear Day'],
  '02-28': ['National Chocolate Soufflé Day', 'National Floral Design Day'],
  '02-29': ['Leap Day', 'Rare Disease Day'],

  '03-01': ['National Peanut Butter Lover\'s Day', 'National Pig Day'],
  '03-02': ['National Banana Cream Pie Day', 'Read Across America Day'],
  '03-03': ['National Anthem Day', 'National Cold Cuts Day'],
  '03-04': ['National Pound Cake Day', 'National Grammar Day'],
  '03-05': ['National Cheese Doodle Day', 'National Absinthe Day'],
  '03-06': ['National Oreo Cookie Day', 'National Dentist\'s Day'],
  '03-07': ['National Cereal Day', 'National Be Heard Day'],
  '03-08': ['International Women\'s Day', 'National Proofreading Day'],
  '03-09': ['National Meatball Day', 'National Barbie Day'],
  '03-10': ['National Pack Your Lunch Day', 'National Ranch Day'],
  '03-11': ['National Johnny Appleseed Day', 'National Promposal Day'],
  '03-12': ['National Plant a Flower Day', 'National Girl Scout Day'],
  '03-13': ['National Good Samaritan Day', 'National Coconut Torte Day'],
  '03-14': ['Pi Day', 'National Potato Chip Day'],
  '03-15': ['National Shoe the World Day', 'National Pears Hélène Day'],
  '03-16': ['National Artichoke Hearts Day', 'National Panda Day'],
  '03-17': ['St. Patrick\'s Day', 'National Corned Beef and Cabbage Day'],
  '03-18': ['National Sloppy Joe Day', 'National Awkward Moments Day'],
  '03-19': ['National Poultry Day', 'National Let\'s Laugh Day'],
  '03-20': ['National Ravioli Day', 'International Day of Happiness'],
  '03-21': ['National French Bread Day', 'World Poetry Day'],
  '03-22': ['National Goof Off Day', 'World Water Day'],
  '03-23': ['National Puppy Day', 'National Chia Day'],
  '03-24': ['National Cheesesteak Day', 'National Cocktail Day'],
  '03-25': ['National Waffle Day', 'National Medal of Honor Day'],
  '03-26': ['National Spinach Day', 'National Nougat Day'],
  '03-27': ['National Spanish Paella Day', 'National Scribble Day'],
  '03-28': ['National Black Forest Cake Day', 'National Something on a Stick Day'],
  '03-29': ['National Mom and Pop Business Owners Day', 'National Lemon Chiffon Cake Day'],
  '03-30': ['National Pencil Day', 'National Take a Walk in the Park Day'],
  '03-31': ['National Tater Day', 'National Crayon Day'],
    '04-01': ['April Fools\' Day', 'National Sourdough Bread Day'],
  '04-02': ['National Peanut Butter and Jelly Day', 'National Ferret Day'],
  '04-03': ['National Chocolate Mousse Day', 'Find a Rainbow Day'],
  '04-04': ['National Chicken Cordon Bleu Day', 'National School Librarian Day'],
  '04-05': ['National Deep Dish Pizza Day', 'National Caramel Day'],
  '04-06': ['National Caramel Popcorn Day', 'National Student-Athlete Day'],
  '04-07': ['National Beer Day', 'National No Housework Day'],
  '04-08': ['National Empanada Day', 'National Zoo Lovers Day'],
  '04-09': ['National Unicorn Day', 'National Chinese Almond Cookie Day'],
  '04-10': ['National Siblings Day', 'National Cinnamon Crescent Day'],
  '04-11': ['National Pet Day', 'National Cheese Fondue Day'],
  '04-12': ['National Grilled Cheese Sandwich Day', 'National Licorice Day'],
  '04-13': ['National Peach Cobbler Day', 'National Scrabble Day'],
  '04-14': ['National Pecan Day', 'National Gardening Day'],
  '04-15': ['National Glazed Spiral Ham Day', 'National Laundry Day'],
  '04-16': ['National Eggs Benedict Day', 'National Wear Your Pajamas to Work Day'],
  '04-17': ['National Cheeseball Day', 'National Haiku Poetry Day'],
  '04-18': ['National Animal Crackers Day', 'National Columnists\' Day'],
  '04-19': ['National Garlic Day', 'National Hanging Out Day'],
  '04-20': ['National Pineapple Upside-Down Cake Day', 'National Look-Alike Day'],
  '04-21': ['National Chocolate-Covered Cashews Day', 'National Kindergarten Day'],
  '04-22': ['Earth Day', 'National Jelly Bean Day'],
  '04-23': ['National Picnic Day', 'National Cherry Cheesecake Day'],
  '04-24': ['National Pigs in a Blanket Day', 'National Bucket List Day'],
  '04-25': ['National Zucchini Bread Day', 'National Telephone Day'],
  '04-26': ['National Pretzel Day', 'National Kids and Pets Day'],
  '04-27': ['National Prime Rib Day', 'National Tell a Story Day'],
  '04-28': ['National Blueberry Pie Day', 'National Superhero Day'],
  '04-29': ['National Shrimp Scampi Day', 'National Zipper Day'],
  '04-30': ['National Oatmeal Cookie Day', 'National Raisin Day'],

  '05-01': ['May Day', 'National Chocolate Parfait Day'],
  '05-02': ['National Truffle Day', 'National Life Insurance Day'],
  '05-03': ['National Paranormal Day', 'National Chocolate Custard Day'],
  '05-04': ['Star Wars Day', 'National Orange Juice Day'],
  '05-05': ['Cinco de Mayo', 'National Hoagie Day'],
  '05-06': ['National Beverage Day', 'National Nurses Day'],
  '05-07': ['National Roast Leg of Lamb Day', 'National Tourism Day'],
  '05-08': ['National Coconut Cream Pie Day', 'National Have a Coke Day'],
  '05-09': ['National Lost Sock Memorial Day', 'National Butterscotch Brownie Day'],
  '05-10': ['National Clean Up Your Room Day', 'National Shrimp Day'],
  '05-11': ['National Eat What You Want Day', 'National Twilight Zone Day'],
  '05-12': ['National Limerick Day', 'National Nutty Fudge Day'],
  '05-13': ['National Apple Pie Day', 'National Frog Jumping Day'],
  '05-14': ['National Buttermilk Biscuit Day', 'National Dance Like a Chicken Day'],
  '05-15': ['National Chocolate Chip Day', 'National Nylon Stocking Day'],
  '05-16': ['National Barbecue Day', 'National Mimosa Day'],
  '05-17': ['National Walnut Day', 'National Cherry Cobbler Day'],
  '05-18': ['National No Dirty Dishes Day', 'National Cheese Soufflé Day'],
  '05-19': ['National Devil\'s Food Cake Day', 'National May Ray Day'],
  '05-20': ['National Rescue Dog Day', 'National Quiche Lorraine Day'],
  '05-21': ['National Strawberries and Cream Day', 'National Memo Day'],
  '05-22': ['National Vanilla Pudding Day', 'National Maritime Day'],
  '05-23': ['National Taffy Day', 'National Lucky Penny Day'],
  '05-24': ['National Scavenger Hunt Day', 'National Escargot Day'],
  '05-25': ['National Wine Day', 'National Brown-Bag-It Day'],
  '05-26': ['National Blueberry Cheesecake Day', 'National Paper Airplane Day'],
  '05-27': ['National Grape Popsicle Day', 'National Sunscreen Day'],
  '05-28': ['National Hamburger Day', 'National Brisket Day'],
  '05-29': ['National Paperclip Day', 'National Coq au Vin Day'],
  '05-30': ['National Creativity Day', 'National Mint Julep Day'],
  '05-31': ['National Macaroon Day', 'National Smile Day'],

  '06-01': ['National Say Something Nice Day', 'National Hazelnut Cake Day'],
  '06-02': ['National Rocky Road Day', 'National Rotisserie Chicken Day'],
  '06-03': ['National Egg Day', 'National Chocolate Macaroon Day'],
  '06-04': ['National Cheese Day', 'National Cognac Day'],
  '06-05': ['National Gingerbread Day', 'National Veggie Burger Day'],
  '06-06': ['National Applesauce Cake Day', 'National Yo-Yo Day'],
  '06-07': ['National Chocolate Ice Cream Day', 'National VCR Day'],
  '06-08': ['National Best Friends Day', 'National Jelly-Filled Doughnut Day'],
  '06-09': ['National Strawberry Rhubarb Pie Day', 'National Donald Duck Day'],
  '06-10': ['National Iced Tea Day', 'National Herbs and Spices Day'],
  '06-11': ['National Corn on the Cob Day', 'National German Chocolate Cake Day'],
  '06-12': ['National Peanut Butter Cookie Day', 'National Loving Day'],
  '06-13': ['National Sewing Machine Day', 'National Weed Your Garden Day'],
  '06-14': ['Flag Day', 'National Strawberry Shortcake Day'],
  '06-15': ['National Lobster Day', 'National Smile Power Day'],
  '06-16': ['National Fudge Day', 'National Fresh Veggies Day'],
  '06-17': ['National Eat Your Vegetables Day', 'National Root Beer Day'],
  '06-18': ['National Go Fishing Day', 'National Splurge Day'],
  '06-19': ['Juneteenth', 'National Garfield the Cat Day'],
  '06-20': ['National Vanilla Milkshake Day', 'National Ice Cream Soda Day'],
  '06-21': ['National Smoothie Day', 'National Selfie Day'],
  '06-22': ['National Chocolate Éclair Day', 'National Onion Rings Day'],
  '06-23': ['National Pink Day', 'National Pecan Sandies Day'],
  '06-24': ['National Pralines Day', 'National Upcycling Day'],
  '06-25': ['National Catfish Day', 'National Strawberry Parfait Day'],
  '06-26': ['National Chocolate Pudding Day', 'National Beautician\'s Day'],
  '06-27': ['National Ice Cream Cake Day', 'National Sunglasses Day'],
  '06-28': ['National Tapioca Day', 'National Insurance Awareness Day'],
  '06-29': ['National Waffle Iron Day', 'National Camera Day'],
  '06-30': ['National Meteor Watch Day', 'National Social Media Day'],
    '07-01': ['National Creative Ice Cream Flavors Day', 'National Postal Worker Day'],
  '07-02': ['National Anisette Day', 'National UFO Day'],
  '07-03': ['National Chocolate Wafer Day', 'National Compliment Your Mirror Day'],
  '07-04': ['Independence Day', 'National Barbecued Spareribs Day'],
  '07-05': ['National Graham Cracker Day', 'National Bikini Day'],
  '07-06': ['National Fried Chicken Day', 'National Hand Roll Day'],
  '07-07': ['National Macaroni Day', 'National Strawberry Sundae Day'],
  '07-08': ['National Chocolate with Almonds Day', 'National Freezer Pop Day'],
  '07-09': ['National Sugar Cookie Day', 'National No Bra Day'],
  '07-10': ['National Piña Colada Day', 'National Kitten Day'],
  '07-11': ['National Blueberry Muffin Day', 'National Rainier Cherry Day'],
  '07-12': ['National Pecan Pie Day', 'National Different Colored Eyes Day'],
  '07-13': ['National French Fry Day', 'National Beans \'n\' Franks Day'],
  '07-14': ['National Mac and Cheese Day', 'National Tape Measure Day'],
  '07-15': ['National Gummi Worm Day', 'National Pet Fire Safety Day'],
  '07-16': ['National Corn Fritters Day', 'National Personal Chef Day'],
  '07-17': ['National Peach Ice Cream Day', 'National Tattoo Day'],
  '07-18': ['National Caviar Day', 'National Sour Candy Day'],
  '07-19': ['National Daiquiri Day', 'National Ice Cream Day'],
  '07-20': ['National Moon Day', 'National Lollipop Day'],
  '07-21': ['National Junk Food Day', 'National Be Someone Day'],
  '07-22': ['National Hammock Day', 'National Mango Day'],
  '07-23': ['National Vanilla Ice Cream Day', 'National Gorgeous Grandma Day'],
  '07-24': ['National Tequila Day', 'National Cousins Day'],
  '07-25': ['National Hot Fudge Sundae Day', 'National Merry-Go-Round Day'],
  '07-26': ['National Coffee Milkshake Day', 'National Aunt and Uncle Day'],
  '07-27': ['National Crème Brûlée Day', 'National Scotch Day'],
  '07-28': ['National Milk Chocolate Day', 'National Waterpark Day'],
  '07-29': ['National Chicken Wing Day', 'National Lasagna Day'],
  '07-30': ['National Cheesecake Day', 'National Father-in-Law Day'],
  '07-31': ['National Avocado Day', 'National Raspberry Cake Day'],

  '08-01': ['National Raspberry Cream Pie Day', 'National Girlfriends Day'],
  '08-02': ['National Ice Cream Sandwich Day', 'National Coloring Book Day'],
  '08-03': ['National Watermelon Day', 'National Grab Some Nuts Day'],
  '08-04': ['National Chocolate Chip Cookie Day', 'National Coast Guard Day'],
  '08-05': ['National Underwear Day', 'National Work Like a Dog Day'],
  '08-06': ['National Root Beer Float Day', 'National Fresh Breath Day'],
  '08-07': ['National Lighthouse Day', 'National Sea Serpent Day'],
  '08-08': ['National Frozen Custard Day', 'International Cat Day'],
  '08-09': ['National Rice Pudding Day', 'National Book Lovers Day'],
  '08-10': ['National S\'mores Day', 'National Lazy Day'],
  '08-11': ['National Raspberry Bombe Day', 'National Son and Daughter Day'],
  '08-12': ['National Middle Child Day', 'National Vinyl Record Day'],
  '08-13': ['National Filet Mignon Day', 'National Left-Handers Day'],
  '08-14': ['National Creamsicle Day', 'National Financial Awareness Day'],
  '08-15': ['National Relaxation Day', 'National Lemon Meringue Pie Day'],
  '08-16': ['National Rum Day', 'National Tell a Joke Day'],
  '08-17': ['National Nonprofit Day', 'National Thrift Shop Day'],
  '08-18': ['National Fajita Day', 'National Ice Cream Pie Day'],
  '08-19': ['National Potato Day', 'National Aviation Day'],
  '08-20': ['National Chocolate Pecan Pie Day', 'National Radio Day'],
  '08-21': ['National Spumoni Day', 'National Senior Citizens Day'],
  '08-22': ['National Bao Day', 'National Tooth Fairy Day'],

  '08-23': [
    'Find Your Inner Nerd Day',
    'National Cuban Sandwich Day',
    'National Sponge Cake Day',
    'National Ride the Wind Day'
  ],
  '08-24': [
    'National Waffle Day',
    'National Peach Pie Day',
    'National Maryland Day',
    'National Selfie Day'
  ],
  '08-25': [
    'National Banana Split Day',
    'National Kiss and Make Up Day',
    'National Park Service Founders Day'
  ],
  '08-26': [
    'National Dog Day',
    'Women\'s Equality Day',
    'National Webmistress Day',
    'National Got Checked Day',
    'National Cherry Popsicle Day'
  ],
  '08-27': [
    'National Just Because Day',
    'National Peach Day',
    'National Pots de Crème Day'
  ],
  '08-28': [
    'National Thoughtful Day',
    'Rainbow Bridge Remembrance Day',
    'National Red Wine Day',
    'National Power Rangers Day',
    'National Bow Tie Day',
    'National Cherry Turnover Day'
  ],
  '08-29': [
    'National Lemon Juice Day',
    'National Chop Suey Day',
    'According to Hoyle Day',
    'National Sport Sampling Day'
  ],
  '08-30': [
    'National Grief Awareness Day',
    'National Beach Day',
    'National Toasted Marshmallow Day'
  ],
  '08-31': ['National Trail Mix Day', 'National Matchmaker Day'],

  '09-01': ['National Chicken Boy Day', 'National Burnt Ends Day', 'National Hotel Employee Day'],
  '09-02': ['National V-J Day', 'National Blueberry Popsicle Day'],
  '09-03': ['National Welsh Rarebit Day', 'U.S. Bowling League Day'],
  '09-04': ['National Wildlife Day', 'National Macadamia Nut Day'],
  '09-05': ['National Cheese Pizza Day', 'National Be Late for Something Day'],
  '09-06': ['National Read a Book Day', 'National Coffee Ice Cream Day'],
  '09-07': ['National Beer Lover\'s Day', 'National Acorn Squash Day'],
  '09-08': ['National Ampersand Day', 'National Date Nut Bread Day'],
  '09-09': ['National Teddy Bear Day', 'National Wiener Schnitzel Day'],
  '09-10': ['National TV Dinner Day', 'National Swap Ideas Day'],
  '09-11': ['Patriot Day', 'National Hot Cross Bun Day'],
  '09-12': ['National Chocolate Milkshake Day', 'National Video Games Day'],
  '09-13': ['National Peanut Day', 'National Positive Thinking Day'],
  '09-14': ['National Cream-Filled Doughnut Day', 'National Coloring Day'],
  '09-15': ['National Double Cheeseburger Day', 'National Linguine Day'],
  '09-16': ['National Guacamole Day', 'National Cinnamon-Raisin Bread Day'],
  '09-17': ['National Apple Dumpling Day', 'National Monte Cristo Day'],
  '09-18': ['National Cheeseburger Day', 'National Play-Doh Day'],
  '09-19': ['Talk Like a Pirate Day', 'National Butterscotch Pudding Day'],
  '09-20': ['National Pepperoni Pizza Day', 'National String Cheese Day'],
  '09-21': ['National Pecan Cookie Day', 'World Gratitude Day'],
  '09-22': ['National Ice Cream Cone Day', 'National White Chocolate Day'],
  '09-23': ['National Checkers Day', 'National Great American Pot Pie Day'],
  '09-24': ['National Punctuation Day', 'National Cherries Jubilee Day'],
  '09-25': ['National Lobster Day', 'National Comic Book Day'],
  '09-26': ['National Pancake Day', 'National Key Lime Pie Day'],
  '09-27': ['National Chocolate Milk Day', 'National Corned Beef Hash Day'],
  '09-28': ['National Good Neighbor Day', 'National Strawberry Cream Pie Day'],
  '09-29': ['National Coffee Day', 'National Biscotti Day'],
  '09-30': ['National Chewing Gum Day', 'National Hot Mulled Cider Day'],
    '10-01': ['National Homemade Cookies Day', 'National Hair Day'],
  '10-02': ['National Name Your Car Day', 'National Fried Scallops Day'],
  '10-03': ['National Boyfriend Day', 'National Techies Day'],
  '10-04': ['National Taco Day', 'National Cinnamon Roll Day'],
  '10-05': ['National Do Something Nice Day', 'National Apple Betty Day'],
  '10-06': ['National Noodle Day', 'National Coaches Day'],
  '10-07': ['National Frappe Day', 'National Inner Beauty Day'],
  '10-08': ['National Fluffernutter Day', 'National Pierogi Day'],
  '10-09': ['National Moldy Cheese Day', 'National Leif Erikson Day'],
  '10-10': ['National Cake Decorating Day', 'National Angel Food Cake Day'],
  '10-11': ['National Sausage Pizza Day', 'National Coming Out Day'],
  '10-12': ['National Gumbo Day', 'National Farmer\'s Day'],
  '10-13': ['National M&M Day', 'National Train Your Brain Day'],
  '10-14': ['National Dessert Day', 'National Fossil Day'],
  '10-15': ['National Cheese Curd Day', 'National Grouch Day'],
  '10-16': ['National Liqueur Day', 'National Dictionary Day'],
  '10-17': ['National Pasta Day', 'National Mulligan Day'],
  '10-18': ['National Chocolate Cupcake Day', 'National No Beard Day'],
  '10-19': ['National Seafood Bisque Day', 'National New Friends Day'],
  '10-20': ['National Brandied Fruit Day', 'National Chicken and Waffles Day'],
  '10-21': ['National Pumpkin Cheesecake Day', 'National Reptile Awareness Day'],
  '10-22': ['National Nut Day', 'National Make a Dog\'s Day'],
  '10-23': ['National Boston Cream Pie Day', 'National Mole Day'],
  '10-24': ['National Food Day', 'National Bologna Day'],
  '10-25': ['National Greasy Foods Day', 'National Art Day'],
  '10-26': ['National Pumpkin Day', 'National Mincemeat Day'],
  '10-27': ['National American Beer Day', 'National Black Cat Day'],
  '10-28': ['National Chocolate Day', 'National First Responders Day'],
  '10-29': ['National Oatmeal Day', 'National Cat Day'],
  '10-30': ['National Candy Corn Day', 'National Checklist Day'],
  '10-31': ['Halloween', 'National Caramel Apple Day'],

  '11-01': ['National Cinnamon Day', 'National Cook for Your Pets Day'],
  '11-02': ['National Deviled Egg Day', 'National Ohio Day'],
  '11-03': ['National Sandwich Day', 'National Housewife\'s Day'],
  '11-04': ['National Candy Day', 'National Chicken Lady Day'],
  '11-05': ['National Doughnut Day', 'National Love Your Red Hair Day'],
  '11-06': ['National Nachos Day', 'National Saxophone Day'],
  '11-07': ['National Bittersweet Chocolate with Almonds Day', 'National Canine Lymphoma Awareness Day'],
  '11-08': ['National Cappuccino Day', 'National Harvey Wallbanger Day'],
  '11-09': ['National Scrapple Day', 'National Louisiana Day'],
  '11-10': ['National Vanilla Cupcake Day', 'National Forget-Me-Not Day'],
  '11-11': ['Veterans Day', 'National Sundae Day'],
  '11-12': ['National French Dip Day', 'National Pizza with the Works Except Anchovies Day'],
  '11-13': ['World Kindness Day', 'National Indian Pudding Day'],
  '11-14': ['National Pickle Day', 'National Spicy Guacamole Day'],
  '11-15': ['National Bundt Day', 'National Clean Out Your Refrigerator Day'],
  '11-16': ['National Fast Food Day', 'National Button Day'],
  '11-17': ['National Homemade Bread Day', 'National Take a Hike Day'],
  '11-18': ['National Vichyssoise Day', 'National Princess Day'],
  '11-19': ['National Carbonated Beverage with Caffeine Day', 'National Play Monopoly Day'],
  '11-20': ['National Peanut Butter Fudge Day', 'National Absurdity Day'],
  '11-21': ['National Stuffing Day', 'National Gingerbread Cookie Day'],
  '11-22': ['National Cranberry Relish Day', 'National Go for a Ride Day'],
  '11-23': ['National Espresso Day', 'National Cashew Day'],
  '11-24': ['National Sardines Day', 'Celebrate Your Unique Talent Day'],
  '11-25': ['National Parfait Day', 'National Play Day with Dad'],
  '11-26': ['National Cake Day', 'National Jukebox Day'],
  '11-27': ['National Bavarian Cream Pie Day', 'National Craft Jerky Day'],
  '11-28': ['National French Toast Day', 'National Red Planet Day'],
  '11-29': ['National Lemon Cream Pie Day', 'Electronic Greetings Day'],
  '11-30': ['National Mousse Day', 'National Mason Jar Day'],

  '12-01': ['National Pie Day', 'National Eat a Red Apple Day'],
  '12-02': ['National Fritters Day', 'National Mutt Day'],
  '12-03': ['National Roof Over Your Head Day', 'National Green Bean Casserole Day'],
  '12-04': ['National Cookie Day', 'National Sock Day'],
  '12-05': ['National Sacher Torte Day', 'National Bathtub Party Day'],
  '12-06': ['National Gazpacho Day', 'National Microwave Oven Day'],
  '12-07': ['National Cotton Candy Day', 'National Pearl Harbor Remembrance Day'],
  '12-08': ['National Brownie Day', 'National Blue Collar Day'],
  '12-09': ['National Pastry Day', 'National Christmas Card Day'],
  '12-10': ['National Lager Day', 'Dewey Decimal System Day'],
  '12-11': ['National Noodle Ring Day', 'National App Day'],
  '12-12': ['National Ambrosia Day', 'National Poinsettia Day'],
  '12-13': ['National Cocoa Day', 'National Violin Day'],
  '12-14': ['National Bouillabaisse Day', 'National Monkey Day'],
  '12-15': ['National Cupcake Day', 'National Wear Your Pearls Day'],
  '12-16': ['National Chocolate Covered Anything Day', 'National Ugly Christmas Sweater Day'],
  '12-17': ['National Maple Syrup Day', 'Wright Brothers Day'],
  '12-18': ['National Roast Suckling Pig Day', 'National Twin Day'],
  '12-19': ['National Hard Candy Day', 'National Oatmeal Muffin Day'],
  '12-20': ['National Sangria Day', 'National Games Day'],
  '12-21': ['National French Fried Shrimp Day', 'National Crossword Puzzle Day'],
  '12-22': ['National Date Nut Bread Day', 'National Cookie Exchange Day'],
  '12-23': ['National Pfeffernüsse Day', 'Festivus'],
  '12-24': ['National Eggnog Day', 'Christmas Eve'],
  '12-25': ['Christmas Day', 'National Pumpkin Pie Day'],
  '12-26': ['National Candy Cane Day', 'National Thank-You Note Day'],
  '12-27': ['National Fruitcake Day', 'National Visit the Zoo Day'],
  '12-28': ['National Chocolate Candy Day', 'National Card Playing Day'],
  '12-29': ['National Pepper Pot Day', 'Tick Tock Day'],
  '12-30': ['National Bacon Day', 'National Resolution Planning Day'],
  '12-31': ['New Year\'s Eve', 'National Champagne Day']
};

const nationalFallback = [
  'Something worth celebrating today!'
];

async function getNationalDays(date) {
  const key = date.slice(5); // converts YYYY-MM-DD into MM-DD
  return nationalDays[key] || nationalFallback;
}


   
function idx(date,salt,len){ const h=crypto.createHash('sha256').update(date+salt).digest(); return h.readUInt32BE(0)%len; }
async function getDailyDevotional(date, fallbackVerse) {
  const d = new Date(date + 'T12:00:00');
  const day = d.getDay();
  // Monday-Friday: Pastor Rick
  if (day >= 1 && day <= 5) {
    try {
      const listingUrl = 'https://www.pastorrick.com/current-teaching/devotionals';

const response = await fetch(listingUrl);


const html = await response.text();

      // Find the first current devotional URL on the page.
      const linkMatch = html.match(/href="([^"]*\/current-teaching\/devotional\/[^"]+)"/i);

      if (linkMatch) {
        const url = new URL(linkMatch[1], 'https://www.pastorrick.com').href;
        const page = await fetch(url);
        const pageHtml = await page.text();

        // Look for a quoted Bible verse followed by a reference.
        const plainText = pageHtml
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&quot;/g, '"')
  .replace(/&#34;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&amp;/g, '&')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const verseMatch = plainText.match(
  /[“"]([^”"]+)[”"]\s*([1-3]?\s?[A-Za-z]+\s+\d+:\d+(?:-\d+)?)\s*(?:\(([A-Z]+)\))?/i
);

        if (verseMatch) {
          return {
            text: verseMatch[1].trim(),
            reference: verseMatch[2].trim(),
            url
          };
        }
      }
    } catch (e) {
  console.log('Daily Hope fetch failed:', e.message);
}
  }

  // Saturday-Sunday: Our Daily Bread
if (day === 0 || day === 6) {
  try {
    const listingUrl = 'https://www.odbm.org/en-GB/devotional';
    const response = await fetch(listingUrl);
    const html = await response.text();
const d = new Date(date + 'T12:00:00');
const dayNumber = String(d.getDate()).padStart(2, '0');
const monthName = d.toLocaleString('en-GB', { month: 'short' });
const year = d.getFullYear();

const dateLabel = `${dayNumber} ${monthName} ${year}`;
const datePos = html.indexOf(dateLabel);

if (datePos >= 0) {
  const section = html.slice(datePos, datePos + 4000);

  const descriptionMatch = section.match(
    /"description":"((?:\\.|[^"\\])*)"/
  );

  const urlMatch = section.match(
    /"url":"([^"]*\/devotional\/[^"]+)"/
  );

  if (descriptionMatch && urlMatch) {
    let description = descriptionMatch[1]
      .replace(/\\u0027/g, "'")
      .replace(/\\u0026/g, '&')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .trim();

    const verseParts = description.match(
      /^(.*?)\s+([1-3]?\s?[A-Za-z]+(?:\s+[A-Za-z]+)*\s+\d+:\d+(?:-\d+)?)$/
    );

    if (verseParts) {
      return {
        text: verseParts[1].trim(),
        reference: verseParts[2].trim(),
        url: new URL(urlMatch[1], 'https://www.odbm.org').href
      };
    }
  }
}
  } catch (e) {
    console.log('Our Daily Bread fetch failed:', e.message);
  }
}

  return {
    reference: fallbackVerse[0],
    text: fallbackVerse[1],
    url: fallbackVerse[2]
  };
}
async function getFamousBirthdays(date) {
  try {
    const d = new Date(date + 'T12:00:00');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    const url =
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${month}/${day}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'DailyCrumbs/1.0 (getdailycrumbs.com)'
      }
    });

    if (!response.ok) return [];

    const data = await response.json();
    const currentYear = new Date().getFullYear();

    const preferredWords = [
      'actor', 'actress', 'singer', 'musician', 'rapper', 'comedian',
      'athlete', 'football', 'basketball', 'baseball', 'hockey',
      'golfer', 'tennis', 'writer', 'author', 'director', 'producer',
      'artist', 'scientist', 'inventor', 'astronaut', 'television',
      'radio', 'model', 'chef', 'dancer'
    ];

    const people = (data.births || [])
      .filter(person => {
        const age = currentYear - person.year;
        const text = (person.text || '').toLowerCase();

        return (
          person.year >= 1900 &&
          age >= 18 &&
          person.text &&
          !text.includes('politician') &&
          !text.includes('royal')
        );
      })
      .map(person => {
        const text = (person.text || '').toLowerCase();
        const page = person.pages?.[0];

        let score = 0;

        if (page?.extract) score += Math.min(page.extract.length / 20, 15);

        preferredWords.forEach(word => {
          if (text.includes(word)) score += 3;
        });

        if (person.year >= 1940 && person.year <= 1995) score += 4;
        if (person.year >= 1960 && person.year <= 1990) score += 3;

        return {
          name: page?.titles?.normalized || '',
          year: person.year,
          description: person.text,
          score
        };
      })
      .filter(person => person.name)
      .sort((a, b) => b.score - a.score);

    const strong = people.filter(person => person.score >= 7);

    const chosen =
      strong.length >= 3
        ? strong.slice(0, Math.min(5, strong.length))
        : people.slice(0, 4);

    return chosen.map(({ name, year, description }) => ({
      name,
      year,
      description
    }));

  } catch (e) {
    console.log('Wikipedia birthdays failed:', e.message);
    return [];
  }
}
async function getUSHistory(date) {
  try {
    const d = new Date(date + 'T12:00:00');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    const url =
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'DailyCrumbs/1.0 (getdailycrumbs.com)'
      }
    });

    if (!response.ok) return null;

    const data = await response.json();

    const usTerms = [
      'United States',
      'American',
      'U.S.',
      'US ',
      'Washington, D.C.',
      'President',
      'Congress',
      'Supreme Court',
      'New York',
      'California',
      'Texas',
      'Florida',
      'Minnesota'
    ];

    const events = (data.events || [])
      .filter(event => {
        const text = event.text || '';
        return usTerms.some(term =>
          text.toLowerCase().includes(term.toLowerCase())
        );
      })
      .map(event => ({
        year: event.year,
        text: event.text
      }));

    return events.length ? events[0] : null;

  } catch (e) {
    console.log('US history fetch failed:', e.message);
    return null;
  }
}
async function daily(date){
  const d = new Date(date + 'T12:00:00');

const startOfYear = new Date(d.getFullYear(), 0, 0);

const dayOfYear = Math.floor(
  (d - startOfYear) / 86400000
);

const dailyIndex = (dayOfYear - 1) % 365;
  const joke = jokes[dailyIndex];
  const verse = verses[idx(date,'v',verses.length)];
  const devotionalVerse = await getDailyDevotional(date, verse);
  console.log('NATIONAL DAY DEBUG:', date, 'KEY:', String(date).slice(5));
  const national = await getNationalDays(date);
  const famousBirthdays = await getFamousBirthdays(date);
  const usHistory = await getUSHistory(date);
  const quiz = quizzes[dailyIndex];
  const wyr = wouldYouRather[dailyIndex];
const riddle = riddles[dailyIndex];
const tip = dailyTips[dailyIndex];

const previewCuriosity = {
  '2026-08-28': curiosityPreview[0], // Friday - Glass
  '2026-08-29': curiosityPreview[1], // Saturday - Rubber
  '2026-08-30': curiosityPreview[2]  // Sunday - Mirror
};

let curiosityWeek;
let curiosityDay;

if (previewCuriosity[date]) {
  curiosityWeek = { theme: 'Everyday Mysteries' };
  curiosityDay = previewCuriosity[date];
} else {
  const curiosityStartDate = new Date('2026-08-31T12:00:00');

  const curiosityDaysSinceStart = Math.floor(
    (d.getTime() - curiosityStartDate.getTime()) / 86400000
  );

  const safeCuriosityDay =
    ((curiosityDaysSinceStart % 364) + 364) % 364;

  const curiosityWeekIndex =
    Math.floor(safeCuriosityDay / 7) % curiosityWeeks.length;

  const curiosityDayIndex =
    safeCuriosityDay % 7;

  curiosityWeek = curiosityWeeks[curiosityWeekIndex];
  curiosityDay = curiosityWeek.days[curiosityDayIndex];
}

const topic = {
  theme: curiosityWeek.theme,
  headline: curiosityDay.headline || '',
  text: curiosityDay.text,
  teaser: curiosityDay.teaser
};
  return {
    date,
    joke: {
      setup: joke[0],
      punchline: joke[1]
    },
   verse: devotionalVerse,
fact: facts[dailyIndex],
icebreaker: questions[dailyIndex],
topic,
national,
famousBirthdays,
usHistory,
quiz,
wyr,
riddle,
tip
  };
}

const server=http.createServer(async(req,res)=>{
  const u=new URL(req.url,`http://${req.headers.host}`);
  const requestHost = (req.headers.host || '').toLowerCase();

if (requestHost === 'daily-crumbs.onrender.com') {
  res.writeHead(301, {
    Location: `https://getdailycrumbs.com${u.pathname}${u.search}`
  });
  res.end();
  return;
}
  console.log('REQUEST:', req.method, u.pathname);
  // Default homepage
if (u.pathname === '/') {
  res.writeHead(302, {
    Location: '/fergusfalls'
  });
  res.end();
  return;
}
  // Track restaurant-specific QR scans
if (
  req.method === 'POST' &&
  u.pathname === '/api/qr-scan'
) {
  try {
    const scan = await body(req);
    const qrSlug = (scan.qrSlug || '').trim();

    if (!qrSlug) {
      return send(res, 400, {
        success: false,
        error: 'QR location is required'
      });
    }

    const secretKey = process.env.SUPABASE_SECRET_KEY;
const supabaseUrl = process.env.SUPABASE_URL;

// Look up the participating location using the REST API.
// The new sb_secret_ key is sent only as an API key.
const locationResponse = await fetch(
  `${supabaseUrl}/rest/v1/locations` +
  `?select=id,edition_id,qr_slug,active` +
  `&qr_slug=eq.${encodeURIComponent(qrSlug)}` +
  `&active=eq.true` +
  `&limit=1`,
  {
    headers: {
      apikey: secretKey
    }
  }
);

if (!locationResponse.ok) {
  const errorText = await locationResponse.text();

  console.error(
    'QR location lookup failed:',
    locationResponse.status,
    errorText
  );

  return send(res, 500, {
    success: false,
    error: 'Could not record scan'
  });
}

const locations = await locationResponse.json();
const location = locations[0];

if (!location) {
  return send(res, 404, {
    success: false,
    error: 'Participating location not found'
  });
}

// Record the scan.
const scanResponse = await fetch(
  `${supabaseUrl}/rest/v1/qr_scans`,
  {
    method: 'POST',
    headers: {
      apikey: secretKey,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({
      location_id: location.id,
      edition_id: location.edition_id,
      qr_slug: location.qr_slug
    })
  }
);

if (!scanResponse.ok) {
  const errorText = await scanResponse.text();

  console.error(
    'QR scan insert failed:',
    scanResponse.status,
    errorText
  );

  return send(res, 500, {
    success: false,
    error: 'Could not record scan'
  });
}

    return send(res, 201, {
      success: true
    });

  } catch (error) {
    console.error('QR scan failed:', error);

    return send(res, 400, {
      success: false,
      error: 'Invalid QR scan'
    });
  }
}
  if (u.pathname === '/login') {
  const file = safeFile('login.html');

  if (!file) {
    return send(res, 404, 'Not found', 'text/plain');
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  res.end(fs.readFileSync(file));
  return;
}
  if (u.pathname === '/api/locations' && req.method === 'GET') {
  try {
    const secretKey = process.env.SUPABASE_SECRET_KEY;
const supabaseUrl = process.env.SUPABASE_URL;

const response = await fetch(
  `${supabaseUrl}/rest/v1/locations?select=id,business_name,address,website_url,contact_name,contact_info,qr_placement,logo_url,notes,date_joined,last_checked,active,editions(name)&order=business_name.asc`,
  {
    headers: {
      apikey: secretKey
    }
  }
);

if (!response.ok) {
  const errorText = await response.text();
  throw new Error(
    `Locations REST request failed: ${response.status} ${errorText}`
  );
}

const data = await response.json();

    const locations = (data || []).map(location => ({
      id: location.id,
      name: location.business_name,
      edition: location.editions?.name || '',
      address: location.address || '',
      url: location.website_url || '',
      contact: location.contact_name || '',
      contactInfo: location.contact_info || '',
      qrPlacement: location.qr_placement || '',
      logo: location.logo_url || '',
      notes: location.notes || '',
      dateJoined: location.date_joined || '',
      lastChecked: location.last_checked || '',
      active: location.active
    }));

    return send(res, 200, locations);

  } catch (error) {
    console.error('Locations load failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not load participating locations'
    });
  }
}
if (
  u.pathname.startsWith('/api/locations/') &&
  u.pathname.endsWith('/checked') &&
  req.method === 'POST'
) {
  const parts = u.pathname.split('/');
  const id = parts[3];

  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from('locations')
    .update({
      last_checked: today,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Supabase location check-in failed:', error.message);

    return send(res, 500, {
      success: false,
      error: 'Could not update location'
    });
  }

  return send(res, 200, {
    success: true,
    location: {
      id: data.id,
      lastChecked: data.last_checked
    }
  });
}
if (
  u.pathname === '/api/qr-analytics' &&
  req.method === 'GET'
) {
  try {
    const authHeader = req.headers.authorization || '';

    if (!authHeader.startsWith('Bearer ')) {
      return send(res, 401, {
        success: false,
        error: 'Authentication required'
      });
    }

    const accessToken = authHeader.slice(7);

    const secretKey = process.env.SUPABASE_SECRET_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;

    // Verify the logged-in Supabase user.
    const userResponse = await fetch(
      `${supabaseUrl}/auth/v1/user`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (!userResponse.ok) {
      return send(res, 401, {
        success: false,
        error: 'Invalid session'
      });
    }

    const user = await userResponse.json();

    // Load the user's Daily Crumbs profile.
    const profileResponse = await fetch(
      `${supabaseUrl}/rest/v1/profiles` +
      `?select=id,full_name,role,active` +
      `&id=eq.${encodeURIComponent(user.id)}` +
      `&limit=1`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      console.error(
        'QR analytics profile lookup failed:',
        profileResponse.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not load user profile'
      });
    }

    const profiles = await profileResponse.json();
    const profile = profiles[0];

    if (!profile || profile.active === false) {
      return send(res, 403, {
        success: false,
        error: 'Access denied'
      });
    }

    const isOwner = profile.role === 'owner';

    // Determine which editions this user may see.
    let allowedEditionIds = [];

    if (!isOwner) {
      const assignmentsResponse = await fetch(
        `${supabaseUrl}/rest/v1/user_editions` +
        `?select=edition_id` +
        `&user_id=eq.${encodeURIComponent(user.id)}`,
        {
          headers: {
            apikey: secretKey,
            Authorization: `Bearer ${secretKey}`
          }
        }
      );

      if (!assignmentsResponse.ok) {
        const errorText = await assignmentsResponse.text();

        console.error(
          'QR analytics edition assignment lookup failed:',
          assignmentsResponse.status,
          errorText
        );

        return send(res, 500, {
          success: false,
          error: 'Could not load edition permissions'
        });
      }

      const assignments = await assignmentsResponse.json();

      allowedEditionIds = (assignments || [])
        .map(item => item.edition_id)
        .filter(Boolean);
    }

    // Load editions.
    const editionsResponse = await fetch(
      `${supabaseUrl}/rest/v1/editions` +
      `?select=id,name,slug` +
      `&order=name.asc`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    if (!editionsResponse.ok) {
      const errorText = await editionsResponse.text();

      console.error(
        'QR analytics editions lookup failed:',
        editionsResponse.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not load editions'
      });
    }

    let editions = await editionsResponse.json();

    if (!isOwner) {
      editions = (editions || []).filter(edition =>
        allowedEditionIds.includes(edition.id)
      );
    }

    const requestedEditionId =
      (u.searchParams.get('edition_id') || '').trim();

    if (
      requestedEditionId &&
      !isOwner &&
      !allowedEditionIds.includes(requestedEditionId)
    ) {
      return send(res, 403, {
        success: false,
        error: 'You do not have access to this edition'
      });
    }

    // Load participating locations.
    let locationsUrl =
      `${supabaseUrl}/rest/v1/locations` +
      `?select=id,business_name,qr_slug,qr_placement,edition_id,active`;

    if (requestedEditionId) {
      locationsUrl +=
        `&edition_id=eq.${encodeURIComponent(requestedEditionId)}`;
    }

    const locationsResponse = await fetch(
      locationsUrl,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    if (!locationsResponse.ok) {
      const errorText = await locationsResponse.text();

      console.error(
        'QR analytics locations lookup failed:',
        locationsResponse.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not load locations'
      });
    }

    let locations = await locationsResponse.json();

    if (!isOwner) {
      locations = (locations || []).filter(location =>
        allowedEditionIds.includes(location.edition_id)
      );
    }

    // Load scan history.
    let scansUrl =
      `${supabaseUrl}/rest/v1/qr_scans` +
      `?select=id,location_id,edition_id,qr_slug,scanned_at` +
      `&order=scanned_at.desc`;


    const scansResponse = await fetch(
      scansUrl,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    if (!scansResponse.ok) {
      const errorText = await scansResponse.text();

      console.error(
        'QR analytics scans lookup failed:',
        scansResponse.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not load QR scans'
      });
    }

    let scans = await scansResponse.json();

    const allowedLocationIds = new Set(
  (locations || []).map(location => location.id).filter(Boolean)
);

const allowedQrSlugs = new Set(
  (locations || []).map(location => location.qr_slug).filter(Boolean)
);

if (!isOwner) {
  scans = (scans || []).filter(scan => {
    if (scan.location_id) {
      return allowedLocationIds.has(scan.location_id);
    }

    if (scan.qr_slug) {
      return allowedQrSlugs.has(scan.qr_slug);
    }

    return false;
  });
}

    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const sevenDaysAgo = new Date(startOfToday);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const thirtyDaysAgo = new Date(startOfToday);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);

    const parsedScans = (scans || []).map(scan => ({
      ...scan,
      scanDate: new Date(scan.scanned_at)
    }));

    const summary = {
      total: parsedScans.length,
      today: parsedScans.filter(scan =>
        scan.scanDate >= startOfToday
      ).length,
      last7Days: parsedScans.filter(scan =>
        scan.scanDate >= sevenDaysAgo
      ).length,
      last30Days: parsedScans.filter(scan =>
        scan.scanDate >= thirtyDaysAgo
      ).length
    };

    const editionNameById = new Map(
      (editions || []).map(edition => [
        edition.id,
        edition.name
      ])
    );

    const rows = (locations || []).map(location => {
      const matchingScans = parsedScans.filter(scan =>
        scan.location_id === location.id ||
        (
          !scan.location_id &&
          scan.qr_slug === location.qr_slug
        )
      );

      const latestScan =
        matchingScans.length > 0
          ? matchingScans
              .map(scan => scan.scanDate)
              .sort((a, b) => b - a)[0]
          : null;

      return {
        locationId: location.id,
        businessName: location.business_name || '',
        editionId: location.edition_id || '',
        editionName:
          editionNameById.get(location.edition_id) || '',
        qrSlug: location.qr_slug || '',
        qrPlacement: location.qr_placement || '',
        active: location.active !== false,
        totalScans: matchingScans.length,
        last30Days: matchingScans.filter(scan =>
          scan.scanDate >= thirtyDaysAgo
        ).length,
        lastScan: latestScan
          ? latestScan.toISOString()
          : null
      };
    });

    rows.sort((a, b) =>
      b.totalScans - a.totalScans ||
      a.businessName.localeCompare(b.businessName)
    );

    return send(res, 200, {
      success: true,
      role: profile.role,
      isOwner,
      editions,
      selectedEditionId: requestedEditionId || null,
      summary,
      rows
    });
  } catch (error) {
    console.error('QR analytics failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not load QR analytics'
    });
  }
}
if (
  u.pathname === '/api/edition-managers' &&
  req.method === 'GET'
) {
  try {
    const authHeader = req.headers.authorization || '';

if (!authHeader.startsWith('Bearer ')) {
  return send(res, 401, {
    success: false,
    error: 'Authentication required'
  });
}

const accessToken = authHeader.slice(7);

const secretKey = process.env.SUPABASE_SECRET_KEY;
const supabaseUrl = process.env.SUPABASE_URL;

const userResponse = await fetch(
  `${supabaseUrl}/auth/v1/user`,
  {
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${accessToken}`
    }
  }
);

if (!userResponse.ok) {
  return send(res, 401, {
    success: false,
    error: 'Invalid login'
  });
}

const user = await userResponse.json();

const profileResponse = await fetch(
  `${supabaseUrl}/rest/v1/profiles` +
  `?id=eq.${encodeURIComponent(user.id)}` +
  `&select=id,role,active`,
  {
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`
    }
  }
);

if (!profileResponse.ok) {
  return send(res, 403, {
    success: false,
    error: 'Could not verify account access'
  });
}

const profileRows = await profileResponse.json();
const profile = profileRows[0];

if (
  !profile ||
  profile.active === false ||
  profile.role !== 'owner'
) {
  return send(res, 403, {
    success: false,
    error: 'Owner access required'
  });
}

    const profilesResponse = await fetch(
      `${supabaseUrl}/rest/v1/profiles` +
      `?select=id,full_name,role,active` +
      `&role=eq.edition_admin`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    if (!profilesResponse.ok) {
      const errorText = await profilesResponse.text();

      console.error(
        'Edition manager profiles load failed:',
        profilesResponse.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not load Edition Managers'
      });
    }

    const profiles = await profilesResponse.json();
const authUsersResponse = await fetch(
  `${supabaseUrl}/auth/v1/admin/users`,
  {
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`
    }
  }
);

if (!authUsersResponse.ok) {
  const errorText = await authUsersResponse.text();

  console.error(
    'Edition manager auth users load failed:',
    authUsersResponse.status,
    errorText
  );

  return send(res, 500, {
    success: false,
    error: 'Could not load Edition Manager emails'
  });
}

const authUsersData = await authUsersResponse.json();

const emailByUserId = new Map(
  (authUsersData.users || []).map(user => [
    user.id,
    user.email || ''
  ])
);
    const assignmentsResponse = await fetch(
      `${supabaseUrl}/rest/v1/user_editions` +
      `?select=user_id,edition_id`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    if (!assignmentsResponse.ok) {
      const errorText = await assignmentsResponse.text();

      console.error(
        'Edition manager assignments load failed:',
        assignmentsResponse.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not load Edition assignments'
      });
    }

    const assignments = await assignmentsResponse.json();

    const editionsResponse = await fetch(
      `${supabaseUrl}/rest/v1/editions` +
      `?select=id,name`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    if (!editionsResponse.ok) {
      const errorText = await editionsResponse.text();

      console.error(
        'Edition names load failed:',
        editionsResponse.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not load Edition names'
      });
    }

    const editions = await editionsResponse.json();

    const editionById = new Map(
      editions.map(edition => [edition.id, edition.name])
    );

    const managers = profiles.flatMap(profile => {
      const userAssignments = assignments.filter(
        assignment => assignment.user_id === profile.id
      );

      if (!userAssignments.length) {
        return [{
          id: profile.id,
          full_name: profile.full_name,
          email: emailByUserId.get(profile.id) || '',
          edition_name: '',
          active: profile.active
        }];
      }

      return userAssignments.map(assignment => ({
        id: profile.id,
        full_name: profile.full_name,
        email: emailByUserId.get(profile.id) || '',
        edition_name:
          editionById.get(assignment.edition_id) || '',
        active: profile.active
      }));
    });

    return send(res, 200, managers);

  } catch (error) {
    console.error('Edition manager load failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not load Edition Managers'
    });
  }
}
if (
  u.pathname === '/api/edition-managers' &&
  req.method === 'POST'
) {
  try {
    const authHeader = req.headers.authorization || '';

    if (!authHeader.startsWith('Bearer ')) {
      return send(res, 401, {
        success: false,
        error: 'Authentication required'
      });
    }

    const accessToken = authHeader.slice(7);

    const secretKey = process.env.SUPABASE_SECRET_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;

    const userResponse = await fetch(
      `${supabaseUrl}/auth/v1/user`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (!userResponse.ok) {
      return send(res, 401, {
        success: false,
        error: 'Invalid login'
      });
    }

    const ownerUser = await userResponse.json();

    const ownerProfileResponse = await fetch(
      `${supabaseUrl}/rest/v1/profiles` +
      `?id=eq.${encodeURIComponent(ownerUser.id)}` +
      `&select=id,role,active`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    const ownerProfiles = await ownerProfileResponse.json();
    const ownerProfile = ownerProfiles[0];

    if (
      !ownerProfile ||
      ownerProfile.active === false ||
      ownerProfile.role !== 'owner'
    ) {
      return send(res, 403, {
        success: false,
        error: 'Owner access required'
      });
    }

    const payload = await body(req);

    const name = payload.name?.trim();
    const email = payload.email?.trim().toLowerCase();
    const editionSlug = payload.editionSlug?.trim();
    const active = payload.active !== false;

    if (!name || !email || !editionSlug) {
      return send(res, 400, {
        success: false,
        error: 'Name, email, and Edition are required'
      });
    }

    const editionResponse = await fetch(
      `${supabaseUrl}/rest/v1/editions` +
      `?slug=eq.${encodeURIComponent(editionSlug)}` +
      `&select=id,name`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    const editionRows = await editionResponse.json();
    const edition = editionRows[0];

    if (!edition) {
      return send(res, 404, {
        success: false,
        error: 'Edition not found'
      });
    }

    const createUserResponse = await fetch(
      `${supabaseUrl}/auth/v1/admin/users`,
      {
        method: 'POST',
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          email_confirm: true,
          user_metadata: {
            full_name: name
          }
        })
      }
    );

    const createdUser = await createUserResponse.json();

    if (!createUserResponse.ok) {
      return send(res, createUserResponse.status, {
        success: false,
        error:
          createdUser.msg ||
          createdUser.message ||
          'Could not create manager login'
      });
    }

    const profileResponse = await fetch(
      `${supabaseUrl}/rest/v1/profiles`,
      {
        method: 'POST',
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify({
          id: createdUser.id,
          full_name: name,
          role: 'edition_admin',
          active
        })
      }
    );

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();

      console.error(
        'Edition manager profile create failed:',
        errorText
      );
await fetch(
  `${supabaseUrl}/auth/v1/admin/users/${createdUser.id}`,
  {
    method: 'DELETE',
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`
    }
  }
);
      return send(res, 500, {
        success: false,
        error: 'Manager login was created, but profile setup failed'
      });
    }

    const assignmentResponse = await fetch(
      `${supabaseUrl}/rest/v1/user_editions`,
      {
        method: 'POST',
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify({
          user_id: createdUser.id,
          edition_id: edition.id
        })
      }
    );

    if (!assignmentResponse.ok) {
      const errorText = await assignmentResponse.text();

      console.error(
        'Edition manager assignment create failed:',
        errorText
      );
await fetch(
  `${supabaseUrl}/auth/v1/admin/users/${createdUser.id}`,
  {
    method: 'DELETE',
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`
    }
  }
);
      return send(res, 500, {
        success: false,
        error:
          'Manager was created, but Edition assignment failed'
      });
    }

    return send(res, 201, {
      success: true,
      manager: {
        id: createdUser.id,
        full_name: name,
        email,
        edition_name: edition.name,
        active
      }
    });

  } catch (error) {
    console.error('Edition manager create failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not add Edition Manager'
    });
  }
}
 if (u.pathname === '/api/locations' && req.method === 'POST') {
  try {
    const location = await body(req);

    if (!location.name || !location.name.trim()) {
      return send(res, 400, {
        success: false,
        error: 'Business name is required'
      });
    }
const qrSlug = location.name
  .trim()
  .toLowerCase()
  .replace(/['’]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');
    // Find the edition by its name or slug.
    const editionValue = (location.edition || 'Fergus Falls').trim();

    const { data: editions, error: editionError } = await supabase
      .from('editions')
      .select('id, name, slug');

    if (editionError) {
      console.error('Edition lookup failed:', editionError.message);
      return send(res, 500, {
        success: false,
        error: 'Could not find edition'
      });
    }

    const edition = (editions || []).find(e =>
      e.name.toLowerCase() === editionValue.toLowerCase() ||
      e.slug.toLowerCase() === editionValue.toLowerCase().replace(/\s+/g, '')
    );

    if (!edition) {
      return send(res, 400, {
        success: false,
        error: 'Edition not found'
      });
    }

    const { data, error } = await supabase
      .from('locations')
      .insert({
        edition_id: edition.id,
        business_name: location.name.trim(),
        qr_slug: qrSlug,
        address: location.address || null,
        website_url: location.url || null,
        contact_name: location.contact || null,
        contact_info: location.contactInfo || null,
        qr_placement: location.qrPlacement || null,
        logo_url: location.logo || null,
        notes: location.notes || null,
        active: location.active !== false,
        date_joined: new Date().toISOString().slice(0, 10)
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase location insert failed:', error.message);
      return send(res, 500, {
        success: false,
        error: 'Could not add participating location'
      });
    }

    return send(res, 201, {
      success: true,
      location: {
        id: data.id,
        name: data.business_name
      }
    });

  } catch (error) {
    console.error('Location creation failed:', error);

    return send(res, 400, {
      success: false,
      error: 'Invalid location information'
    });
  }
}
if (
  u.pathname.startsWith('/api/locations/') &&
  req.method === 'PUT'
) {
  try {
    const parts = u.pathname.split('/');
    const id = parts[3];

    const update = await body(req);

    if (!id) {
      return send(res, 400, {
        success: false,
        error: 'Location id is required'
      });
    }

    const secretKey = process.env.SUPABASE_SECRET_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;

    const payload = {
      business_name: update.name?.trim() || '',
      address: update.address || null,
      website_url: update.url || null,
      contact_name: update.contact || null,
      contact_info: update.contactInfo || null,
      qr_placement: update.qrPlacement || null,
      notes: update.notes || null,
      active: update.active !== false
    };

    // Only replace the logo when a new one was actually uploaded.
    if (update.logo) {
      payload.logo_url = update.logo;
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/locations?id=eq.${encodeURIComponent(id)}`,
      {
        method: 'PATCH',
        headers: {
          apikey: secretKey,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        'Location update failed:',
        response.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not update location'
      });
    }

    const updated = await response.json();

    return send(res, 200, {
      success: true,
      location: updated[0] || null
    });

  } catch (error) {
    console.error('Location update failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not update location'
    });
  }
}
 if (u.pathname === '/contact') {
  const file = safeFile('contact.html');

  if (!file) {
    return send(res, 404, 'Not found', 'text/plain');
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  res.end(fs.readFileSync(file));
  return;
}
  if(u.pathname==='/api/content'){ const date=u.searchParams.get('date')||new Date().toISOString().slice(0,10); return send(res,200,await daily(date)); }
 if (u.pathname === '/api/vote' && req.method === 'GET') {
  try {
    const contentId = u.searchParams.get('date');

    if (!contentId) {
      return send(res, 400, { error: 'Missing vote ID' });
    }

    const { data, error } = await supabase
      .from('content_votes')
      .select('choice')
      .eq('vote_type', 'wyr')
      .eq('content_id', contentId);

    if (error) throw error;

    let a = 0;
    let b = 0;

    for (const vote of data || []) {
      if (vote.choice === 'a') a++;
      if (vote.choice === 'b') b++;
    }

    return send(res, 200, {
      a,
      b,
      total: a + b
    });

  } catch (error) {
    console.error('Would You Rather vote lookup failed:', error);

    return send(res, 500, {
      error: 'Could not load voting results'
    });
  }
}
 if (u.pathname === '/api/vote' && req.method === 'POST') {
  try {
    const p = await body(req);

    const contentId = p.date;
    const choice = p.choice;

    if (!contentId || !['a', 'b'].includes(choice)) {
      return send(res, 400, {
        error: 'Invalid vote'
      });
    }

    const { error: insertError } = await supabase
      .from('content_votes')
      .insert({
        vote_type: 'wyr',
        content_id: contentId,
        choice
      });

    if (insertError) throw insertError;

    const { data, error: selectError } = await supabase
      .from('content_votes')
      .select('choice')
      .eq('vote_type', 'wyr')
      .eq('content_id', contentId);

    if (selectError) throw selectError;

    let a = 0;
    let b = 0;

    for (const vote of data || []) {
      if (vote.choice === 'a') a++;
      if (vote.choice === 'b') b++;
    }

    return send(res, 200, {
      a,
      b,
      total: a + b
    });

  } catch (error) {
    console.error('Would You Rather vote failed:', error);

    return send(res, 500, {
      error: 'Could not record vote'
    });
  }
}
// Get voting results for a 60-Second Table Quiz question
if (u.pathname === '/api/quiz-vote' && req.method === 'GET') {
  try {
    const quizId = u.searchParams.get('quizId');

    if (!quizId) {
      return send(res, 400, {
        error: 'Missing quiz ID'
      });
    }

    const { data, error } = await supabase
      .from('content_votes')
      .select('choice')
      .eq('vote_type', 'quiz')
      .eq('content_id', quizId);

    if (error) throw error;

    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;

    for (const vote of data || []) {
      if (vote.choice === 'a') a++;
      if (vote.choice === 'b') b++;
      if (vote.choice === 'c') c++;
      if (vote.choice === 'd') d++;
    }

    return send(res, 200, {
      a,
      b,
      c,
      d,
      total: a + b + c + d
    });

  } catch (error) {
    console.error('Quiz vote lookup failed:', error);

    return send(res, 500, {
      error: 'Could not load quiz results'
    });
  }
}
// Record a vote for a 60-Second Table Quiz question
if (u.pathname === '/api/quiz-vote' && req.method === 'POST') {
  try {
    const p = await body(req);

    const quizId = p.quizId;
    const choice = p.choice;

    if (
      !quizId ||
      !['a', 'b', 'c', 'd'].includes(choice)
    ) {
      return send(res, 400, {
        error: 'Invalid quiz vote'
      });
    }

    const { error: insertError } = await supabase
      .from('content_votes')
      .insert({
        vote_type: 'quiz',
        content_id: quizId,
        choice
      });

    if (insertError) throw insertError;

    const { data, error: selectError } = await supabase
      .from('content_votes')
      .select('choice')
      .eq('vote_type', 'quiz')
      .eq('content_id', quizId);

    if (selectError) throw selectError;

    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;

    for (const vote of data || []) {
      if (vote.choice === 'a') a++;
      if (vote.choice === 'b') b++;
      if (vote.choice === 'c') c++;
      if (vote.choice === 'd') d++;
    }

    return send(res, 200, {
      a,
      b,
      c,
      d,
      total: a + b + c + d
    });

  } catch (error) {
    console.error('Quiz vote failed:', error);

    return send(res, 500, {
      error: 'Could not record quiz vote'
    });
  }
}
if (
  u.pathname.startsWith('/api/leads/') &&
  req.method === 'PUT'
) {
  try {
    const parts = u.pathname.split('/');
    const id = parts[3];

    const update = await body(req);

    if (!['new', 'contacted', 'closed'].includes(update.status)) {
      return send(res, 400, {
        success: false,
        error: 'Invalid lead status'
      });
    }

    const { data, error } = await supabase
      .from('leads')
      .update({
        status: update.status
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Lead status update failed:', error.message);

      return send(res, 500, {
        success: false,
        error: 'Could not update lead'
      });
    }

    return send(res, 200, {
      success: true,
      lead: data
    });

  } catch (error) {
    console.error('Lead status update failed:', error);

    return send(res, 400, {
      success: false,
      error: 'Invalid request'
    });
  }
}
if (u.pathname === '/api/leads' && req.method === 'GET') {
  const { data, error } = await supabase
    .from('leads')
    .select(`
      id,
      lead_type,
      business_name,
      contact_name,
      email,
      phone,
      area,
      website_url,
      message,
      status,
      created_at
    `)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Lead fetch failed:', error.message);

    return send(res, 500, {
      success: false,
      error: 'Could not load leads'
    });
  }

  return send(res, 200, data || []);
}
  
if (u.pathname === '/api/ads' && req.method === 'GET') {
  try {
    const city = (u.searchParams.get('city') || 'fergusfalls').toLowerCase();

    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('city', city)
      .order('created_at', { ascending: true });

    if (error) throw error;

    const ads = (data || []).map(ad => ({
  id: ad.id,
  city: ad.city,
  business: ad.business,
  headline: ad.headline || '',
  url: ad.url || '',
  startDate: ad.start_date || '',
  endDate: ad.end_date || '',
  spots: ad.spots || 1,
  active: ad.active !== false,
  image: ad.image || '',
  creativePlan: ad.creative_plan || 'standard'
}));

return send(res, 200, ads);
  } catch (error) {
    console.error('Ads load failed:', error);
    return send(res, 500, { error: 'Could not load ads' });
  }
}

if (u.pathname === '/api/ads' && req.method === 'POST') {
  try {
    const p = await body(req);

    const ad = {
      id: crypto.randomUUID(),
      city: (p.city || 'fergusfalls').toLowerCase(),
      business: p.business || 'Advertiser',
      headline: p.headline || '',
      url: p.url || '',
      start_date: p.startDate || null,
      end_date: p.endDate || null,
      spots: Number(p.spots) || 1,
      active: p.active !== false,
      image: p.image || '',
      creative_plan: p.creativePlan || null
    };

    const secretKey = process.env.SUPABASE_SECRET_KEY;
const supabaseUrl = process.env.SUPABASE_URL;

const response = await fetch(
  `${supabaseUrl}/rest/v1/ads?city=eq.${encodeURIComponent(city)}&select=*&order=created_at.asc`,
  {
    headers: {
      apikey: secretKey
    }
  }
);

if (!response.ok) {
  const errorText = await response.text();
  throw new Error(
    `Ads REST request failed: ${response.status} ${errorText}`
  );
}

const data = await response.json();

    return send(res, 201, data);
  } catch (error) {
    console.error('Ad creation failed:', error);
    return send(res, 400, { error: error.message || 'Could not create ad' });
  }
}

const adMatch = u.pathname.match(/^\/api\/ads\/([^/]+)$/);

if (adMatch && req.method === 'PUT') {
  try {
    const p = await body(req);
    const id = adMatch[1];

    const updates = {
      city: (p.city || 'fergusfalls').toLowerCase(),
      business: p.business || 'Advertiser',
      headline: p.headline || '',
      url: p.url || '',
      start_date: p.startDate || null,
      end_date: p.endDate || null,
      spots: Number(p.spots) || 1,
      active: p.active !== false,
      image: p.image || '',
      creative_plan: p.creativePlan || null,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('ads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return send(res, 200, data);
  } catch (error) {
    console.error('Ad update failed:', error);
    return send(res, 400, { error: error.message || 'Could not update ad' });
  }
}

if (adMatch && req.method === 'DELETE') {
  try {
    const id = adMatch[1];

    const { error } = await supabase
      .from('ads')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return send(res, 200, { ok: true });
  } catch (error) {
    console.error('Ad delete failed:', error);
    return send(res, 400, { error: error.message || 'Could not delete ad' });
  }
}
if (
  u.pathname.startsWith('/api/editions/') &&
  req.method === 'GET'
) {
  try {
    const slug = u.pathname.split('/')[3];

    if (!slug) {
      return send(res, 400, {
        success: false,
        error: 'Edition slug is required'
      });
    }

    const { data, error } = await supabase
      .from('editions')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return send(res, 404, {
        success: false,
        error: 'Edition not found'
      });
    }

    return send(res, 200, data);

  } catch (error) {
    console.error('Edition lookup failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not load Edition settings'
    });
  }
}
if (
  u.pathname === '/api/editions' &&
  req.method === 'GET'
) {
  try {
    const secretKey = process.env.SUPABASE_SECRET_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;

    const response = await fetch(
      `${supabaseUrl}/rest/v1/editions` +
      `?select=id,name,slug,active` +
      `&order=name.asc`,
      {
        headers: {
          apikey: secretKey
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        'Edition list load failed:',
        response.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not load Editions'
      });
    }

    const editions = await response.json();

    return send(res, 200, editions);

  } catch (error) {
    console.error('Edition list load failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not load Editions'
    });
  }
}
  if (u.pathname === '/api/leads' && req.method === 'POST') {
  try {
    const lead = await body(req);

    if (
      !lead.leadType ||
      !lead.businessName ||
      !lead.contactName ||
      !lead.email
    ) {
      return send(res, 400, {
        success: false,
        error: 'Please complete all required fields'
      });
    }

    const { data, error } = await supabase
      .from('leads')
      .insert({
        lead_type: lead.leadType,
        business_name: lead.businessName.trim(),
        contact_name: lead.contactName.trim(),
        email: lead.email.trim(),
        phone: lead.phone?.trim() || null,
        area: lead.area?.trim() || null,
        website_url: lead.website?.trim() || null,
        message: lead.message?.trim() || null
      })
      .select()
      .single();

    if (error) {
      console.error('Lead insert failed:', error.message);

      return send(res, 500, {
        success: false,
        error: 'Could not submit request'
      });
    }

    console.log('LEAD SAVED:', data.id);

    return send(res, 201, {
      success: true,
      leadId: data.id
    });

  } catch (error) {
    console.error('Lead submission failed:', error);

    return send(res, 400, {
      success: false,
      error: 'Invalid request'
    });
  }
}
  let file = u.pathname==='/admin' ? 'admin.html' : (u.pathname.startsWith('/assets/') ? u.pathname.slice(1) : ['.css','.js','.png','.jpg','.svg','.ico'].some(ext=>u.pathname.endsWith(ext)) ? u.pathname.slice(1) : 'index.html');
  const full=safeFile(file); if(!full||!fs.existsSync(full)) return send(res,404,'Not found','text/plain');
  const ext=path.extname(full); const type={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'}[ext]||'application/octet-stream';
  res.writeHead(200,{'Content-Type':type}); fs.createReadStream(full).pipe(res);
});
server.listen(PORT,()=>console.log(`Tidbits Daily running at http://localhost:${PORT}/fergusfalls`));
