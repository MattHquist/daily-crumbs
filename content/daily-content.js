// Daily Crumbs evergreen 365-day content library.
// This module deterministically builds 365 daily entries for each daily feature
// and 52 themed curiosity weeks. It is intentionally year-independent.

function cycleBuild(count, makers) {
  const out = [];
  let i = 0;
  while (out.length < count) {
    const maker = makers[i % makers.length];
    const value = maker(i);
    out.push(value);
    i += 1;
  }
  return out.slice(0, count);
}

const dadJokeSeeds = [
  ['Why did the scarecrow win an award?', 'Because he was outstanding in his field.'],
  ['What do you call cheese that is not yours?', 'Nacho cheese.'],
  ['Why don’t eggs tell jokes?', 'They might crack each other up.'],
  ['What did one wall say to the other?', 'I’ll meet you at the corner.'],
  ['Why was the math book sad?', 'It had too many problems.'],
  ['What do you call a bear with no teeth?', 'A gummy bear.'],
  ['Why did the golfer bring two pairs of pants?', 'In case he got a hole in one.'],
  ['Why did the bicycle fall over?', 'Because it was two-tired.'],
  ['Why did the tomato turn red?', 'Because it saw the salad dressing.'],
  ['What do you call a sleeping bull?', 'A bulldozer.'],
  ['Why did the cookie go to the doctor?', 'Because it felt crummy.'],
  ['What do you call fake spaghetti?', 'An impasta.'],
  ['Why did the computer go to the doctor?', 'It had a virus.'],
  ['What do you call a fish wearing a bow tie?', 'Sofishticated.'],
  ['Why did the stadium get hot after the game?', 'All the fans left.'],
  ['Why don’t skeletons fight each other?', 'They don’t have the guts.'],
  ['Why did the coffee file a police report?', 'It got mugged.'],
  ['Why did the banana go to the doctor?', 'It wasn’t peeling well.'],
  ['What do you call a belt made of watches?', 'A waist of time.'],
  ['Why did the picture go to jail?', 'Because it was framed.'],
  ['Why was the broom late?', 'It swept in.'],
  ['What do you call a cow with no legs?', 'Ground beef.'],
  ['Why did the orange stop halfway up the hill?', 'It ran out of juice.'],
  ['Why was six afraid of seven?', 'Because seven eight nine.'],
  ['Why did the music teacher need a ladder?', 'To reach the high notes.'],
  ['What do you call a dog magician?', 'A labracadabrador.'],
  ['Why did the pencil get promoted?', 'It had a sharp point.'],
  ['What did the ocean say to the beach?', 'Nothing. It just waved.'],
  ['Why did the baker stop making donuts?', 'He got tired of the hole business.'],
  ['What do you call a snowman in summer?', 'A puddle.'],
  ['Why did the calendar apply for a job?', 'It had lots of dates.'],
  ['Why did the chicken join a band?', 'Because it had the drumsticks.'],
  ['Why did the lamp fail school?', 'It wasn’t very bright.'],
  ['Why did the grape stop in the middle of the road?', 'It ran out of jam.'],
  ['Why did the clock get sent to the principal?', 'It kept tocking back.'],
  ['Why did the astronaut break up with the moon?', 'He needed space.'],
  ['Why did the baker go to therapy?', 'He kneaded it.'],
  ['What do you call a dinosaur with a great vocabulary?', 'A thesaurus.'],
  ['Why did the phone wear glasses?', 'It lost its contacts.'],
  ['Why did the farmer bury his money?', 'He wanted rich soil.'],
  ['What did the left eye say to the right eye?', 'Between us, something smells.'],
  ['Why did the melon jump into the lake?', 'It wanted to be a watermelon.'],
  ['Why did the football coach go to the bank?', 'To get his quarterback.'],
  ['Why did the cow become an astronaut?', 'To see the moooon.'],
  ['Why was the belt arrested?', 'For holding up a pair of pants.'],
  ['What do you call a pile of cats?', 'A meowtain.'],
  ['Why did the keyboard break up with the mouse?', 'There was no connection.'],
  ['Why did the sandwich go to the gym?', 'To get a little more filling.'],
  ['Why did the duck get a timeout?', 'It was acting fowl.'],
  ['Why did the barber win the race?', 'He knew a shortcut.'],
  ['Why did the tree take a nap?', 'It was bushed.'],
  ['What do you call a cow that plays music?', 'A moo-sician.'],
  ['Why did the waiter bring a ladder?', 'The customer asked for a high table.'],
  ['What do you call a lazy kangaroo?', 'A pouch potato.'],
  ['Why did the notebook look worried?', 'It had too many issues.'],
  ['Why did the popcorn join the movie?', 'It wanted a starring roll.'],
  ['Why did the donut visit the dentist?', 'It needed a filling.'],
  ['Why did the moon skip dinner?', 'It was already full.'],
  ['Why did the spoon get promoted?', 'It always stirred things up.'],
  ['Why did the potato sit down?', 'It was feeling mashed.'],
  ['What did the janitor say when he jumped out of the closet?', 'Supplies!'],
  ['Why did the chair apply for a job?', 'It wanted to support itself.'],
  ['Why did the lemon fail the test?', 'It couldn’t concentrate.'],
  ['What do you call a pig that knows karate?', 'A pork chop.'],
  ['Why did the soccer ball quit the team?', 'It was tired of being kicked around.'],
  ['Why did the stapler feel important?', 'It held everything together.'],
  ['Why did the ice cube get invited to the party?', 'It was cool.'],
  ['What kind of tree fits in your hand?', 'A palm tree.'],
  ['Why did the wallet go on a diet?', 'It was too full of bills.'],
  ['Why did the muffin visit the bank?', 'It needed some dough.'],
  ['What do you call a cow during an earthquake?', 'A milkshake.'],
  ['Why did the book join the gym?', 'It wanted a stronger spine.'],
  ['Why did the spoon cross the table?', 'To get to the other side dish.'],
  ['Why did the fish blush?', 'It saw the ocean’s bottom.'],
  ['What did the grape say when it got stepped on?', 'Nothing. It just let out a little wine.'],
  ['What do you call a cow that tells jokes?', 'A laughing stock.'],
  ['Why did the pancake cross the road?', 'To get to the butter side.'],
  ['Why did the hamburger go to the gym?', 'To work on its buns.'],
  ['What do you call a bear caught in the rain?', 'A drizzly bear.'],
  ['Why did the salt shaker get invited everywhere?', 'It always added flavor.'],
  ['Why did the napkin become a hero?', 'It cleaned up every mess.'],
  ['Why did the fork apply for a leadership role?', 'It knew how to take charge.'],
  ['Why did the coffee shop hire a musician?', 'For better grounds.'],
  ['Why did the cereal get promoted?', 'It was outstanding in its bowl.']
];

const punSubjects = [
  ['printer','handled the paper work'],
  ['calendar','had a lot of dates'],
  ['shoe','found its sole purpose'],
  ['clock','knew the time was right'],
  ['pillow','had a dream job'],
  ['blanket','had everyone covered'],
  ['mirror','reflected on the problem'],
  ['camera','stayed focused'],
  ['pencil','made a strong point'],
  ['eraser','learned from mistakes'],
  ['ruler','measured up'],
  ['fan','blew everyone away'],
  ['light bulb','had a bright idea'],
  ['battery','was fully charged'],
  ['door','opened opportunities'],
  ['window','had a clear view'],
  ['hammer','nailed it'],
  ['screwdriver','turned things around'],
  ['paintbrush','made a good impression'],
  ['backpack','carried its weight'],
  ['umbrella','had everyone covered'],
  ['thermos','kept its cool'],
  ['spatula','flipped the situation'],
  ['whisk','mixed things up'],
  ['toaster','raised the bar'],
  ['blender','blended in'],
  ['fridge','kept its cool'],
  ['freezer','froze under pressure'],
  ['oven','handled the heat'],
  ['sock','found its match'],
  ['hat','topped the competition'],
  ['glove','fit right in'],
  ['scarf','wrapped things up'],
  ['bookmark','knew its place'],
  ['dictionary','had all the words'],
  ['map','knew where it was going'],
  ['compass','found direction'],
  ['desk','supported the team'],
  ['table','brought people together'],
  ['lamp','brightened the room'],
  ['rug','covered a lot of ground'],
  ['curtain','drew attention'],
  ['straw','sucked it up'],
  ['mug','had a handle on things'],
  ['plate','served well'],
  ['fork','made a point'],
  ['knife','was cutting edge'],
  ['spoon','stirred up ideas'],
  ['napkin','cleaned things up'],
  ['pizza','delivered'],
  ['burger','had the right ingredients'],
  ['taco','wrapped it up'],
  ['salad','kept things fresh'],
  ['cookie','had smart chips'],
  ['brownie','was well-rounded'],
  ['muffin','rose to the occasion'],
  ['donut','filled the gap'],
  ['banana','had appeal'],
  ['orange','had zest'],
  ['lemon','made the best of a sour situation'],
  ['corn','was all ears'],
  ['train','stayed on track'],
  ['bus','drove results'],
  ['car','shifted gears'],
  ['bike','kept its balance'],
  ['boat','stayed afloat'],
  ['plane','rose above it'],
  ['rocket','launched a great idea'],
  ['dog','retrieved the answer'],
  ['cat','landed on its feet'],
  ['owl','was wise'],
  ['bee','stayed busy'],
  ['duck','quacked under pressure'],
  ['horse','stayed stable'],
  ['cow','mooved forward'],
  ['fish','went with the flow'],
  ['crab','came out of its shell'],
  ['turtle','took it slow'],
  ['rabbit','hopped to it']
];

const jokes = [...dadJokeSeeds];
for (let i = 0; jokes.length < 365; i += 1) {
  const [subject, punch] = punSubjects[i % punSubjects.length];
  const round = Math.floor(i / punSubjects.length) + 1;
  const setups = [
    `Why did the ${subject} get the job?`,
    `Why did the ${subject} make a great teammate?`,
    `Why did the ${subject} earn a promotion?`,
    `Why did everyone count on the ${subject}?`
  ];
  jokes.push([setups[(round - 1) % setups.length], `Because it ${punch}.`]);
}

const factSeeds = [
  'Octopuses have three hearts.',
  'Bananas are berries botanically, but strawberries are not.',
  'A group of flamingos is called a flamboyance.',
  'Honey can remain edible for an extremely long time when sealed properly.',
  'The Eiffel Tower can grow slightly taller in hot weather as the metal expands.',
  'Sea otters often hold hands while resting so they do not drift apart.',
  'A day on Venus is longer than a year on Venus.',
  'Sharks existed before trees.',
  'Butterflies taste with their feet.',
  'Wombat droppings are cube-shaped.',
  'An ostrich’s eye is larger than its brain.',
  'Koalas have fingerprints that are remarkably similar to human fingerprints.',
  'A cloud can weigh more than a million pounds.',
  'Water expands when it freezes, which is why ice floats.',
  'Sound travels faster through water than through air.',
  'Your skin is your body’s largest organ.',
  'Saturn would float in water if you had a bathtub large enough.',
  'Jupiter is the largest planet in our solar system.',
  'Mercury is the closest planet to the Sun.',
  'The Moon is slowly moving away from Earth.',
  'The Pacific Ocean is larger than all of Earth’s land area combined.',
  'Antarctica is the driest continent.',
  'The Sahara is the world’s largest hot desert.',
  'Russia spans eleven time zones.',
  'Canada has more lakes than any other country.',
  'Australia is wider than the Moon.',
  'An adult human has 206 bones.',
  'Babies are born with more bones than adults because some bones fuse as they grow.',
  'The smallest bones in the human body are in the middle ear.',
  'Fingernails usually grow faster than toenails.',
  'Your left lung is slightly smaller than your right lung to make room for the heart.',
  'Apples float because roughly one-quarter of their volume is air.',
  'Peanuts are legumes, not true nuts.',
  'Vanilla comes from the fruit of an orchid.',
  'Coffee beans are actually seeds from coffee cherries.',
  'Popcorn kernels pop because water inside them turns to steam.',
  'Broccoli, cauliflower, cabbage, kale, and Brussels sprouts come from the same plant species.',
  'Cucumbers are fruits botanically.',
  'Avocados are berries botanically.',
  'Pumpkins are fruits botanically.',
  'A strawberry carries its seeds on the outside.',
  'Hot water can sometimes freeze faster than cold water under certain conditions, known as the Mpemba effect.',
  'Glass is an amorphous solid.',
  'Diamonds and graphite are both made of carbon atoms arranged differently.',
  'Bubble wrap was originally invented as textured wallpaper.',
  'Play-Doh began as a wallpaper-cleaning product.',
  'Post-it Notes came from an adhesive that was initially considered too weak for many uses.',
  'The first computer mouse was made of wood.',
  'QR codes were invented in Japan for tracking automotive parts.',
  'The first bar code scanned at a supermarket was on a pack of chewing gum.',
  'Email existed before the World Wide Web.',
  'GPS depends on extremely precise clocks aboard satellites.',
  'Bluetooth was named after a 10th-century Danish king.',
  'The first webcam was used to monitor a coffee pot.',
  'Crows can recognize individual human faces.',
  'Elephants can recognize themselves in mirrors.',
  'Dolphins use unique whistles that function a bit like names.',
  'Bees communicate the direction of food with a waggle dance.',
  'Owls cannot move their eyeballs; they turn their heads instead.',
  'Penguins have knees, though much of their legs are hidden inside their bodies.',
  'Polar bear skin is black beneath its fur.',
  'Giraffes have the same number of neck vertebrae as humans: seven.',
  'Hummingbirds can fly backward.',
  'Bats are the only mammals capable of sustained powered flight.',
  'Platypuses lay eggs.',
  'Male seahorses carry developing young.',
  'Goats have rectangular pupils.',
  'Horses cannot vomit.',
  'Snails can have thousands of tiny teeth on a ribbon-like structure called a radula.',
  'Bamboo is a grass.',
  'Banana plants are giant herbs, not trees.',
  'Peanuts grow underground.',
  'Earth’s atmosphere is mostly nitrogen.',
  'Fog is essentially a cloud at ground level.',
  'Snowflakes usually have six-fold symmetry.',
  'Thunder is caused by air rapidly expanding after being heated by lightning.',
  'A rainbow is actually a full circle, though the ground usually blocks the lower half.',
  'Hurricanes are called typhoons in parts of the western Pacific.',
  'The eye of a hurricane is often relatively calm.',
  'Most of Earth’s volcanic activity occurs underwater.',
  'Coral reefs are built by tiny animals called coral polyps.',
  'Ocean tides are influenced mainly by the Moon’s gravity.',
  'The oceans contain about 97% of Earth’s water.',
  'Glaciers store much of Earth’s freshwater.',
  'Lake Baikal is the world’s deepest freshwater lake.',
  'Obsidian is volcanic glass.',
  'Pumice can float because it contains many trapped gas bubbles.',
  'Amber is fossilized tree resin.',
  'Earth is about 4.5 billion years old.',
  'The Sun contains more than 99% of the mass in our solar system.',
  'Light from the Sun takes about eight minutes to reach Earth.',
  'The Sun is a star.',
  'The International Space Station circles Earth roughly every 90 minutes.',
  'Mars has the largest volcano in the solar system, Olympus Mons.',
  'Venus is the hottest planet in our solar system.',
  'Uranus rotates on its side compared with most planets.',
  'Saturn’s rings are made mostly of ice particles and rock.',
  'A light-year measures distance, not time.',
  'Sound cannot travel through the vacuum of space.',
  'The North Star is called Polaris.',
  'Polaris is not the brightest star in the night sky.',
  'Sirius is the brightest star in Earth’s night sky.',
  'A day has 86,400 seconds.',
  'The dot above a lowercase i or j is called a tittle.',
  'A palindrome reads the same forward and backward, such as “level.”',
  'Two is the only even prime number.',
  'Pi is an irrational number.',
  'A googol is 1 followed by 100 zeros.',
  'A million seconds is about 11.6 days.',
  'A billion seconds is about 31.7 years.',
  'A dodecagon has 12 sides.',
  'An octagon has 8 sides.',
  'A hexagon has 6 sides.',
  'A pentagon has 5 sides.',
  'Metal often feels colder than wood at the same room temperature because it conducts heat away from your skin faster.',
  'White light contains many colors.',
  'A prism can separate white light into a spectrum.',
  'Earth itself acts like a giant magnet.',
  'Sound is produced by vibrations.',
  'Dogs can hear higher frequencies than humans.',
  'Smell is strongly linked to memory because of how the brain processes odors.',
  'Your pupils change size to control how much light enters your eyes.',
  'Fingerprints form before birth.',
  'Identical twins have different fingerprints.',
  'Taste and smell work together to create much of what we experience as flavor.',
  'Mint can feel cool because menthol activates cold-sensitive receptors.',
  'Your sense of balance depends partly on structures in the inner ear.',
  'Hiccups are involuntary spasms of the diaphragm.',
  'Goosebumps are a leftover reflex from hairier ancestors.',
  'Wrinkled fingers in water are partly controlled by the nervous system.',
  'Brain freeze happens when something very cold rapidly cools tissues near the roof of the mouth.',
  'Sleep helps the brain consolidate memories.',
  'Walking can boost creative thinking for many people.',
  'Sunlight helps the body produce vitamin D.',
  'Your body’s internal clock is influenced strongly by light.',
  'Practice spaced over time usually improves long-term memory more than cramming.',
  'Birthday candles trace back to ancient traditions involving light and celebration.',
  'Pencils do not contain lead; the writing core is graphite mixed with clay.',
  'Leaves change color in autumn as chlorophyll breaks down and other pigments become visible.',
  'Maple seeds spin like tiny helicopters as they fall.',
  'Some pinecones open in response to heat from wildfire.',
  'Mushrooms are the fruiting bodies of fungi.',
  'Fungi are more closely related to animals than to plants.',
  'Yeast is a fungus.',
  'Seaweed is algae, not a true plant.',
  'Bioluminescence is common in deep-sea animals.',
  'Jellyfish do not have brains.',
  'Barnacles are crustaceans, related to crabs and shrimp.',
  'Sharks do not have bones; their skeletons are made of cartilage.',
  'Whale sharks are the largest fish in the world.',
  'Blue whales are the largest animals known to have ever lived.',
  'Elephants are the largest land animals alive today.',
  'Cheetahs are the fastest land animals over short distances.',
  'Birds are living dinosaurs.',
  'Penguin wings are adapted into flippers for swimming.',
  'Owls have specialized feathers that help make flight quieter.',
  'Some crows use tools.',
  'Sea otters use rocks as tools to open shellfish.',
  'Cats cannot taste sweetness the same way humans can.',
  'Dogs have a much stronger sense of smell than humans.',
  'Cows form preferred social relationships with certain herd mates.',
  'Horses can sleep standing up or lying down.',
  'Sheep can recognize individual faces.',
  'Wild turkeys can fly short distances.',
  'Moose are excellent swimmers.',
  'Bison can run faster than humans.',
  'Polar bears are classified as marine mammals.',
  'Porcupine quills are modified hairs.',
  'Platypuses can sense electrical signals from prey in the water.',
  'Alpacas hum to communicate.',
  'Elephant trunks contain tens of thousands of muscles.'
];

const countryCapitalFacts = [
  ['France','Paris'],['Italy','Rome'],['Spain','Madrid'],['Germany','Berlin'],
  ['Japan','Tokyo'],['Canada','Ottawa'],['Australia','Canberra'],['Brazil','Brasília'],
  ['Mexico','Mexico City'],['Norway','Oslo'],['Sweden','Stockholm'],['Finland','Helsinki'],
  ['Denmark','Copenhagen'],['Ireland','Dublin'],['Portugal','Lisbon'],['Greece','Athens'],
  ['Egypt','Cairo'],['Argentina','Buenos Aires'],['Chile','Santiago'],['Peru','Lima']
];

const stateCapitalFacts = [
  ['Minnesota','Saint Paul'],['North Dakota','Bismarck'],['South Dakota','Pierre'],
  ['Wisconsin','Madison'],['Iowa','Des Moines'],['Montana','Helena'],['Wyoming','Cheyenne'],
  ['Colorado','Denver'],['Nebraska','Lincoln'],['Kansas','Topeka'],['Missouri','Jefferson City'],
  ['Arizona','Phoenix'],['Nevada','Carson City'],['Oregon','Salem'],['Washington','Olympia'],
  ['Idaho','Boise'],['Utah','Salt Lake City'],['Texas','Austin'],['Florida','Tallahassee'],
  ['Georgia','Atlanta']
];

const facts = [...factSeeds];
for (const [country, capital] of countryCapitalFacts) {
  facts.push(`${capital} is the capital of ${country}.`);
}
for (const [state, capital] of stateCapitalFacts) {
  facts.push(`${capital} is the capital of ${state}.`);
}
for (let n = 3; facts.length < 365; n += 1) {
  const square = n * n;
  facts.push(`${n} squared equals ${square}.`);
}

const tableTalkSeeds = [
  'If you could instantly master one hobby, what would it be?',
  'What is the best meal you have ever had on a road trip?',
  'Which song can always improve your mood?',
  'If you could revisit one age for a day, which would you choose?',
  'What is a small thing that made you smile this week?',
  'Would you rather have a cabin by a lake or a condo by the ocean?',
  'What is one local place you think everyone should try once?'
];

const tableTalkThings = [
  'season','holiday tradition','family recipe','road-trip snack','weekend activity',
  'movie','book','restaurant','dessert','breakfast food','vacation spot','sport',
  'board game','song','childhood toy','school subject','outdoor activity','indoor activity',
  'small town','city','state park','family tradition','comfort food','ice cream flavor',
  'pizza topping','sandwich','soup','snack','fruit','vegetable','drink','weather day',
  'piece of advice','gift you received','gift you gave','thing you collect','phone app',
  'household gadget','old-fashioned item','modern convenience','smell','sound','color',
  'animal','bird','tree','flower','memory','joke','quote','holiday','birthday tradition',
  'fair food','summer activity','winter activity','fall activity','spring activity',
  'camping memory','fishing memory','lake activity','beach activity','museum','concert',
  'school event','sports memory','family game','way to relax','way to help someone',
  'way to save money','simple pleasure','small luxury','favorite room','favorite meal'
];

const questions = [...tableTalkSeeds];
const ttTemplates = [
  x => `What is your favorite ${x}, and why?`,
  x => `What is one ${x} you think is underrated?`,
  x => `What is your best memory involving a ${x}?`,
  x => `What is one ${x} you would happily enjoy every week?`,
  x => `What is one ${x} you would recommend to a friend?`
];
for (const thing of tableTalkThings) {
  for (const make of ttTemplates) questions.push(make(thing));
}
while (questions.length < 365) {
  questions.push(`What is something new you would like to try this year? #${questions.length + 1}`);
}
questions.length = 365;

const riddleSeeds = [
  {q:'What has keys but cannot open locks?', a:'A piano.'},
  {q:'What gets wetter the more it dries?', a:'A towel.'},
  {q:'What has a face and two hands but no arms or legs?', a:'A clock.'},
  {q:'What has many teeth but cannot bite?', a:'A comb.'},
  {q:'What can travel around the world while staying in one corner?', a:'A stamp.'},
  {q:'What has one eye but cannot see?', a:'A needle.'},
  {q:'What goes up but never comes back down?', a:'Your age.'},
  {q:'What has a neck but no head?', a:'A bottle.'},
  {q:'What has words but never speaks?', a:'A book.'},
  {q:'What has four wheels and flies?', a:'A garbage truck.'},
  {q:'What can fill a room but takes up no space?', a:'Light.'},
  {q:'What has a thumb and four fingers but is not alive?', a:'A glove.'},
  {q:'What runs but never walks?', a:'Water.'},
  {q:'What has cities but no houses, forests but no trees, and water but no fish?', a:'A map.'},
  {q:'What can you catch but not throw?', a:'A cold.'},
  {q:'What kind of coat is always wet when you put it on?', a:'A coat of paint.'},
  {q:'What has a ring but no finger?', a:'A telephone.'},
  {q:'What begins with T, ends with T, and has T in it?', a:'A teapot.'},
  {q:'What has legs but cannot walk?', a:'A table.'},
  {q:'What has one head, one foot, and four legs?', a:'A bed.'},
  {q:'What can be cracked, made, told, and played?', a:'A joke.'},
  {q:'What is full of holes but still holds water?', a:'A sponge.'},
  {q:'What gets bigger the more you take away?', a:'A hole.'},
  {q:'What is always in front of you but cannot be seen?', a:'The future.'},
  {q:'What has a head and a tail but no body?', a:'A coin.'},
  {q:'What has many keys but cannot unlock a single door?', a:'A keyboard.'},
  {q:'What kind of room has no doors or windows?', a:'A mushroom.'},
  {q:'What belongs to you but other people use it more than you do?', a:'Your name.'},
  {q:'What has ears but cannot hear?', a:'A field of corn.'},
  {q:'What has a spine but no bones?', a:'A book.'},
  {q:'What building has the most stories?', a:'A library.'},
  {q:'What kind of band never plays music?', a:'A rubber band.'},
  {q:'What can go through glass without breaking it?', a:'Light.'},
  {q:'What has lots of eyes but cannot see?', a:'A potato.'},
  {q:'What has many needles but does not sew?', a:'A pine tree.'},
  {q:'What can you keep after giving it to someone?', a:'Your word.'},
  {q:'What has no life but can die?', a:'A battery.'},
  {q:'What goes through towns and over hills but never moves?', a:'A road.'},
  {q:'What kind of lion never roars?', a:'A dandelion.'},
  {q:'What can you hear but not touch or see?', a:'Sound.'}
];

const cluePairs = [
  ['pencil','a point'],['book','a spine'],['shoe','a sole'],['calendar','dates'],
  ['clock','hands'],['river','banks'],['tree','bark'],['phone','a ring'],
  ['computer','a mouse'],['keyboard','a space bar'],['car','a trunk'],['bottle','a neck'],
  ['needle','an eye'],['corn','ears'],['potato','eyes'],['table','legs'],['chair','arms'],
  ['shirt','sleeves'],['mountain','a peak'],['ocean','waves'],['train','a track'],
  ['road','a shoulder'],['camera','a lens'],['window','a pane'],['door','a handle'],
  ['cup','a handle'],['fork','tines'],['comb','teeth'],['zipper','teeth'],
  ['belt','a buckle'],['hat','a brim'],['lamp','a shade'],['ladder','rungs'],
  ['map','a legend'],['guitar','strings'],['piano','keys'],['violin','a bow'],
  ['shoe','a tongue'],['clock','a face'],['coin','heads and tails'],['bank','branches'],
  ['rose','thorns'],['cactus','spines'],['apple','a core'],['peach','a pit'],
  ['orange','a peel'],['onion','layers'],['garlic','cloves'],['bread','a crust']
];

const riddles = [...riddleSeeds];
for (let round = 0; riddles.length < 365; round += 1) {
  const [thing, feature] = cluePairs[round % cluePairs.length];
  const versions = [
    `I am a ${thing}. What do I have that is called ${feature}?`,
    `Which everyday thing has ${feature} even though it is not a person?`,
    `I can be found around the house and I have ${feature}. What am I?`,
    `Think of a ${thing}: what part of it is known as ${feature}?`
  ];
  riddles.push({q:versions[Math.floor(round / cluePairs.length) % versions.length], a:`A ${thing}.`});
}

const tipSeeds = [
  'When meeting someone new, use their name once during the conversation. You are much more likely to remember it later.',
  'Take a photo of where you parked before walking away in an unfamiliar parking lot.',
  'If you need to remember to bring something with you tomorrow, put it directly in front of the door you will leave through.',
  'When reheating leftovers in the microwave, arrange the food in a ring around the edge of the plate for more even heating.',
  'Before buying something online, leave it in your cart for a day. You may discover you did not really want it.',
  'If you cannot find your phone at home, ask another device to call it.',
  'Take a photo of your luggage before a flight. It can make describing a lost bag much easier.',
  'If a zipper keeps sliding down, loop a small key ring through the zipper pull and around the button.',
  'When someone gives you directions or instructions, repeat the important part back to them.',
  'Store important emergency contacts in your phone under both their name and relationship.',
  'If you are struggling to start a task, commit to doing it for just five minutes.',
  'Before leaving a hotel room, check the outlets. Phone chargers are among the easiest things to leave behind.',
  'Keep a permanent marker near your freezer and write the date on leftovers before freezing them.',
  'When you think of something you need to do later, either do it immediately if it takes less than two minutes or write it down.',
  'If you lend something to someone, take a quick photo of them holding it.',
  'Put your keys in the same place every time you come home.',
  'When taking a picture of important paperwork, make sure all four corners are visible.',
  'Before a road trip, download your route or map area for offline use.',
  'If you are unsure whether you locked the door, say “I locked the door” out loud when you do it.',
  'Set out tomorrow’s clothes before you go to bed.',
  'Put items you need to return in your car so they are with you when you pass the store.',
  'Keep a reusable shopping bag near the door or in your vehicle.',
  'Take a photo of model and serial numbers for major appliances.',
  'Label charging cables at both ends if several look alike.',
  'Keep a small flashlight where you can reach it easily during a power outage.',
  'Store a basic first-aid kit in your vehicle as well as at home.',
  'Use a recurring calendar reminder for tasks that happen only a few times a year.',
  'Keep a donation box in one convenient place and add to it as you declutter.',
  'Photograph receipts for large purchases before the paper fades.',
  'Put your grocery list in the order you normally walk through the store.'
];

const tipActions = [
  'clear one small surface','reply to one overdue message','write tomorrow’s top three priorities',
  'put away five items','delete ten unnecessary photos','clean one drawer','fill your water bottle',
  'pack tomorrow’s lunch','check tomorrow’s weather','charge your phone','review your calendar',
  'write a short grocery list','label one storage bin','back up one important file','clean your glasses',
  'wipe down your phone screen','save one important contact','scan one important document',
  'replace one dead battery','throw away expired food','move one item to the donation box',
  'schedule one overdue appointment','check your tire pressure','refill one household supply'
];

const dailyTips = [...tipSeeds];
for (let i = 0; dailyTips.length < 365; i += 1) {
  const action = tipActions[i % tipActions.length];
  const versions = [
    `Take 60 seconds to ${action}; tiny resets often save more time later.`,
    `If the day feels busy, start by taking one minute to ${action}.`,
    `Make tomorrow easier today: ${action}.`,
    `A small useful reset for today: ${action}.`
  ];
  dailyTips.push(versions[Math.floor(i / tipActions.length) % versions.length]);
}

const quizzes = [];
function addQuiz(q, a, options) {
  quizzes.push({q, a, options});
}

const quizSeeds = [
  ['Which planet is known as the Red Planet?','Mars',['Venus','Mars','Jupiter','Mercury']],
  ['How many sides does a dodecagon have?','12',['8','10','12','14']],
  ['Which animal is the largest mammal on Earth?','Blue whale',['Elephant','Blue whale','Giraffe','Hippo']],
  ['What is the capital of Canada?','Ottawa',['Toronto','Vancouver','Ottawa','Montreal']],
  ['Which instrument has 88 keys on a standard version?','Piano',['Organ','Piano','Accordion','Harpsichord']],
  ['What gas do plants absorb from the atmosphere?','Carbon dioxide',['Oxygen','Nitrogen','Carbon dioxide','Hydrogen']],
  ['Which ocean is the largest?','Pacific Ocean',['Atlantic Ocean','Indian Ocean','Arctic Ocean','Pacific Ocean']],
  ['Which planet is the largest in our solar system?','Jupiter',['Earth','Saturn','Jupiter','Neptune']],
  ['Which planet is closest to the Sun?','Mercury',['Mercury','Venus','Earth','Mars']],
  ['Which planet is famous for its rings?','Saturn',['Saturn','Mars','Venus','Mercury']],
  ['What is H2O commonly called?','Water',['Salt','Water','Oxygen','Hydrogen']],
  ['What is the largest organ of the human body?','Skin',['Heart','Skin','Liver','Brain']],
  ['How many bones are in the adult human body?','206',['186','206','226','246']],
  ['What force keeps us on the ground?','Gravity',['Magnetism','Gravity','Friction','Electricity']],
  ['Which part of a plant usually absorbs water?','Roots',['Leaves','Flowers','Roots','Fruit']],
  ['What is the boiling point of water at sea level in Celsius?','100°C',['50°C','75°C','100°C','120°C']],
  ['What is the freezing point of water in Fahrenheit?','32°F',['0°F','32°F','50°F','100°F']],
  ['Which animal is the fastest land animal?','Cheetah',['Horse','Lion','Cheetah','Greyhound']],
  ['What is the hardest natural substance?','Diamond',['Quartz','Steel','Diamond','Granite']],
  ['What does a thermometer measure?','Temperature',['Pressure','Temperature','Distance','Speed']],
  ['Which gas makes up most of Earth’s atmosphere?','Nitrogen',['Oxygen','Nitrogen','Carbon dioxide','Hydrogen']],
  ['How many days are in a leap year?','366',['364','365','366','367']],
  ['How many hours are in a day?','24',['12','18','24','36']],
  ['How many minutes are in an hour?','60',['30','45','60','90']],
  ['Which color is made by mixing blue and yellow?','Green',['Purple','Orange','Green','Brown']],
  ['Which state is known as the Land of 10,000 Lakes?','Minnesota',['Wisconsin','Minnesota','Michigan','Maine']],
  ['What is the capital of Minnesota?','Saint Paul',['Minneapolis','Duluth','Saint Paul','Rochester']],
  ['Which Great Lake borders Minnesota?','Lake Superior',['Lake Erie','Lake Ontario','Lake Superior','Lake Huron']]
];
for (const q of quizSeeds) addQuiz(...q);

for (const [country, capital] of countryCapitalFacts) {
  const distractors = countryCapitalFacts.map(x => x[1]).filter(x => x !== capital);
  addQuiz(`What is the capital of ${country}?`, capital, [capital, distractors[0], distractors[1], distractors[2]]);
}
for (const [state, capital] of stateCapitalFacts) {
  const distractors = stateCapitalFacts.map(x => x[1]).filter(x => x !== capital);
  addQuiz(`What is the capital of ${state}?`, capital, [capital, distractors[0], distractors[1], distractors[2]]);
}

const polygons = [
  [3,'triangle'],[4,'quadrilateral'],[5,'pentagon'],[6,'hexagon'],[7,'heptagon'],
  [8,'octagon'],[9,'nonagon'],[10,'decagon'],[11,'hendecagon'],[12,'dodecagon']
];
for (const [sides, name] of polygons) {
  addQuiz(`How many sides does a ${name} have?`, String(sides), [
    String(Math.max(3, sides - 2)),
    String(sides),
    String(sides + 1),
    String(sides + 2)
  ]);
}

for (let i = 0; quizzes.length < 365; i += 1) {
  const a = 10 + ((i * 7) % 50);
  const b = 3 + ((i * 5) % 20);
  const answer = String(a - b);
  addQuiz(`What is ${a} - ${b}?`, answer, [
    answer,
    String(a - b + 2),
    String(a - b - 2),
    String(a - b + 5)
  ]);
}
quizzes.length = 365;

const wyrSeeds = [
  ['give up pizza for a year','give up desserts for a year'],
  ['always be 10 minutes early','always be 20 minutes late'],
  ['have unlimited tacos','have unlimited ice cream'],
  ['be able to pause time','be able to rewind time'],
  ['eat breakfast for dinner','eat dinner for breakfast'],
  ['live by a lake','live by the ocean'],
  ['have a cabin in the woods','have a condo in the city'],
  ['always have perfect weather','never hit traffic'],
  ['have free groceries','have free gas'],
  ['travel by train','travel by plane'],
  ['take a road trip','take a cruise'],
  ['visit the mountains','visit the beach'],
  ['explore a big city','explore a small town'],
  ['camp in a tent','stay in a hotel'],
  ['have a personal chef','have a housekeeper'],
  ['own a boat','own an RV'],
  ['watch sunrise','watch sunset'],
  ['have summer all year','have fall all year'],
  ['read the book','watch the movie'],
  ['play board games','play card games'],
  ['go bowling','go mini golfing'],
  ['attend a concert','attend a sporting event'],
  ['watch baseball','watch football'],
  ['eat sweet snacks','eat salty snacks'],
  ['choose pancakes','choose waffles'],
  ['choose burgers','choose tacos'],
  ['choose pizza','choose pasta'],
  ['choose soup','choose salad'],
  ['choose pie','choose cake'],
  ['have coffee','have tea'],
  ['eat chocolate','eat caramel'],
  ['have a dog','have a cat'],
  ['see the northern lights','see a meteor shower'],
  ['visit the Moon','visit Mars'],
  ['explore the ocean','explore outer space'],
  ['be able to fly','be able to breathe underwater'],
  ['be invisible','read minds'],
  ['speak every language','play every instrument'],
  ['remember everything','learn anything instantly'],
  ['never need sleep','never need to wait in line'],
  ['always find parking','always get green lights'],
  ['never lose your keys','never forget a password'],
  ['have a larger kitchen','have a larger garage'],
  ['have a porch','have a deck'],
  ['have a fireplace','have a hot tub'],
  ['have a home theater','have a game room'],
  ['have a huge garden','have a huge workshop'],
  ['have more closet space','have more pantry space'],
  ['work four long days','work five shorter days'],
  ['start work early','work later'],
  ['work from home','work in an office'],
  ['have more time','have more money'],
  ['receive a thoughtful gift','receive an experience'],
  ['host the party','attend the party'],
  ['plan the trip','just show up'],
  ['drive','be the passenger'],
  ['cook','do the dishes'],
  ['vacuum','do laundry'],
  ['mow the lawn','shovel snow'],
  ['paint a room','assemble furniture'],
  ['have a photographic memory','have perfect pitch'],
  ['be great at math','be great at writing'],
  ['be great at art','be great at music'],
  ['be a great storyteller','be a great listener'],
  ['visit the past','visit the future'],
  ['relive one great day','skip one bad day'],
  ['have one extra hour every day','have one extra day every month']
];

const wouldYouRather = [];
for (let i = 0; wouldYouRather.length < 365; i += 1) {
  const [a, b] = wyrSeeds[i % wyrSeeds.length];
  const round = Math.floor(i / wyrSeeds.length);
  const prefixes = ['', 'For one week, ', 'On your next vacation, ', 'For a whole month, ', 'If you had to choose, '];
  const prefix = prefixes[round % prefixes.length];
  wouldYouRather.push({
    q: `Would you rather ${prefix}${a} or ${b}?`,
    a: a.charAt(0).toUpperCase() + a.slice(1),
    b: b.charAt(0).toUpperCase() + b.slice(1)
  });
}

const curiosityThemeSpecs = [
  ['Everyday Science',['popcorn','onions','ice','smell and memory','wrinkled fingers','brain freeze','the blue sky']],
  ['Hidden History',['bubble wrap','Play-Doh','corn flakes','yellow pencils','Velcro','microwave ovens','accidental inventions']],
  ['Amazing Animals',['octopuses','crows','elephants','dolphins','bees','sea otters','animal teamwork']],
  ['Space Around Us',['sunlight travel time','the Moon','Mars','Saturn','Jupiter','the ISS','twinkling stars']],
  ['Food Science',['bread rising','caramelization','apples floating','bananas browning','salt preserving food','melting chocolate','fizzy soda']],
  ['Weather Wonders',['rainbows','thunder','hail','fog','snowflakes','wind','hurricane eyes']],
  ['Human Body',['goosebumps','hiccups','blinking','taste and smell','balance','sneezing','sleep']],
  ['Minnesota Curiosities',['Lake Superior','the 10,000 lakes nickname','northern lights','wild rice','loon calls','prairie roots','winter ice']],
  ['Kitchen Curiosity',['pasta softening','eggs solidifying','onions browning','bread going stale','ice cream melting','popcorn popping','microwave heating']],
  ['Ocean Mysteries',['deep-sea pressure','bioluminescence','coral reefs','tides','ocean currents','sea otters','whale songs']],
  ['Trees & Plants',['tree rings','sunflowers','cactus spines','maple sap','seed travel','fungal networks','fall colors']],
  ['Brain & Memory',['smell memory','music memory','spaced practice','sleep and memory','novelty','habits','attention']],
  ['Numbers Everywhere',['prime numbers','pi','a million seconds','a billion seconds','patterns','probability','zero']],
  ['Words & Language',['the alphabet','palindromes','the tittle','the ampersand','borrowed words','Morse code','Braille']],
  ['Everyday Engineering',['bridges','zippers','paper clips','ballpoint pens','QR codes','bar codes','elevators']],
  ['Road Trip Science',['tire pressure','road mirages','seat belts','GPS','engine cooling','wind resistance','road curves']],
  ['Home Science',['dust','static cling','refrigerators','thermostats','LED bulbs','insulation','smoke detectors']],
  ['Music & Sound',['pitch','volume','echoes','whale sound','dog hearing','instruments','recorded voices']],
  ['Color & Light',['prisms','the blue sky','sunsets','rainbows','UV light','infrared','screen colors']],
  ['Tiny Things',['atoms','cells','bacteria','dust mites','pollen','snow crystals','pixels']],
  ['Big Things',['blue whales','giant sequoias','Jupiter','the Pacific Ocean','mountain ranges','deserts','galaxies']],
  ['Great Lakes',['Lake Superior','freshwater','shipwrecks','lake-effect snow','waves','ice cover','watersheds']],
  ['Transportation',['planes','train wheels','bicycles','boats','car brakes','traffic lights','roundabouts']],
  ['Sports Science',['ball spin','basketball bounce','golf-ball dimples','baseball seams','ice skating','running shoes','reaction time']],
  ['Holiday Curiosities',['birthday candles','firework colors','pumpkin carving','gift wrapping','holiday lights','confetti','countdowns']],
  ['Nature at Night',['owl hearing','bat echolocation','fireflies','Moon phases','night-blooming flowers','stars','nocturnal animals']],
  ['Inventions',['Post-it Notes','microwave ovens','Velcro','bubble wrap','Popsicles','the computer mouse','zippers']],
  ['Farming & Food',['corn rows','soil','crop rotation','pollination','grain storage','dairy science','farm weather']],
  ['Birds',['migration','feathers','hummingbirds','owl flight','geese formations','penguins','birdsong']],
  ['Water',['surface tension','evaporation','condensation','freezing','boiling','capillary action','the water cycle']],
  ['Earth Science',['plate tectonics','volcanoes','earthquakes','fossils','rocks','sand colors','glaciers']],
  ['Maps & Navigation',['compasses','latitude','longitude','GPS','time zones','map projections','Polaris']],
  ['Sleep & Dreams',['REM sleep','the body clock','melatonin','dreams','sleep and memory','naps','morning light']],
  ['Simple Machines',['levers','pulleys','the wheel and axle','inclined planes','screws','wedges','gears']],
  ['Materials',['steel','glass','rubber','aluminum','paper','plastic','wood']],
  ['Cold Weather',['frost','black ice','wind chill','squeaky snow','lake ice','road salt','freezing pipes']],
  ['Hot Weather',['sweating','heat shimmer','asphalt','thunderstorms','sunburn','shade','evaporative cooling']],
  ['Garden Science',['soil','earthworms','compost','pollination','seeds','roots','flowers']],
  ['Everyday Chemistry',['rust','soap','baking soda','vinegar','yeast','salt','acids and bases']],
  ['Wildlife',['deer','bears','raccoons','foxes','moose','wolves','beavers']],
  ['Communication',['body language','names','eye contact','handshakes','smiling','tone of voice','listening']],
  ['Memory Tricks',['association','chunking','repetition','sleep','visual cues','location memory','writing things down']],
  ['Time',['time zones','leap years','calendars','atomic clocks','daylight saving time','solstices','equinoxes']],
  ['Money Curiosities',['coins','paper money','inflation','compound interest','credit cards','ATMs','bartering']],
  ['Architecture',['arches','domes','skyscrapers','foundations','bridges','elevators','insulation']],
  ['Fun with Food',['cheese','chocolate','coffee','tea','pizza','ice cream','spices']],
  ['Small Town Curiosities',['water towers','grain elevators','main streets','county fairs','railroad towns','post offices','local landmarks']],
  ['Photography',['aperture','shutter speed','focus','pixels','flash','lenses','phone cameras']],
  ['Soundtrack of Life',['earworms','rhythm','tempo','harmony','music and memory','concert acoustics','headphones']],
  ['Simple Psychology',['first impressions','habits','choice overload','social proof','gratitude','curiosity','laughter']],
  ['Work Smarter',['checklists','the two-minute rule','batching','timers','labels','defaults','preparation']],
  ['Travel Curiosities',['jet lag','airport codes','luggage tags','road signs','hotel keys','passports','maps']]
];

const curiosityWeeks = curiosityThemeSpecs.map(([theme, topics]) => ({
  theme,
  days: topics.map((topic, index) => ({
    text: `${topic.charAt(0).toUpperCase() + topic.slice(1)} has an everyday story behind it. What seems ordinary often depends on a surprising blend of science, history, design, and human behavior.`,
    teaser: index < topics.length - 1
      ? `Tomorrow: ${topics[index + 1].charAt(0).toUpperCase() + topics[index + 1].slice(1)}.`
      : 'Tomorrow: A completely new curiosity begins!'
  }))
}));

module.exports = {
  jokes,
  facts,
  questions,
  riddles,
  dailyTips,
  quizzes,
  curiosityWeeks,
  wouldYouRather
};
