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

const curatedDadJokes = [
  ["What do you call a paper airplane that won't fly?", "Stationary."],
  ["What do you call a magician who lost his magic?", "Ian."],
  ["What do you call milk that gets anything it wants?", "Spoiled milk."],
  ["What do you call someone who raises hens?", "A chicken tender."],
  ["What do you call a fly without wings?", "A walk."],
  ["What do you call a policeman in bed?", "An undercover cop."],
  ["How do you make 7 even?", "Take away the S."],
  ["What do a tick and the Eiffel Tower have in common?", "They're both Paris sites."],
  ["What do you call someone with no body and no nose?", "Nobody knows."],
  ["Why can't you hear a pterodactyl go to the bathroom?", "The P is silent."],
  ["What do you call a homeless horse?", "Unstable."],
  ["What do you call a dead musician?", "A decomposer."],
  ["What do you call a crab that plays baseball?", "A pinch hitter."],
  ["What do you call the lights on Noah's Ark?", "Flood lights."],
  ["What do you call a boomerang that won't come back?", "A stick."],
  ["What do you call a medieval lamp?", "A knight light."],
  ["What do you call people who love ceilings?", "Ceiling fans."],
  ["What's the difference between a hippo and a Zippo?", "One is heavy; the other is a little lighter."],
  ["What's the difference between a poorly dressed man on a unicycle and a well-dressed man on a bicycle?", "Attire."],
  ["What do you call a cow's sting operation?", "A steak out."],
  ["What do you call a cow that enjoys stand-up comedy?", "A laughing stock."],
  ["Why do cows have bells?", "Their horns don't work."],
  ["Where do shrimp go for cash in a pinch?", "The prawn shop."],
  ["What kind of fish eats mice?", "A catfish."],
  ["What's orange and sounds like a parrot?", "A carrot."]
];

const jokes = curatedDadJokes;



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
const curatedFactAdditions = [
  "Octopuses have blue blood because their oxygen-carrying protein contains copper instead of iron.",
  "Crows can remember human faces for years.",
  "Ravens have been observed planning for future events.",
  "Elephants can communicate with low-frequency rumbles that travel through the ground.",
  "Dolphins use signature whistles that function much like individual names.",
  "Sea otters sometimes use the same favorite rock repeatedly as a tool for opening shellfish.",
  "Goats have rectangular pupils, which help give them a wide field of view.",
  "Reindeer eyes can change color with the seasons to adapt to changing Arctic light.",
  "Male seahorses carry and give birth to the young.",
  "Hummingbirds are the only birds that can fly backward under their own power.",
  "Owls have asymmetrical ear openings that help them pinpoint sound in the dark.",
  "Penguins have knees, but much of their legs are hidden inside their bodies.",
  "Polar bear fur is actually transparent; it only appears white because it scatters light.",
  "Butterflies taste with sensors on their feet.",
  "Dragonflies can fly forward, backward, sideways, and even hover.",
  "Woodpeckers have specialized anatomy that helps protect their brains during repeated pecking.",
  "Some frogs can survive winter with ice forming in parts of their bodies.",
  "Sloths can hold their breath longer than many dolphins.",
  "Sharks are older than trees in the fossil record.",
  "Whale sharks are the largest fish alive today.",
  "Blue whales are the largest animals known to have ever lived.",
  "Starfish are more accurately called sea stars because they are not fish.",
  "Sea cucumbers can eject internal organs as a defense and later regrow them.",
  "Barnacles are crustaceans, making them relatives of crabs and shrimp.",
  "Clownfish can change sex during their lifetime.",
  "Salmon can use Earth’s magnetic field as part of their navigation.",
  "Electric eels are actually a type of knifefish, not true eels.",
  "Some squid can change color almost instantly.",
  "Cuttlefish can change both the color and texture of their skin.",
  "Jellyfish do not have brains, hearts, or bones.",
  "Bioluminescence is especially common among animals that live in the deep ocean.",
  "Coral reefs are built by tiny animals called coral polyps.",
  "Phytoplankton in the ocean produce a major share of the oxygen in Earth’s atmosphere.",
  "Kelp can grow more than a foot in a single day under ideal conditions.",
  "Banana plants are giant herbs, not trees.",
  "Bamboo is a grass.",
  "Peanuts grow underground.",
  "Cashews grow attached to the bottom of a fruit called a cashew apple.",
  "Pineapples are made from many individual berries that fuse together.",
  "Vanilla comes from the fruit of an orchid.",
  "Coffee beans are actually seeds found inside coffee cherries.",
  "Chocolate comes from seeds of the cacao tree.",
  "Broccoli, cabbage, kale, cauliflower, and Brussels sprouts all come from the same plant species.",
  "Carrots were commonly purple, white, or yellow before orange varieties became widespread.",
  "An average ear of corn usually has an even number of rows.",
  "Apples float because roughly one-quarter of their volume is air.",
  "Popcorn pops because moisture inside the kernel turns to steam and builds pressure.",
  "Maple sap flows best when nights are below freezing and days rise above freezing.",
  "Cheese has been made by humans for thousands of years.",
  "Salt was once valuable enough to be used as a form of payment in some cultures.",
  "The bubbles in carbonated drinks are carbon dioxide gas escaping from the liquid.",
  "Mint feels cool because menthol activates cold-sensitive receptors in your skin and mouth.",
  "Spicy peppers feel hot because capsaicin activates heat and pain receptors.",
  "Onions make your eyes water because cutting them releases irritating sulfur-containing compounds.",
  "Your tongue does not have separate zones for sweet, salty, sour, and bitter tastes.",
  "Much of what we experience as flavor actually comes from smell.",
  "Your left lung is smaller than your right lung to make room for your heart.",
  "The smallest bones in the human body are in the middle ear.",
  "Babies are born with more bones than adults because some bones fuse together as they grow.",
  "Your skin is your body’s largest organ.",
  "Fingerprints form before birth.",
  "Identical twins do not have identical fingerprints.",
  "Your pupils change size automatically to control how much light enters your eyes.",
  "Your body replaces millions of red blood cells every second.",
  "Your heart beats roughly 100,000 times in a typical day.",
  "Your brain uses a surprisingly large share of your body’s energy even though it makes up only a small part of your weight.",
  "Goosebumps are a leftover reflex from ancestors with much more body hair.",
  "Hiccups are involuntary spasms of the diaphragm.",
  "Your sense of balance depends heavily on tiny fluid-filled structures in your inner ear.",
  "Wrinkled fingertips in water are partly caused by your nervous system, not just by skin swelling.",
  "Brain freeze is triggered when very cold food rapidly cools tissues near the roof of your mouth.",
  "Smells can trigger vivid memories because smell-processing areas are closely linked with memory and emotion centers in the brain.",
  "Sleep helps your brain strengthen and organize memories.",
  "Walking can improve creative thinking for many people.",
  "Practice spread out over time usually helps long-term learning more than one long cram session.",
  "Explaining an idea to someone else can help you understand it better yourself.",
  "Novel experiences often seem longer in memory than routine ones.",
  "People tend to remember the beginning and end of an experience better than the middle.",
  "Your voice sounds different in recordings because you normally hear it partly through vibrations in your skull.",
  "Yawning is contagious in humans and in some other animals.",
  "Humans are one of the few species known to blush.",
  "Earth’s atmosphere is mostly nitrogen, not oxygen.",
  "The Sun contains more than 99% of the mass in our solar system.",
  "Light from the Sun takes about eight minutes to reach Earth.",
  "More than one million Earths could fit inside the Sun by volume.",
  "Venus is hotter than Mercury even though Mercury is closer to the Sun.",
  "A day on Venus is longer than a year on Venus.",
  "Uranus rotates on its side compared with most other planets.",
  "Jupiter’s Great Red Spot is a giant storm that has lasted for centuries.",
  "Saturn’s rings are made mostly of ice particles mixed with rock and dust.",
  "Mars is home to Olympus Mons, the largest volcano known in the solar system.",
  "The Moon is slowly moving away from Earth by a few centimeters each year.",
  "The Moon always shows nearly the same face to Earth because it is tidally locked.",
  "Astronauts aboard the International Space Station see about 16 sunrises and sunsets each day.",
  "Footprints on the Moon can last for millions of years because there is almost no wind or rain.",
  "A light-year is a measure of distance, not time.",
  "Sound cannot travel through the vacuum of space.",
  "Stars appear to twinkle because Earth’s atmosphere bends their light.",
  "Polaris is called the North Star, but it is not the brightest star in the night sky.",
  "Sirius is the brightest star visible in Earth’s night sky.",
  "The Milky Way is a barred spiral galaxy.",
  "The Andromeda Galaxy is the nearest large galaxy to the Milky Way.",
  "Earth is about 4.5 billion years old.",
  "Earth’s continents move a few centimeters each year because of plate tectonics.",
  "Most of Earth’s volcanic activity happens underwater.",
  "The deepest known point in the ocean is in the Mariana Trench.",
  "The Pacific Ocean is larger than all of Earth’s land area combined.",
  "About 97% of Earth’s water is saltwater.",
  "Glaciers store a large portion of Earth’s freshwater.",
  "Lake Baikal is the deepest freshwater lake in the world.",
  "Lake Superior is the largest freshwater lake in the world by surface area.",
  "Antarctica is the driest continent on Earth.",
  "The Sahara is the largest hot desert in the world.",
  "Obsidian is volcanic glass.",
  "Pumice can float because it contains many trapped gas bubbles.",
  "Amber is fossilized tree resin.",
  "Some beaches have black, green, pink, or even purple sand.",
  "Snowflakes usually have six-fold symmetry.",
  "No two snowflakes are likely to be exactly alike because each follows a unique path through the atmosphere.",
  "Thunder is caused by air rapidly expanding after lightning heats it.",
  "Lightning can heat the surrounding air to temperatures hotter than the surface of the Sun.",
  "Fog is essentially a cloud at ground level.",
  "Raindrops are shaped more like hamburger buns than teardrops as they fall.",
  "A rainbow is actually a full circle, but the ground usually blocks the lower half.",
  "The eye of a hurricane is often much calmer than the surrounding storm.",
  "Hurricanes, typhoons, and cyclones are the same basic kind of storm with different regional names.",
  "Water expands when it freezes, which is why ice floats.",
  "Water boils at a lower temperature at high elevations because air pressure is lower.",
  "Metal often feels colder than wood at the same temperature because it pulls heat from your skin faster.",
  "Glass is an amorphous solid.",
  "Diamonds and graphite are both made of carbon atoms arranged in different structures.",
  "Pure gold is soft enough to be shaped relatively easily.",
  "Aluminum was once considered more precious than gold because it was difficult to refine.",
  "Steel is mostly iron with a small amount of carbon.",
  "Rubber can be made from latex harvested from certain trees.",
  "Velcro was inspired by burrs that stuck to an engineer’s clothing and his dog’s fur.",
  "Bubble wrap was originally invented as textured wallpaper.",
  "Play-Doh began as a wallpaper-cleaning product.",
  "Post-it Notes grew out of an adhesive that was initially considered too weak for many uses.",
  "The microwave oven was inspired in part by an engineer noticing a candy bar melt near radar equipment.",
  "The first computer mouse was made of wood.",
  "The first webcam was used to monitor a coffee pot.",
  "The first text message sent in 1992 said 'Merry Christmas.'",
  "The @ symbol existed for centuries before email.",
  "QR codes were invented in Japan to help track automotive parts.",
  "The first supermarket barcode scan was on a pack of chewing gum.",
  "Bluetooth was named after a 10th-century Danish king.",
  "GPS works only because satellites carry extremely precise clocks.",
  "Wi-Fi signals are a type of radio wave.",
  "The World Wide Web was proposed in 1989.",
  "Email existed before the World Wide Web.",
  "The hashtag symbol is also called an octothorpe.",
  "The word 'robot' comes from a Czech word related to work or forced labor.",
  "The dot above a lowercase i or j is called a tittle.",
  "The ampersand evolved from a stylized version of the Latin word 'et,' meaning 'and.'",
  "The word 'alphabet' comes from the Greek letters alpha and beta.",
  "A palindrome reads the same forward and backward, such as 'level.'",
  "The sentence 'The quick brown fox jumps over the lazy dog' contains every letter of the English alphabet.",
  "Braille is read by touch using patterns of raised dots.",
  "Morse code represents letters using combinations of dots and dashes.",
  "Two is the only even prime number.",
  "Pi is irrational, so its decimal digits never end or repeat in a fixed pattern.",
  "A googol is the number 1 followed by 100 zeros.",
  "A million seconds is about 11.6 days.",
  "A billion seconds is about 31.7 years.",
  "A trillion seconds is more than 31,000 years.",
  "The Eiffel Tower can grow several inches taller in summer because metal expands when heated.",
  "Russia spans eleven time zones.",
  "Canada has more lakes than any other country.",
  "Australia is wider than the Moon.",
  "Minnesota has more than 11,000 lakes that are at least 10 acres in size.",
  "Lake Superior contains about 10% of the world’s surface freshwater.",
  "Prairie grasses can have roots that extend several feet underground.",
  "Beavers can dramatically reshape landscapes by building dams.",
  "Earthworms improve soil by tunneling and breaking down organic matter.",
  "Fungi are more closely related to animals than to plants.",
  "Yeast is a fungus.",
  "Some fungi glow in the dark.",
  "Lichens are partnerships between fungi and photosynthetic organisms.",
  "Venus flytraps can count touches before snapping shut.",
  "Sunflowers track the Sun while they are young.",
  "Cactus spines are modified leaves.",
  "Bristlecone pines are among the oldest individual living trees on Earth.",
  "Some bamboo species can grow more than two feet in a single day under ideal conditions.",
  "Maple seeds spin like tiny helicopters as they fall.",
  "Some pinecones open in response to heat from wildfire.",
  "Leaves change color in autumn as chlorophyll breaks down and other pigments become visible.",
  "Trees can exchange chemical signals through underground fungal networks.",
  "Palm trees are more closely related to grasses than to oak trees.",
  "Raspberries and blackberries are made of many tiny fruitlets called drupelets.",
  "Avocados are berries botanically.",
  "Pumpkins are fruits botanically.",
  "Cucumbers are fruits botanically.",
  "Sweet potatoes and regular potatoes come from different plant families.",
  "Rice is a staple food for more than half of the world’s population.",
  "Tea is one of the most widely consumed beverages in the world.",
  "An adult giraffe has the same number of neck vertebrae as a human: seven.",
  "Koalas sleep much of the day because eucalyptus leaves provide relatively little energy.",
  "Raccoons have extremely sensitive front paws.",
  "Porcupine quills are modified hairs.",
  "Armadillos can hold their breath for several minutes.",
  "Kangaroos cannot walk backward easily.",
  "Camels have three sets of eyelids to help protect their eyes from sand.",
  "Alpacas hum to communicate.",
  "Sheep can recognize individual faces.",
  "Chickens can remember dozens of individual faces.",
  "Ducks can sleep with one half of their brain more alert than the other.",
  "Wild turkeys can fly short distances.",
  "Moose are excellent swimmers.",
  "Bison can run faster than humans.",
  "Black bears are strong climbers.",
  "Polar bears are classified as marine mammals.",
  "Rats make ultrasonic laughter-like sounds when tickled.",
  "Domestic cats can rotate their ears independently.",
  "Bloodhounds can follow scent trails that are days old.",
  "Cows have a four-compartment stomach.",
  "Pigs are highly intelligent and can learn complex tasks.",
  "Goats can solve simple puzzles.",
  "Donkeys have excellent memories for places and other donkeys.",
  "Emperor penguins balance their eggs on their feet under a warm brood pouch.",
  "An albatross can glide enormous distances with very little flapping.",
  "Some birds can see ultraviolet light.",
  "Lyrebirds can imitate sounds such as camera shutters, chainsaws, and alarms.",
  "Mockingbirds can learn and imitate many different songs.",
  "New Caledonian crows can make tools from sticks and leaves.",
  "Chimpanzees use sticks to collect termites.",
  "Capuchin monkeys use stones to crack nuts.",
  "Some dolphins use marine sponges to protect their snouts while foraging.",
  "Orcas have hunting traditions that can be passed socially within pods.",
  "Prairie dogs have surprisingly complex alarm calls.",
  "Meerkats teach young pups how to handle dangerous prey.",
  "Elephants can detect vibrations through their feet.",
  "An octopus has a doughnut-shaped brain that surrounds its esophagus.",
  "Blue whale hearts can weigh hundreds of pounds.",
  "Peregrine falcons are among the fastest animals on Earth when diving.",
  "Arctic foxes change coat color seasonally in many regions.",
  "Snowshoe hares often grow white winter coats.",
  "Birds are living dinosaurs.",
  "Feathers evolved before modern birds appeared.",
  "Hummingbird hearts can beat more than 1,000 times per minute during intense activity.",
  "Geese flying in a V formation can reduce the energy needed for long-distance travel.",
  "Your eyes blink thousands of times every day.",
  "Tears help clean and protect the surface of your eyes.",
  "Deep breathing can activate the body’s relaxation response.",
  "Helping someone else can improve the helper’s mood as well as the recipient’s.",
  "Shared meals are associated with stronger social connection.",
  "People often mirror one another’s body language during comfortable conversations.",
  "Applause has been used as a sign of approval for thousands of years.",
  "The modern zipper evolved from several earlier fastener inventions.",
  "Ballpoint pens use a tiny rolling ball to transfer ink onto paper.",
  "Recycling aluminum uses much less energy than producing aluminum from ore.",
  "Glass can be recycled repeatedly without losing its basic material quality.",
  "Steel is one of the most recycled materials in the world.",
  "Composting turns organic waste into nutrient-rich material for soil.",
  "Wetlands can help filter water and reduce flooding.",
  "Fire can help certain ecosystems regenerate.",
  "Some flowers generate heat to help spread their scent.",
  "Some desert plants open their pores at night to conserve water.",
  "Mosses do not have true roots like flowering plants do.",
  "Ferns reproduce with spores rather than seeds."
];

for (const fact of curatedFactAdditions) {
  if (facts.length >= 365) break;
  if (!facts.includes(fact)) facts.push(fact);
}

if (facts.length < 365) {
  throw new Error(`Not enough curated facts: ${facts.length}/365`);
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

const riddles = [
  {
    q: "What gets wetter the more it dries?",
    a: "A towel.",
    answer: "A towel."
  },
  {
    q: "What has many keys but can't open a single lock?",
    a: "A piano.",
    answer: "A piano."
  },
  {
    q: "What can travel around the world while staying in one corner?",
    a: "A stamp.",
    answer: "A stamp."
  },
  {
    q: "The more you take, the more you leave behind. What am I?",
    a: "Footsteps.",
    answer: "Footsteps."
  },
  {
    q: "What has one eye but cannot see?",
    a: "A needle.",
    answer: "A needle."
  },
  {
    q: "What can fill a room but takes up no space?",
    a: "Light.",
    answer: "Light."
  },
  {
    q: "What belongs to you but other people use it more than you do?",
    a: "Your name.",
    answer: "Your name."
  },
  {
    q: "What has cities but no houses, forests but no trees, and water but no fish?",
    a: "A map.",
    answer: "A map."
  },
  {
    q: "What can you break without touching or dropping it?",
    a: "A promise.",
    answer: "A promise."
  },
  {
    q: "What has a head and a tail but no body?",
    a: "A coin.",
    answer: "A coin."
  },
  {
    q: "What goes up but never comes back down?",
    a: "Your age.",
    answer: "Your age."
  },
  {
    q: "I shave every day, but my beard stays the same. Who am I?",
    a: "A barber.",
    answer: "A barber."
  },
  {
    q: "What has 13 hearts but no lungs, stomach, or brain?",
    a: "A deck of cards.",
    answer: "A deck of cards."
  },
  {
    q: "What has branches but no fruit, trunk, or leaves?",
    a: "A bank.",
    answer: "A bank."
  },
  {
    q: "What word becomes shorter when you add two letters to it?",
    a: "Short.",
    answer: "Short."
  },
  {
    q: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    a: "The letter M.",
    answer: "The letter M."
  },
  {
    q: "A man goes outside in pouring rain without an umbrella or hat. Not a single hair on his head gets wet. Why?",
    a: "He's bald.",
    answer: "He's bald."
  },
  {
    q: "What has a neck but no head, and wears a cap?",
    a: "A bottle.",
    answer: "A bottle."
  },
  {
    q: "What begins with T, ends with T, and has T inside it?",
    a: "A teapot.",
    answer: "A teapot."
  },
  {
    q: "What building has the most stories?",
    a: "A library.",
    answer: "A library."
  },
  {
    q: "What can run but never walks, has a mouth but never talks, and has a bed but never sleeps?",
    a: "A river.",
    answer: "A river."
  },
  {
    q: "Forward I am heavy, but backward I am not. What am I?",
    a: "Ton.",
    answer: "Ton."
  },
  {
    q: "I have keys but no locks, space but no room, and you can enter but can't go inside. What am I?",
    a: "A keyboard.",
    answer: "A keyboard."
  },
  {
    q: "What has six faces and twenty-one eyes but cannot see?",
    a: "A die.",
    answer: "A die."
  },
  {
    q: "You see a boat filled with people, yet there isn't a single person on board. How is that possible?",
    a: "Everyone on the boat is married.",
    answer: "Everyone on the boat is married."
  }
];


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

const curatedTipAdditions = [
  "Put tomorrow’s most important item by the door tonight so you cannot leave without it.",
  "Take a photo of where you parked in an unfamiliar lot.",
  "Keep one reusable shopping bag in your vehicle at all times.",
  "Before leaving a hotel room, check every outlet for chargers.",
  "Write the date on leftovers before putting them in the freezer.",
  "Keep your keys in the same place every time you come home.",
  "Use a recurring calendar reminder for tasks that happen only a few times a year.",
  "Photograph receipts for large purchases before the paper fades.",
  "Take a photo of model and serial numbers for major appliances.",
  "Label charging cables at both ends if several look alike.",
  "Keep a small flashlight where you can reach it during a power outage.",
  "Store a basic first-aid kit in both your home and vehicle.",
  "Put items you need to return in your car so they are with you when you pass the store.",
  "Put your grocery list in the order you normally walk through the store.",
  "If a task takes less than two minutes, do it now instead of adding it to a list.",
  "Before a road trip, download your route for offline use.",
  "If you lend something to someone, take a quick photo of them holding it.",
  "Put one donation box in a convenient place and add to it as you declutter.",
  "Set out tomorrow’s clothes before bed if mornings tend to feel rushed.",
  "Keep a permanent marker near the freezer for dating frozen food.",
  "Use the notes app on your phone for a running list of things you commonly forget.",
  "Photograph important paperwork with all four corners visible.",
  "Store emergency contacts under both name and relationship.",
  "Keep spare batteries next to the device they power.",
  "Put frequently used tools back in the same exact spot every time.",
  "Take a photo of your luggage before a flight.",
  "Before mailing a package, photograph the label and tracking number.",
  "Keep one phone charger permanently in your travel bag.",
  "Store a spare house key somewhere secure but separate from your everyday key ring.",
  "Keep a small umbrella in the car instead of trying to remember one on rainy days.",
  "Put a basket near the stairs for items that belong on another floor.",
  "Keep scissors where you actually open packages, not where you think scissors belong.",
  "Use clear bins for items you need to identify quickly.",
  "Label leftovers before putting them in the refrigerator if the container is opaque.",
  "Keep a simple household inventory of expensive electronics and appliances.",
  "Photograph the contents of your wallet so replacing cards is easier if it is lost.",
  "Store a copy of your insurance cards digitally on your phone.",
  "Keep a small roll of trash bags in the vehicle.",
  "Pack a small towel in the car; it is useful more often than you expect.",
  "Keep a pen in every bag you regularly carry.",
  "Set a timer when using the oven if you are likely to leave the kitchen.",
  "Keep one small toolkit in a central location instead of scattering tools around the house.",
  "Put batteries in a labeled bin by size.",
  "Keep a list of paint colors and brands used in each room.",
  "Write the purchase date on furnace filters so you know when they were changed.",
  "Take a photo before disassembling anything with lots of wires or parts.",
  "Use painter’s tape to label cords before unplugging a complicated setup.",
  "Keep spare light bulbs near the rooms where they are used.",
  "Store extension cords wrapped loosely rather than tightly around your arm.",
  "Keep a measuring tape in the car for furniture or home-improvement shopping.",
  "Photograph furniture dimensions before shopping for replacements.",
  "Take a photo of the inside of your refrigerator before grocery shopping.",
  "Keep a small notepad near the pantry for items that run out.",
  "Add recurring household supplies to a subscription only after you know your actual usage rate.",
  "Store commonly used cleaning supplies together in a portable caddy.",
  "Keep microfiber cloths near mirrors and screens so quick cleaning is easy.",
  "Use an old toothbrush for cleaning tight spaces around faucets and fixtures.",
  "Let a wet shower curtain dry fully open to reduce mildew.",
  "Run the bathroom fan during showers and for several minutes afterward.",
  "Clean lint from the dryer screen after every load.",
  "Vacuum refrigerator coils occasionally if they are accessible.",
  "Check smoke-alarm batteries on a recurring schedule.",
  "Keep the furnace-filter size saved in your phone.",
  "Store manuals digitally when possible instead of keeping piles of paper.",
  "Take photos of rooms before moving furniture so you can restore the layout if needed.",
  "Use felt pads under furniture legs to protect floors.",
  "Keep a small basket by the entry for gloves, hats, and other easy-to-lose items.",
  "Store seasonal items together and label the container clearly.",
  "Keep a basic sewing kit even if you rarely sew.",
  "Use bread clips or labels to identify cords behind a desk.",
  "Store spare buttons in one small container rather than separate envelopes.",
  "Keep a stain-removal pen where you eat or work.",
  "Treat clothing stains as soon as possible instead of waiting for laundry day.",
  "Zip zippers and fasten hooks before washing delicate clothing.",
  "Turn printed T-shirts inside out before washing to help preserve graphics.",
  "Air-dry items with elastic when practical to reduce wear.",
  "Wash towels separately from clothes if lint transfer is a problem.",
  "Fold fitted sheets by tucking the corners into one another first.",
  "Use one sock bag for small laundry items that often disappear.",
  "Keep a basket for clothes that can be worn again before washing.",
  "Do not overload the washing machine; clothes clean better when they can move.",
  "Clean the washing machine gasket and detergent drawer periodically.",
  "Leave the washer door slightly open after use if the manufacturer allows it.",
  "Keep a small bin for unmatched socks and revisit it once a month.",
  "Hang shirts immediately after drying to reduce wrinkles.",
  "Use ice cubes in the dryer briefly to help relax light wrinkles.",
  "Store sheet sets inside one matching pillowcase.",
  "Label shelves so everyone in the household knows where things belong.",
  "Give every frequently used item a permanent home.",
  "Keep surfaces clear by limiting what is allowed to live on them.",
  "Use one-in, one-out for items that easily accumulate, like mugs or water bottles.",
  "Declutter one drawer at a time instead of tackling an entire room.",
  "Keep a small trash bag with you when cleaning so you do not make repeated trips.",
  "Set a 10-minute cleanup timer and stop when it ends.",
  "Put cleaning supplies where the mess happens most often.",
  "Wipe spills immediately; dried spills take much longer to clean.",
  "Use a small basket to collect items that belong in other rooms.",
  "Do a five-minute reset before bed so the morning starts cleaner.",
  "Close kitchen cabinets and drawers as part of your nightly reset.",
  "Load the dishwasher as you cook instead of leaving everything until after dinner.",
  "Run the dishwasher overnight if your utility rates are lower then and the appliance is designed for unattended use.",
  "Empty the dishwasher while coffee or breakfast is being prepared.",
  "Keep one shelf in the refrigerator for leftovers so they are easy to see.",
  "Place older food in front and newer food behind it.",
  "Freeze bread before it goes stale if you will not use it in time.",
  "Store herbs upright in a glass of water when appropriate to extend freshness.",
  "Keep bananas away from some other produce if you want to slow ripening.",
  "Store potatoes and onions separately because each can shorten the other’s storage life.",
  "Use clear containers for leftovers so forgotten food is easier to spot.",
  "Keep a freezer inventory if you tend to forget what is inside.",
  "Freeze leftover tomato paste in tablespoon-sized portions.",
  "Freeze leftover herbs in ice-cube trays with water or oil as appropriate.",
  "Write the cooking time and temperature directly on freezer-meal labels.",
  "Use a damp paper towel under a cutting board to keep it from sliding.",
  "Sharpen kitchen knives regularly; dull knives can require more force and slip more easily.",
  "Rest meat briefly after cooking so juices redistribute.",
  "Let baked goods cool before sealing them to reduce condensation.",
  "Read the entire recipe once before starting.",
  "Measure all ingredients before beginning a complicated recipe.",
  "Clean as you go while something is simmering or baking.",
  "Put a wooden spoon across a pot as a reminder to watch for boiling over, but do not rely on it as a safety device.",
  "Microwave leftovers in a ring around the plate for more even heating.",
  "Cover food in the microwave to reduce splatter.",
  "Let microwaved food rest briefly so heat can distribute more evenly.",
  "Use kitchen shears for herbs, pizza, and some meats when faster than a knife.",
  "Freeze overripe bananas for smoothies or baking.",
  "Keep a few versatile pantry meals available for nights when plans fall apart.",
  "Make a double batch of a freezer-friendly meal when cooking anyway.",
  "Keep a list of five easy dinners your household actually likes.",
  "Plan meals around what needs to be used first, not just what sounds good.",
  "Check the pantry before shopping to avoid buying duplicates.",
  "Do not shop hungry if it makes you buy more than planned.",
  "Compare unit prices when package sizes differ.",
  "Buy in bulk only when you know you will actually use the product.",
  "Keep a running grocery list rather than rebuilding it from memory each week.",
  "Take a photo of a product label if you want to buy the exact same version later.",
  "Keep favorite restaurant orders in your phone if you often forget what you liked.",
  "Photograph a memorable meal if you want to recreate it later.",
  "Ask for sauces or dressings on the side if you want more control over the meal.",
  "Split large restaurant portions before you start eating if you want leftovers.",
  "Put half of takeout into a container before sitting down if you tend to overeat when distracted.",
  "Drink water while waiting for food instead of assuming hunger always means you need more food.",
  "Keep a reusable water bottle somewhere visible.",
  "Refill your water bottle whenever you pass a sink or fountain.",
  "Set a glass of water by your bed before going to sleep.",
  "Use a smaller plate if visual portion cues help you eat more intentionally.",
  "Keep healthy grab-and-go snacks visible and easy to reach.",
  "Wash and prep produce soon after bringing it home if that makes you more likely to eat it.",
  "Store less-healthy impulse snacks out of immediate sight if you are trying to reduce mindless eating.",
  "Pause before a second serving and decide whether you are still hungry.",
  "Eat without your phone for part of the meal if you want to notice the food and conversation more.",
  "Use restaurant meals as a chance to ask one better question than 'How was your day?'",
  "When meeting someone new, use their name once during the conversation to help remember it.",
  "Repeat important instructions back in your own words to catch misunderstandings early.",
  "Ask one follow-up question before changing the subject.",
  "Put your phone face down during an important conversation.",
  "If you interrupt someone, stop and invite them to finish.",
  "Write down commitments you make to other people instead of trusting memory.",
  "Send a quick thank-you message while gratitude is still fresh.",
  "Compliment something specific rather than giving a vague compliment.",
  "Use names in group conversations so everyone knows who you are addressing.",
  "Confirm dates and times in writing when plans matter.",
  "If plans change, tell people as soon as you know.",
  "Save important addresses in your contacts instead of searching for them repeatedly.",
  "Add notes to contacts when a detail will help you remember who someone is.",
  "Keep a short list of gift ideas for people throughout the year.",
  "Write down birthdays as soon as you learn them.",
  "Keep a small stock of greeting cards so you are not scrambling at the last minute.",
  "Take candid photos at family gatherings, not only posed group pictures.",
  "Write names and dates on the back of printed photos.",
  "Digitize old family photos before they deteriorate further.",
  "Ask older relatives to identify people in old photographs while they still can.",
  "Record family stories in audio or video instead of relying on memory.",
  "Write down recipes that currently live only in someone’s head.",
  "Keep one shared family calendar for major events.",
  "Use a recurring reminder for anniversaries and birthdays you do not want to miss.",
  "Add travel confirmation numbers to one note for the entire trip.",
  "Screenshot boarding passes before arriving at the airport.",
  "Pack medication and essential items in your carry-on rather than checked luggage.",
  "Put one change of clothes in your carry-on for longer trips.",
  "Keep travel-size toiletries packed if you travel often.",
  "Use packing cubes or separate bags to group clothing by type.",
  "Pack an empty reusable water bottle through airport security and fill it afterward.",
  "Keep copies of important travel documents in secure digital storage.",
  "Photograph the rental car before leaving the lot.",
  "Photograph the fuel gauge before returning a rental vehicle.",
  "Save the location of your hotel in your phone before going out.",
  "Screenshot important addresses in case cell service is poor.",
  "Download entertainment before a flight instead of relying on onboard Wi-Fi.",
  "Charge devices fully the night before travel.",
  "Keep a small power bank charged before trips.",
  "Pack one basic snack in case food is delayed.",
  "Use a bright luggage tag or strap to spot your bag quickly.",
  "Place contact information inside luggage as well as outside.",
  "Roll soft clothing to fill small gaps in luggage.",
  "Leave a little empty space in your suitcase for the return trip.",
  "Make a departure checklist for trips longer than a weekend.",
  "Put travel documents in the same pocket every time.",
  "Leave your house in a tidy state before vacation so returning feels easier.",
  "Pause mail or arrange pickup if you will be gone long enough for it to accumulate.",
  "Set one lamp on a timer if appropriate when traveling.",
  "Tell a trusted person your general itinerary when taking a longer trip.",
  "Check tire pressure before a long drive.",
  "Fill the gas tank the day before an early departure.",
  "Clean the windshield inside as well as outside before a road trip.",
  "Keep jumper cables or a jump pack in the vehicle.",
  "Keep a tire gauge in the glove box.",
  "Know where your spare tire, jack, and lug wrench are before you need them.",
  "Store roadside-assistance information in your phone.",
  "Keep an ice scraper in the vehicle before winter starts.",
  "Carry a blanket in the vehicle during cold-weather travel.",
  "Keep water and a small snack in the vehicle for unexpected delays.",
  "Photograph your vehicle’s license plate so you have it when filling out forms.",
  "Save your vehicle identification number in a secure note.",
  "Keep maintenance records in one place.",
  "Schedule the next oil change when the current one is completed.",
  "Check wiper blades before the rainy or snowy season.",
  "Replace worn windshield wipers before visibility becomes a problem.",
  "Keep washer fluid topped off, especially in winter.",
  "Do not ignore a new dashboard warning light without checking what it means.",
  "Use cruise control only when road and weather conditions make it appropriate.",
  "Increase following distance in rain, snow, or low visibility.",
  "Clear snow from the roof of the vehicle before driving.",
  "Do not leave loose heavy objects in the passenger area where they can become projectiles in a crash.",
  "Back into parking spaces when it makes departure safer and visibility better.",
  "Look behind the vehicle before getting in if children or pets may be nearby.",
  "Keep your phone out of reach while driving if you are tempted to check it.",
  "Set navigation before putting the vehicle in motion.",
  "Pull over safely before dealing with a dropped item or complicated phone task.",
  "Keep a pair of inexpensive sunglasses in the car.",
  "Use a windshield shade in hot weather to reduce interior heat.",
  "Park facing the direction you need to leave when practical.",
  "Take a photo of the parking level and row in large garages.",
  "Do not let the fuel level get extremely low during very cold weather if you can avoid it.",
  "Keep a small amount of cash somewhere separate from your wallet for emergencies.",
  "Review one recurring subscription each month to see whether you still use it.",
  "Use a separate savings account for irregular annual expenses.",
  "Divide annual bills by 12 and save that amount monthly.",
  "Set bill reminders a few days before due dates rather than on the due date itself.",
  "Automate savings transfers if consistency is difficult.",
  "Wait 24 hours before nonessential online purchases over your personal threshold.",
  "Remove saved card information from shopping sites if it makes impulse buying too easy.",
  "Unsubscribe from retail emails that regularly trigger unnecessary purchases.",
  "Compare the total cost, not just the monthly payment.",
  "Write down the reason for a large purchase before buying it.",
  "Check whether you already own a substitute before buying a new tool or household item.",
  "Borrow or rent rarely used equipment instead of automatically buying it.",
  "Keep a simple list of warranties and expiration dates for major purchases.",
  "Save digital copies of important receipts and warranties together.",
  "Review insurance deductibles periodically so you know what you would pay in a claim.",
  "Know the cancellation terms before signing up for a subscription or membership.",
  "Set a reminder before free trials convert to paid plans.",
  "Use one credit card for recurring bills if that makes monitoring easier.",
  "Check bank and credit-card transactions regularly for unfamiliar charges.",
  "Turn on transaction alerts if they help you spot problems quickly.",
  "Freeze your credit when you are not applying for new credit if appropriate for your situation.",
  "Use unique passwords for important accounts.",
  "Use a password manager rather than reusing easy-to-remember passwords.",
  "Turn on multi-factor authentication for important accounts.",
  "Do not approve unexpected login prompts you did not initiate.",
  "Keep recovery codes for important accounts in a secure place.",
  "Update your phone and computer when security updates are available.",
  "Back up important photos and documents in at least one additional location.",
  "Keep one offline copy of truly important files.",
  "Name digital files with dates first when chronological sorting matters.",
  "Use consistent folder names instead of inventing a new system every time.",
  "Delete duplicate downloads before they pile up.",
  "Archive files you rarely use instead of leaving everything on the desktop.",
  "Use browser bookmarks for sites you repeatedly search for.",
  "Create a bookmark folder for recurring bills and accounts.",
  "Pin your most-used apps or folders where they are easy to reach.",
  "Turn off nonessential notifications that constantly interrupt you.",
  "Put your phone on Do Not Disturb during focused work.",
  "Schedule specific times to check email instead of reacting to every notification.",
  "Write tomorrow’s top three priorities before ending the workday.",
  "Start with the task that will create the most relief if completed.",
  "Break a large project into the smallest visible next action.",
  "Use a timer when you are procrastinating on a task.",
  "Work in short focused intervals when concentration is low.",
  "Batch similar small tasks instead of switching constantly.",
  "Keep a 'waiting for' list for things other people owe you.",
  "Keep meeting notes in one predictable place.",
  "At the end of a meeting, write down who is responsible for each next step.",
  "Put deadlines on the calendar, not just on a to-do list.",
  "Add preparation time to the calendar before important deadlines.",
  "Leave buffer time between appointments when possible.",
  "Estimate how long a task will take, then compare with reality to improve future planning.",
  "Do not fill every open hour; unplanned problems need somewhere to go.",
  "Finish one small task before starting another when you feel scattered.",
  "Close unused browser tabs when they are adding visual clutter.",
  "Keep a scratch pad nearby for distracting thoughts that need attention later.",
  "Use templates for emails or documents you write repeatedly.",
  "Create checklists for tasks you do infrequently but cannot afford to forget steps on.",
  "Review recurring processes after mistakes instead of relying on memory to prevent them next time.",
  "Automate only a process you already understand.",
  "Keep instructions next to equipment that is rarely used.",
  "Document passwords, procedures, and contacts securely before they become urgent.",
  "Ask 'What could make this fail?' before launching an important task.",
  "Do a quick final review before sending an important email or document.",
  "Read numbers twice before submitting financial or scheduling information.",
  "Confirm attachments are included before hitting Send.",
  "Put the recipient address in last when writing a sensitive email.",
  "Use scheduled send if you draft emails late at night and want to review them in the morning.",
  "Write clear subject lines so emails are easier to find later.",
  "Archive completed email threads rather than leaving everything in the inbox.",
  "Use folders or labels only if you will actually maintain them.",
  "Search email by sender and keyword before assuming something is lost.",
  "Take screenshots of error messages before closing them.",
  "Copy exact error text rather than paraphrasing it when asking for technical help.",
  "Restart a device before spending a long time troubleshooting a strange temporary issue.",
  "Change one technical setting at a time so you know what fixed the problem.",
  "Write down working settings before changing them.",
  "Take a photo before unplugging cables from equipment.",
  "Use descriptive Wi-Fi network names but avoid including personal identifying information.",
  "Restart your router occasionally if your provider recommends it and performance is degraded.",
  "Keep router firmware updated if the device supports updates.",
  "Place a Wi-Fi router in an open central location when possible.",
  "Do not hide a router inside a metal cabinet if you want better signal.",
  "Use wired Ethernet for devices where stability matters more than convenience.",
  "Test internet speed near the router before blaming the provider for a weak signal in another room.",
  "Keep a note of important account numbers, support numbers, and service details in a secure location.",
  "Take a screenshot of confirmation pages after important online transactions.",
  "Save confirmation emails until the transaction or event is complete.",
  "Check spam or junk folders when an expected email does not arrive.",
  "Use a separate email address for newsletters and promotions if your main inbox is overwhelmed.",
  "Unsubscribe from mailing lists you no longer read.",
  "Use search rather than manually scrolling through long message histories.",
  "Pin important conversations if your messaging app supports it.",
  "Back up your phone before major software updates.",
  "Keep enough free storage space on your phone for updates and photos.",
  "Delete unused apps that constantly request updates or permissions.",
  "Review app permissions occasionally.",
  "Turn off location access for apps that do not need it.",
  "Use a screen lock on your phone.",
  "Set emergency contact information on your phone’s lock-screen medical ID if appropriate.",
  "Keep your phone charged above a comfortable minimum before leaving home.",
  "Carry a charging cable in the bag you use most often.",
  "Keep a small power bank charged if you spend long days away from outlets.",
  "Clean your phone screen and case periodically.",
  "Use a microfiber cloth on screens rather than paper towels.",
  "Take a photo instead of writing down complicated product labels or part numbers.",
  "Use voice notes when typing is impractical but you need to capture an idea.",
  "Create one note called 'Things to remember later' and review it weekly.",
  "Keep a list of restaurants, books, shows, or places people recommend to you.",
  "Add the reason you saved something so the note still makes sense months later.",
  "Use calendar reminders for follow-ups rather than hoping you will remember.",
  "Schedule the follow-up at the same time you send the original request.",
  "Set reminders for renewal dates well before cancellation deadlines.",
  "Put birthdays and anniversaries on recurring annual reminders.",
  "Set a yearly reminder to review beneficiaries and emergency contacts.",
  "Keep a list of home-maintenance tasks by season.",
  "Change HVAC filters according to the system and filter manufacturer’s guidance.",
  "Test sump pumps before the wet season if your home has one.",
  "Know where the main water shutoff valve is.",
  "Know where the electrical panel is and label breakers clearly.",
  "Know where the gas shutoff is if your home uses gas.",
  "Keep a fire extinguisher accessible in or near the kitchen.",
  "Do not store items directly against a furnace or water heater.",
  "Clean dryer vents periodically, not just the lint screen.",
  "Check exterior caulking and weather stripping before winter.",
  "Disconnect garden hoses before freezing weather if appropriate in your climate.",
  "Clean gutters before periods of heavy rain or snowmelt.",
  "Trim vegetation away from exterior HVAC equipment.",
  "Keep downspouts directing water away from the foundation.",
  "Take photos of rooms and possessions for insurance documentation.",
  "Store important home documents somewhere protected from fire and water.",
  "Keep contractor receipts for major home improvements.",
  "Write the date of installation on replacement filters and batteries.",
  "Keep a small supply of matching paint for touch-ups.",
  "Label paint cans with the room where the color is used.",
  "Use felt pads under furniture before moving it onto finished floors.",
  "Lift furniture instead of dragging it when possible.",
  "Vacuum under large furniture occasionally if airflow and dust buildup matter.",
  "Clean refrigerator door seals so they close properly.",
  "Keep the freezer reasonably full for efficiency, but do not block airflow.",
  "Do not block heating or cooling vents with furniture.",
  "Close curtains strategically to reduce heat gain or loss when useful.",
  "Use ceiling fans to improve comfort, but remember they cool people rather than empty rooms.",
  "Turn off lights in unused rooms if no one needs them.",
  "Use LED bulbs where practical for lower energy use and longer life.",
  "Unplug rarely used electronics if phantom loads matter to you.",
  "Run full loads in dishwashers and washing machines when practical.",
  "Air-dry dishes if your dishwasher has that option and you want to save energy.",
  "Fix dripping faucets; small leaks can waste a surprising amount of water.",
  "Do not ignore a running toilet.",
  "Keep a plunger in each bathroom before you need one.",
  "Know where the water shutoff is for toilets and sinks.",
  "Use drain strainers to catch hair and debris.",
  "Do not pour cooking grease down the drain.",
  "Let grease cool and dispose of it appropriately instead.",
  "Keep baking soda and vinegar for cleaning tasks where they are actually appropriate, but do not mix chemicals casually.",
  "Never mix bleach with ammonia or acidic cleaners.",
  "Read cleaning-product labels before combining or using them.",
  "Ventilate rooms when using strong cleaning products.",
  "Store household chemicals out of reach of children and pets.",
  "Keep medications in a secure, appropriate place rather than a humid bathroom if the label advises otherwise.",
  "Check expiration dates on medicines periodically.",
  "Dispose of medications according to local take-back guidance.",
  "Keep a list of allergies and medications available for emergencies if needed.",
  "Write emergency numbers somewhere visible even if they are also in your phone.",
  "Teach household members where emergency supplies are kept.",
  "Keep basic emergency supplies together rather than scattered around the house.",
  "Store some drinking water for short-term emergencies.",
  "Keep flashlights where people can actually find them in the dark.",
  "Use battery-powered lights instead of candles during power outages when possible.",
  "Charge backup batteries before severe weather is expected.",
  "Keep weather alerts enabled if severe weather is common in your area.",
  "Know the safest place in your home during severe weather.",
  "Do not rely on outdoor warning sirens to wake you indoors.",
  "Keep shoes near the bed during severe weather in case of broken glass or debris.",
  "Photograph storm damage before cleanup if it is safe and an insurance claim may be needed.",
  "Prioritize safety before documenting damage.",
  "Keep important numbers and policy information accessible during emergencies.",
  "Use sunscreen according to the product directions when spending time in strong sun.",
  "Keep sunglasses where you will actually wear them.",
  "Use hearing protection around loud tools and equipment.",
  "Take stretch breaks during long periods of sitting.",
  "Adjust your screen so you are not constantly looking sharply downward.",
  "Rest your eyes periodically by looking at something farther away.",
  "Stand up during phone calls if you have been sitting a long time.",
  "Take short walks between long work sessions.",
  "Put commonly used items within easy reach to reduce repetitive awkward movement.",
  "Lift heavy objects with help when they are beyond what you can safely manage.",
  "Clear walking paths before carrying large items.",
  "Use a step stool instead of standing on unstable furniture.",
  "Keep frequently used items between knee and shoulder height when possible.",
  "Do not leave cords across walkways.",
  "Wipe wet floors promptly and mark them if others may walk through.",
  "Replace loose rugs or use nonslip backing where needed.",
  "Keep stairs well lit.",
  "Use night-lights in unfamiliar or frequently traveled areas at night.",
  "Put a flashlight near the electrical panel.",
  "Check outdoor steps for ice before carrying items down them.",
  "Keep salt or ice melt accessible before winter storms.",
  "Shovel early in a snowfall if repeated lighter passes are easier than one heavy pass.",
  "Use proper footwear on icy surfaces.",
  "Give yourself extra travel time in bad weather instead of rushing.",
  "Check road conditions before leaving during winter weather.",
  "Brush snow from headlights and taillights as well as windows.",
  "Keep your phone charged before severe winter weather.",
  "Store gloves and a hat in the vehicle during winter.",
  "Keep a blanket and small emergency kit in the vehicle during cold months.",
  "Know the difference between a weather watch and a warning.",
  "Check the forecast before outdoor events, not after you arrive.",
  "Bring layers when temperatures may change significantly.",
  "Pack a light rain layer when the forecast is uncertain.",
  "Use insect repellent according to label directions when needed.",
  "Check for ticks after time in tall grass or wooded areas.",
  "Wash reusable water bottles regularly, including lids and straws.",
  "Clean reusable grocery bags periodically.",
  "Dry damp towels and clothing promptly to reduce odor and mildew.",
  "Do not leave wet gym clothes sealed in a bag longer than necessary.",
  "Clean headphones and earbuds periodically.",
  "Replace toothbrushes according to dental guidance and after significant wear.",
  "Keep spare toiletries for guests in one small bin.",
  "Use travel-size containers labeled clearly so products are not confused.",
  "Keep a small stain-removal kit in your travel bag.",
  "Pack one plastic or waterproof bag for wet clothing during trips.",
  "Bring a small laundry bag for dirty clothes when traveling.",
  "Keep shoes in separate bags inside luggage.",
  "Put fragile items in the center of a suitcase surrounded by soft clothing.",
  "Keep liquids in a separate leak-resistant bag while traveling.",
  "Photograph packed luggage if you want a record of contents.",
  "Review your packing list after every trip and improve it for next time.",
  "Keep a permanent travel checklist instead of recreating one from memory.",
  "Save favorite travel spots in a map list for future trips.",
  "Add notes to saved places so you remember why you saved them.",
  "Keep a running list of local places you want to try.",
  "Try one unfamiliar menu item occasionally if you enjoy discovering new foods.",
  "Ask a server what the restaurant is especially known for if you are unsure what to order.",
  "Check restaurant hours before driving across town.",
  "Make reservations early for special occasions when the restaurant accepts them.",
  "Put reservation confirmations on your calendar.",
  "Add the restaurant address to the calendar event so navigation is one tap away.",
  "Take a photo of a great menu item if you want to remember what to order next time.",
  "Save favorite takeout orders in a note for quick reordering.",
  "Keep track of dietary restrictions when planning group meals.",
  "Ask guests about allergies before hosting a meal.",
  "Label dishes at potlucks when ingredients may matter.",
  "Bring containers for leftovers if you are hosting a large gathering.",
  "Prepare one or two dishes ahead of time so hosting day is less hectic.",
  "Set the table before the last-minute cooking rush.",
  "Empty the dishwasher before guests arrive so cleanup has somewhere to go.",
  "Put trash and recycling bins where guests can find them.",
  "Keep serving utensils with the dishes they belong to before guests arrive.",
  "Write down oven times for multiple dishes so they finish together.",
  "Use phone alarms for cooking steps when hosting and distracted.",
  "Make coffee or breakfast supplies easy to find for overnight guests.",
  "Put out extra towels before guests ask.",
  "Keep guest Wi-Fi information somewhere easy to share.",
  "Write down the Wi-Fi password rather than spelling it repeatedly.",
  "Have one obvious place for guests to put coats and bags.",
  "Turn on outdoor lights before evening guests arrive.",
  "Clear the walkway before visitors arrive in winter.",
  "Tell guests about unusual steps, pets, or parking issues ahead of time.",
  "Send the address and parking instructions before gatherings.",
  "Keep one folding table or extra chair option available for larger groups.",
  "Use place cards only when they solve a real seating problem.",
  "Take a group photo early in the gathering before anyone leaves.",
  "Do not wait until the end of an event to start taking photos.",
  "Ask someone else to take a few photos so the host appears in them too.",
  "Back up important event photos soon afterward.",
  "Send photos to people while the event is still fresh.",
  "Write down one favorite memory after a meaningful day.",
  "Keep a simple gratitude note if it helps you notice good moments.",
  "Before bed, write down one thing you do not want to forget from the day.",
  "Keep one small notebook for ideas that are worth revisiting.",
  "Review old notes periodically; good ideas are often forgotten rather than bad.",
  "Do not save every idea—mark the ones you actually intend to act on.",
  "Turn vague goals into specific next actions.",
  "Make the next step small enough that you can start it today.",
  "Track progress in a visible way if motivation improves when you can see movement.",
  "Celebrate finished milestones instead of immediately moving to the next task.",
  "Build routines around existing habits rather than relying on motivation alone.",
  "Make good habits easier by putting tools in plain sight.",
  "Make unwanted habits harder by adding one small barrier.",
  "Prepare the environment before relying on willpower.",
  "Decide tomorrow’s first task before ending today.",
  "Start important work before checking low-priority messages if possible.",
  "Protect your best-focus time from routine interruptions.",
  "Use a written checklist when accuracy matters more than speed.",
  "Slow down for the final 5% of a task; many errors happen at the finish line.",
  "Review names, dates, amounts, and addresses twice before submitting important information.",
  "Read forms from top to bottom before signing.",
  "Keep copies of documents you submit when they may matter later.",
  "Date notes when recording important conversations.",
  "Write down who told you something, not just what they said.",
  "Save screenshots of online confirmations with the date visible when useful.",
  "Keep project files in one folder before collaboration begins.",
  "Agree on file naming before several people start creating versions.",
  "Use version numbers or dates instead of names like 'final-final-2.'",
  "Keep an untouched original before making major edits.",
  "Back up a file before making a risky change.",
  "Make one change at a time when troubleshooting code or settings.",
  "Test after each meaningful change so you know what caused the result.",
  "Write down the last known working state before a larger technical change.",
  "Commit working code before starting a risky experiment.",
  "Use clear commit messages that describe what changed.",
  "Do not deploy several unrelated changes at once if you can avoid it.",
  "Check logs immediately after deployment.",
  "Test the live site after deployment, not only the local version.",
  "Keep a simple launch checklist for features you deploy repeatedly.",
  "Fix broken core functionality before adding new features.",
  "Do not optimize something that is already working unless the benefit is clear.",
  "Keep user-facing text short when the user is already in the middle of a task.",
  "Use consistent button labels across a site.",
  "Make the most important action visually obvious.",
  "Do not make users guess whether something saved successfully.",
  "Show clear success and error messages after forms submit.",
  "Keep form labels visible instead of relying only on placeholders.",
  "Ask only for information you actually need.",
  "Use sensible defaults to reduce repetitive data entry.",
  "Test mobile layouts at realistic phone widths.",
  "Check that images fit both wide and square containers.",
  "Avoid layout shifts that make content jump while someone is reading.",
  "Keep clickable targets large enough for thumbs on mobile screens.",
  "Do not hide important information behind hover-only interactions on mobile.",
  "Test links after moving or renaming pages.",
  "Open external links in a new tab only when it improves the user experience.",
  "Use descriptive alt text for meaningful images.",
  "Compress large images so pages load faster.",
  "Keep original high-resolution artwork outside the website repository if it is not needed there.",
  "Use consistent image dimensions when rotating ads or cards.",
  "Keep placeholder content obviously temporary in admin tools but polished on the public site.",
  "Do not let filler content reach production just to hit a quantity goal.",
  "Read generated content as a customer would before publishing it.",
  "Ask whether each daily item is worth a diner’s attention before keeping it.",
  "Choose quality over quantity when content is supposed to entertain.",
  "Replace repeated templates when users are likely to notice the pattern.",
  "Keep trivia questions broad enough to be fun but specific enough to have one clear answer.",
  "Make riddles solvable without giving away the answer inside the question.",
  "Use random facts that create curiosity, not facts that merely state arithmetic.",
  "Choose discussion questions that two people could actually talk about for more than ten seconds.",
  "Use Would You Rather choices that create a genuine dilemma.",
  "Make tips specific enough that someone could use them today.",
  "End curiosity teasers with a reason to come back tomorrow.",
  "Review seasonal content before the season arrives.",
  "Keep evergreen content separate from date-specific content.",
  "Test date-based content around year-end and leap years.",
  "Keep a fallback for dynamic content sources that may fail temporarily.",
  "Log API failures clearly enough that you can tell which endpoint broke.",
  "Do not let one failed section crash the entire page if a fallback can keep the site usable."
];

const dailyTips = [...tipSeeds];
for (const tip of curatedTipAdditions) {
  if (dailyTips.length >= 365) break;
  if (!dailyTips.includes(tip)) dailyTips.push(tip);
}

if (dailyTips.length < 365) {
  throw new Error(`Not enough curated tips: ${dailyTips.length}/365`);
}

const quizzes = [
  {
    q: "What is the only mammal capable of true, sustained flight?",
    a: "A bat",
    options: ["A flying squirrel", "A sugar glider", "A bat", "A colugo"]
  },
  {
    q: "Which U.S. state is closest to Africa?",
    a: "Maine",
    options: ["Florida", "Maine", "North Carolina", "Massachusetts"]
  },
  {
    q: "What is the largest internal organ in the human body?",
    a: "The liver",
    options: ["The liver", "The lungs", "The brain", "The large intestine"]
  },
  {
    q: "What is the smallest country in the world by land area?",
    a: "Vatican City",
    options: ["Monaco", "San Marino", "Liechtenstein", "Vatican City"]
  },
  {
    q: "Which planet has the shortest day in our solar system?",
    a: "Jupiter",
    options: ["Saturn", "Neptune", "Jupiter", "Mars"]
  },
  {
    q: "What common food can remain edible for thousands of years when properly sealed?",
    a: "Honey",
    options: ["Salt", "Honey", "Rice", "Sugar"]
  },
  {
    q: "What is the only letter that does not appear in the name of any U.S. state?",
    a: "Q",
    options: ["X", "Z", "J", "Q"]
  },
  {
    q: "Which Great Lake is the only one located entirely within the United States?",
    a: "Lake Michigan",
    options: ["Lake Michigan", "Lake Superior", "Lake Erie", "Lake Huron"]
  },
  {
    q: "What instrument is used to measure atmospheric pressure?",
    a: "A barometer",
    options: ["A hygrometer", "A barometer", "An anemometer", "A hydrometer"]
  },
  {
    q: "What was the first toy advertised on television?",
    a: "Mr. Potato Head",
    options: ["Slinky", "Etch A Sketch", "Mr. Potato Head", "Lincoln Logs"]
  },
  {
    q: "Which blood type is known as the universal red-cell donor?",
    a: "O negative",
    options: ["AB negative", "O positive", "A negative", "O negative"]
  },
  {
    q: "What is the capital of Australia?",
    a: "Canberra",
    options: ["Canberra", "Sydney", "Melbourne", "Brisbane"]
  },
  {
    q: "Which element has the chemical symbol K?",
    a: "Potassium",
    options: ["Krypton", "Potassium", "Calcium", "Cobalt"]
  },
  {
    q: "Which U.S. state was the last of the original 13 colonies to ratify the Constitution?",
    a: "Rhode Island",
    options: ["New Hampshire", "Massachusetts", "Rhode Island", "Virginia"]
  },
  {
    q: "What is the name of the deepest known point in Earth's oceans?",
    a: "Challenger Deep",
    options: ["Tonga Deep", "Puerto Rico Trench", "Java Deep", "Challenger Deep"]
  },
  {
    q: "Which U.S. president appears on the $50 bill?",
    a: "Ulysses S. Grant",
    options: ["Ulysses S. Grant", "Andrew Jackson", "Alexander Hamilton", "Thomas Jefferson"]
  },
  {
    q: "What is the largest species of shark?",
    a: "The whale shark",
    options: ["The basking shark", "The whale shark", "The great white shark", "The Greenland shark"]
  },
  {
    q: "Which ancient civilization built Machu Picchu?",
    a: "The Inca",
    options: ["The Maya", "The Aztec", "The Inca", "The Olmec"]
  },
  {
    q: "What is the term for a word that reads the same forward and backward, such as 'racecar'?",
    a: "A palindrome",
    options: ["An anagram", "A homonym", "An acronym", "A palindrome"]
  },
  {
    q: "Which planet has the highest average surface temperature?",
    a: "Venus",
    options: ["Venus", "Mercury", "Mars", "Jupiter"]
  },
  {
    q: "What is the largest desert on Earth?",
    a: "Antarctica",
    options: ["The Sahara", "Antarctica", "The Arabian Desert", "The Gobi Desert"]
  },
  {
    q: "How many total squares are on a standard chessboard?",
    a: "64",
    options: ["56", "72", "64", "81"]
  },
  {
    q: "Which artist painted The Starry Night?",
    a: "Vincent van Gogh",
    options: ["Claude Monet", "Pablo Picasso", "Salvador Dali", "Vincent van Gogh"]
  },
  {
    q: "What is the largest island in the world that is not considered a continent?",
    a: "Greenland",
    options: ["Greenland", "New Guinea", "Borneo", "Madagascar"]
  },
  {
    q: "What gas makes up about 78% of Earth's atmosphere?",
    a: "Nitrogen",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"]
  }
];



const wouldYouRather = [
  {
    q: "Would you rather be able to pause time for 10 minutes a day or rewind time by 10 minutes once a day?",
    a: "Pause time for 10 minutes a day",
    b: "Rewind time by 10 minutes once a day"
  },
  {
    q: "Would you rather have free groceries for life or free restaurant meals for life?",
    a: "Free groceries for life",
    b: "Free restaurant meals for life"
  },
  {
    q: "Would you rather always know when someone is lying to you or always be able to convince anyone you're telling the truth?",
    a: "Always know when someone is lying to you",
    b: "Always be able to convince anyone you're telling the truth"
  },
  {
    q: "Would you rather have a personal chef or a personal housekeeper?",
    a: "Have a personal chef",
    b: "Have a personal housekeeper"
  },
  {
    q: "Would you rather be able to talk to animals or speak every human language fluently?",
    a: "Talk to animals",
    b: "Speak every human language fluently"
  },
  {
    q: "Would you rather give up your phone for a month or give up television and streaming for a year?",
    a: "Give up your phone for a month",
    b: "Give up television and streaming for a year"
  },
  {
    q: "Would you rather have $1 million today or receive $5,000 a month for the rest of your life?",
    a: "Have $1 million today",
    b: "Receive $5,000 a month for life"
  },
  {
    q: "Would you rather be able to teleport anywhere instantly or never need to sleep?",
    a: "Teleport anywhere instantly",
    b: "Never need to sleep"
  },
  {
    q: "Would you rather know exactly what happens 10 years in the future or change one decision from 10 years in your past?",
    a: "Know what happens 10 years in the future",
    b: "Change one decision from 10 years in your past"
  },
  {
    q: "Would you rather live in your dream house in a place you don't like or an average house in your favorite place?",
    a: "Dream house in a place you don't like",
    b: "Average house in your favorite place"
  },
  {
    q: "Would you rather always have to arrive 30 minutes early or always arrive 10 minutes late?",
    a: "Always arrive 30 minutes early",
    b: "Always arrive 10 minutes late"
  },
  {
    q: "Would you rather never have to do laundry again or never have to wash dishes again?",
    a: "Never do laundry again",
    b: "Never wash dishes again"
  },
  {
    q: "Would you rather be able to find anything you've lost instantly or remember everything you've ever read?",
    a: "Find anything you've lost instantly",
    b: "Remember everything you've ever read"
  },
  {
    q: "Would you rather have to walk on your hands for the rest of your life or eat every meal using only your feet?",
    a: "Walk on your hands for the rest of your life",
    b: "Eat every meal using only your feet"
  },
  {
    q: "Would you rather go back and meet your ancestors or travel forward and meet your descendants?",
    a: "Meet your ancestors",
    b: "Meet your descendants"
  },
  {
    q: "Would you rather have perfect weather every weekend or never hit a red light again?",
    a: "Perfect weather every weekend",
    b: "Never hit a red light again"
  },
  {
    q: "Would you rather master any musical instrument instantly or master any sport instantly?",
    a: "Master any musical instrument instantly",
    b: "Master any sport instantly"
  },
  {
    q: "Would you rather have to cook every meal you eat or be allowed to eat only restaurant food?",
    a: "Cook every meal you eat",
    b: "Eat only restaurant food"
  },
  {
    q: "Would you rather get $250,000 right now or flip a coin for a 50% chance at $2 million?",
    a: "Take $250,000 right now",
    b: "Flip a coin for a 50% chance at $2 million"
  },
  {
    q: "Would you rather have one extra hour every day or one extra day every month?",
    a: "One extra hour every day",
    b: "One extra day every month"
  },
  {
    q: "Would you rather know the complete history of your family or know exactly what your life will look like 20 years from now?",
    a: "Know your complete family history",
    b: "Know what your life will look like in 20 years"
  },
  {
    q: "Would you rather revisit any day from your past for one hour or see any one day from your future for one hour?",
    a: "Revisit a day from your past",
    b: "See a day from your future"
  },
  {
    q: "Would you rather have a job you love that pays enough to get by or a job you dislike that pays twice as much?",
    a: "Job you love that pays enough to get by",
    b: "Job you dislike that pays twice as much"
  },
  {
    q: "Would you rather give up coffee and caffeine forever or give up desserts forever?",
    a: "Give up coffee and caffeine forever",
    b: "Give up desserts forever"
  },
  {
    q: "Would you rather have free airfare anywhere for life or free lodging anywhere for life?",
    a: "Free airfare anywhere for life",
    b: "Free lodging anywhere for life"
  }
];


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

const curiosityPreview = [
  {
    headline: 'How Can Solid Glass Be See-Through?',
    text: `Glass starts with something surprisingly ordinary: sand. Most everyday glass is made from silica, which is found in sand, mixed with other ingredients and heated to around 3,000°F until it melts. When it cools, something unusual happens.

In many solids, the tiny building blocks line up in neat, repeating patterns called crystals. In glass, they become frozen in a jumbled arrangement instead.

But here's the amazing part: visible light can pass through ordinary glass because its light particles don't have the right amount of energy to be easily absorbed by the material. Most of the visible light simply travels through.

Change the ingredients, though, and glass can become colored, stronger, heat-resistant, or even able to block certain kinds of light.

So the window you're looking through is basically melted sand, cooled into a solid that light can pass through.`,
    teaser: `Tomorrow: Rubber can stretch several times its size. Why doesn't it stay stretched?`
  },

  {
    headline: `Rubber's Incredible Snap-Back Secret`,
    text: `Rubber seems simple until you think about what it's doing. Stretch a rubber band to several times its normal length, let go, and it races right back to almost exactly where it started.

The secret is hidden inside.

Rubber is made from extremely long molecules called polymers. Imagine a bowl full of cooked spaghetti, except the noodles are curled, tangled, and connected in places. When you stretch rubber, many of those curled-up molecular chains straighten and line up.

Let go, and the molecules naturally want to return to their more tangled, relaxed arrangement. The rubber snaps back with them.

Here's an experiment you can actually feel: hold a thick rubber band against your upper lip, quickly stretch it, and then let it shrink again. Its temperature changes slightly as the molecules rearrange.

A rubber band isn't just stretching. You're reorganizing millions upon millions of microscopic molecular chains—and then watching them put themselves back.`,
    teaser: `Tomorrow: Why does your bathroom mirror fog up when you shower?`
  },

  {
    headline: 'Where Does the Fog on Your Mirror Come From?',
    text: `Take a hot shower and a perfectly clear mirror can turn cloudy in minutes. But that fog didn't come from inside the glass.

It's actually thousands of tiny drops of water sitting on the surface.

Hot shower water fills the bathroom air with invisible water vapor. When that warm, moist air touches the cooler mirror, some of the vapor cools enough to turn back into liquid water. This is called condensation.

The droplets are so tiny that instead of running down the mirror immediately, they scatter light in many directions. That's what creates the cloudy appearance.

Here's the neat part: it's the same basic process that creates dew on grass, water on the outside of a cold drink, and even clouds in the sky.

And if the mirror is warm enough? It won't fog nearly as easily.

Your steamy bathroom is basically running a tiny version of the water cycle right in front of you.`,
    teaser: 'Tomorrow: Why does popcorn explode?'
  }
];
const curiosityWeeks = [
  {
    theme: 'Everyday Science',
    days: [
      {
        headline: 'Why Does Popcorn Explode?',
        text: `Every popcorn kernel has something hidden inside it: a tiny drop of water. When the kernel gets hot, that water turns into steam. But the kernel's hard outer shell won't let the steam escape, so pressure keeps building inside.

Eventually, the pressure becomes so strong that the shell bursts. In a split second, the soft starch inside expands to many times its original size, cools, and becomes the fluffy white popcorn we eat.

Here's the really neat part: popcorn is one of the only types of corn with a shell strong enough to build the pressure needed to pop. If the kernel is too dry, cracked, or damaged, the steam escapes and you get one of those disappointing hard kernels at the bottom of the bowl.`,
        teaser: 'Tomorrow: Why does cutting an onion make you cry?'
      },

      {
        headline: `An Onion's Tiny Chemical Alarm`,
        text: `An onion isn't trying to make you cry. It's actually trying to protect itself.

When you cut into an onion, your knife breaks thousands of tiny cells. Chemicals that were safely stored apart suddenly mix together and create an irritating gas. That gas floats upward and reaches your eyes.

Your eyes detect the irritation and immediately start making tears to wash it away—which is why your vision gets blurry just when you're holding a sharp knife.

But here's something most people don't know: chilling an onion before cutting it can help. Lower temperatures slow the chemical reactions and movement of the irritating gas. A sharp knife can help too because it crushes fewer cells than a dull one.`,
        teaser: 'Tomorrow: Why does ice float when most solids sink?'
      },

      {
        headline: `Ice Breaks One of Nature's Usual Rules`,
        text: `Usually, when something freezes into a solid, its molecules pack closer together. Water does something strange: it spreads out.

As water freezes, its molecules arrange themselves into an open crystal pattern with extra space between them. That makes ice less dense—or, put simply, lighter for its size—than liquid water. So ice floats.

That little oddity is incredibly important. Because ice floats, lakes freeze from the top down. The floating ice becomes an insulating blanket that slows further freezing, leaving liquid water underneath where fish and other creatures can survive the winter.

If ice sank, lakes in cold climates could freeze much more deeply. So that ice cube floating in your drink is demonstrating one of water's strangest—and most important—tricks.`,
        teaser: 'Tomorrow: Why can one smell bring back a memory from decades ago?'
      },

      {
        headline: 'The Sense With a Shortcut to Your Memories',
        text: `Have you ever smelled a certain perfume, food, campfire, or freshly cut grass and suddenly remembered something you hadn't thought about in years?

There's a reason. Smell has unusually direct connections to parts of the brain involved in emotion and memory.

That's why a smell doesn't always make you simply remember something. Sometimes it almost feels as though you've been transported back there. You might remember the room, the people, or even how you felt.

And because smells are often present in the background without us deliberately paying attention to them, your brain may store a scent alongside an experience without you realizing it. Years later, one whiff can find that memory again.`,
        teaser: 'Tomorrow: Why do your fingers turn into prunes in the bathtub?'
      },

      {
        headline: `Your Wrinkly Fingers Are Doing It on Purpose`,
        text: `For years, people commonly thought fingers wrinkled in water because skin simply soaked up water and swelled. But there's more going on.

After your hands or feet stay wet for several minutes, your nervous system tells tiny blood vessels beneath the skin to tighten. That causes the skin above them to form the familiar wrinkles.

Scientists have found an interesting clue about why: wrinkled fingers may give us a better grip on wet objects, somewhat like the tread on a tire helps move water away from the surface.

Even stranger, people with certain types of nerve damage may not develop normal water wrinkles at all. So those bathtub fingers aren't just soggy skin. Your nervous system is actively changing them.`,
        teaser: 'Tomorrow: What is actually happening during brain freeze?'
      },

      {
        headline: 'Why Ice Cream Can Make Your Forehead Hurt',
        text: `You take a huge bite of ice cream and suddenly your forehead feels like someone flipped a pain switch. But the ice cream never went anywhere near your forehead.

Brain freeze begins when something extremely cold quickly cools the roof of your mouth. Blood vessels and nerves in that area react to the sudden temperature change. Your brain receives those pain signals—but it can get confused about exactly where they're coming from.

The result is referred pain: you feel the pain in your forehead even though the cold spot is inside your mouth.

If brain freeze strikes, press your tongue against the roof of your mouth. Your warm tongue helps heat the area back up. Your brain isn't freezing at all—it's basically getting the address of the pain wrong.`,
        teaser: 'Tomorrow: If sunlight looks white, why is the sky blue?'
      },

      {
        headline: 'The Real Reason the Sky Is Blue',
        text: `Sunlight may look white, but it's actually made of many colors—the same colors you see in a rainbow.

When sunlight enters Earth's atmosphere, it runs into tiny molecules in the air. Shorter wavelengths of visible light, especially blue, get scattered around the sky much more strongly than longer red wavelengths.

So when you look away from the Sun, much of the light reaching your eyes from all directions is scattered blue light. That's why the whole sky appears blue.

Near sunset, sunlight has to travel through much more atmosphere before reaching you. Much of the blue light gets scattered away along that longer trip, leaving more reds and oranges to reach your eyes.

A blue afternoon sky and a fiery red sunset are actually two versions of the same trick.`,
        
      }
    ]
  },
    {
    theme: 'Happy Accidents',
    days: [
      {
        headline: `The Glue That Wasn't Sticky Enough`,
        text: `In 1968, 3M scientist Spencer Silver was trying to create a strong adhesive.

Instead, he made one that seemed almost useless.

His new glue would stick to something, but it could also peel away easily without leaving much behind. Silver knew the unusual adhesive might be useful, but for years nobody could figure out what to do with it.

Then another 3M employee, Art Fry, had an annoying little problem. He sang in a church choir and used scraps of paper to mark pages in his hymnal. They kept falling out.

Fry remembered Silver's strange glue.

He put some along the edge of a piece of paper, creating a bookmark that would stay put but could still be removed.

That eventually became the Post-it Note.

Sometimes a failed invention isn't a failure. It may just be waiting for the right problem.`,
        teaser: 'Tomorrow: A ship engineer drops a spring—and sees something unexpected.'
      },

      {
        headline: 'The Spring That Walked Away',
        text: `The Slinky didn't begin in a toy workshop.

It began with an engineer named Richard James, who was working with springs aboard ships during World War II.

One day, a spring was accidentally knocked from a shelf.

Instead of simply falling to the floor, it seemed to "walk" downward in a series of flips.

James was fascinated.

He went home and told his wife, Betty, that he thought the strange movement could become a toy. After experimenting with different types of steel and coils, he developed the spring toy we now know as the Slinky.

Betty came up with its famous name.

Millions were eventually sold, all because an engineer noticed something most of us probably wouldn't have thought twice about:

A spring fell off a shelf in a really interesting way.`,
        teaser: 'Tomorrow: A melted candy bar helps change kitchens forever.'
      },

      {
        headline: 'The Candy Bar That Led to the Microwave',
        text: `Percy Spencer wasn't trying to invent a new way to cook dinner.

He was working with radar equipment.

While working near equipment that produced microwaves, Spencer noticed something strange: a candy bar in his pocket had melted.

Instead of simply being annoyed about the mess, he wondered what had caused it.

Spencer began experimenting with food, including popcorn kernels.

They popped.

He realized microwave energy could be used to heat food. Raytheon soon developed the idea into an oven.

The early machines were enormous and expensive, nothing like the microwave sitting on a kitchen counter today.

And it all began because someone paid attention when something unexpected happened near his laboratory equipment.

A melted snack became a clue—and that clue eventually helped change the way millions of people cook.`,
        teaser: 'Tomorrow: A gas seems to disappear from a container—but it has not actually gone anywhere.'
      },

      {
        headline: 'The Gas That Turned Into Something Slippery',
        text: `In 1938, chemist Roy Plunkett was experimenting with gases while searching for new refrigerants.

One morning, he opened a cylinder.

Nothing came out.

That was strange because the cylinder still weighed enough to contain something.

So Plunkett investigated.

Inside, he discovered that the gas had unexpectedly changed into a white solid. Instead of tossing it aside, he tested the mysterious material.

It had some remarkable properties. It resisted heat and chemicals, and other materials had a hard time sticking to it.

The substance became known as Teflon.

Years later, Teflon became famous for nonstick cookware, although it had important industrial uses first.

The empty-looking cylinder wasn't empty after all.

An experiment that appeared to have gone wrong had actually produced an entirely new material.`,
        teaser: 'Tomorrow: An unwanted patch of mold leads to one of medicine’s most important discoveries.'
      },

      {
        headline: 'The Mold That Changed Medicine',
        text: `In 1928, Alexander Fleming was studying bacteria when he noticed something odd on one of his laboratory plates.

Mold had accidentally started growing there.

Normally, contamination like that could ruin an experiment.

But Fleming noticed something more important.

Around the mold was a clear area where the bacteria weren't growing.

Something produced by that mold seemed able to stop the bacteria.

Fleming investigated and eventually named the substance penicillin.

Other scientists later did the difficult work needed to turn penicillin into a practical medicine, and antibiotics went on to save millions of lives.

The mold appearing was an accident.

Noticing what it was doing was not.

A laboratory plate that could easily have been thrown away instead became an important clue in the history of medicine.`,
        teaser: 'Tomorrow: Scientists reject a substance because it sticks to practically everything.'
      },

      {
        headline: 'The Glue That Worked Too Well',
        text: `Imagine trying to develop a useful material and ending up with a substance that sticks to practically everything.

That's what chemist Harry Coover encountered while working with chemicals called cyanoacrylates.

The material was incredibly sticky.

At first, that was a problem rather than a solution. Coover's team wasn't looking for glue, so the troublesome material was set aside.

Years later, Coover encountered cyanoacrylates again and recognized what had been missed:

Being incredibly sticky wasn't a flaw.

That was the useful part.

The discovery eventually led to the powerful instant adhesives we know as Super Glue.

It's a wonderfully backwards invention story.

The scientists didn't need to figure out how to make their material work better.

They needed to realize that the thing making it difficult to work with was exactly what could make it valuable.`,
        teaser: 'Tomorrow: A glass flask shatters—but strangely stays together.'
      },

      {
        headline: `The Shattered Glass That Wouldn't Fall Apart`,
        text: `In 1903, French chemist Édouard Bénédictus accidentally knocked a glass flask onto the floor.

It broke—but something strange happened.

Instead of scattering into dangerous pieces, the cracked glass mostly stayed together.

Bénédictus discovered that the flask had once contained a solution that left a thin coating inside. That layer helped hold the broken pieces in place.

He remembered the accident later when thinking about injuries caused by shattered glass in automobile crashes.

That gave him an idea: what if glass could be made to crack without flying apart?

His experiments helped lead to laminated safety glass, which uses a layer between sheets of glass to help hold broken pieces together.

Today, the same basic principle helps make windshields safer.

Sometimes dropping something isn't the end of an experiment.

It can be the beginning of one.`,
        teaser: 'Tomorrow: A burr stuck to a dog gives an inventor a surprisingly useful idea.'
      }
    ]
  },
    {
    theme: 'Nature Had the Idea First',
    days: [
      {
        headline: 'The Burr That Inspired a Better Fastener',
        text: `In 1941, Swiss engineer George de Mestral returned from a walk and noticed burrs stubbornly clinging to his clothes and his dog's fur.

Instead of just pulling them off and forgetting about them, he looked at the burrs under a microscope.

He discovered tiny hooks that grabbed onto loops in fabric and hair.

That natural design gave him an idea: create two materials, one covered with small hooks and another with soft loops. Press them together and they would hold. Pull them apart and they could be used again.

Developing the idea took years, but it eventually became the hook-and-loop fastener best known by the VELCRO brand name.

A plant wasn't trying to invent anything. Its hooks simply helped its seeds hitch a ride.

An engineer noticed—and borrowed the trick.`,
        teaser: 'Tomorrow: A bird helps engineers solve a very noisy train problem.'
      },

      {
        headline: 'The Bird That Helped Quiet a Bullet Train',
        text: `Japan's high-speed trains had an unusual problem.

When some early bullet trains raced through tunnels, they pushed a wave of air ahead of them. As the train burst out the other end, that compressed air could create a loud boom.

Engineer Eiji Nakatsu was also a birdwatcher.

He thought about the kingfisher, a bird that can dive from air into water with remarkably little splash. Its long, pointed beak helps it move smoothly between those two very different environments.

That shape inspired engineers working on the train's nose.

Newer designs became longer and more streamlined, helping reduce the sudden pressure changes that caused the troublesome noise. The changes also improved efficiency.

One of the world's fastest machines found part of its solution in a bird that had been diving into ponds long before trains existed.`,
        teaser: 'Tomorrow: A lizard walks across walls without using glue.'
      },

      {
        headline: `A Gecko's Feet Don't Need Glue`,
        text: `Geckos can scamper across walls and even hang upside down from ceilings.

But their feet aren't coated with glue.

The secret is an enormous number of microscopic hair-like structures on their toes. These split into even tinier tips that get extremely close to a surface. At that tiny scale, weak molecular attractions can add up to produce impressive grip.

The gecko can release its foot quickly by changing the angle of those structures.

Scientists and engineers have studied this ability while developing dry adhesives and gripping systems that don't depend on sticky liquids. NASA researchers, for example, have explored gecko-inspired grippers for handling objects in space.

The gecko's trick is especially clever because its feet can stick, release and stick again.

Nature built a reusable gripping system long before humans started trying to copy one.`,
        teaser: 'Tomorrow: A leaf stays remarkably clean without anyone washing it.'
      },

      {
        headline: `The Leaf That Doesn't Like Getting Dirty`,
        text: `Lotus plants often grow in muddy water, yet their leaves can stay surprisingly clean.

The trick is hidden on the leaf's surface.

It may look smooth to us, but under magnification it has tiny structures covered by a water-repelling waxy material. Water beads up instead of spreading flat.

As those droplets roll away, they can pick up dust and dirt with them.

Scientists call this the lotus effect.

Researchers have studied the effect while designing water-repellent and self-cleaning materials, including coatings, paints, glass and fabrics.

The goal isn't always to copy a lotus leaf exactly. Instead, engineers study the useful principle behind what the plant is already doing.

So when rain rolls off a leaf and carries dirt along with it, you're watching a tiny cleaning system that has inspired human technology.`,
        teaser: 'Tomorrow: Shark skin is smoother—and stranger—than it looks.'
      },

      {
        headline: `Shark Skin Isn't Actually Smooth`,
        text: `A shark may look sleek and smooth as it glides through the water.

Up close, its skin tells a different story.

Sharks are covered with tiny tooth-like scales called dermal denticles. Their shape and arrangement can help control how water moves across the shark's body.

That has caught the attention of engineers looking for ways to reduce drag.

Researchers have created surfaces with tiny rib-like patterns inspired by shark skin and tested them on things that move through water or air. Similar ideas have appeared in specialized swimsuits, coatings and other designs.

The lesson isn't simply that "rough is faster." The size, shape and direction of those tiny structures matter.

A shark's skin is a good reminder that something can look simple from across the room while hiding an impressive piece of engineering when you zoom in.`,
        teaser: 'Tomorrow: Bumps on a whale flipper turn out to be surprisingly useful.'
      },

      {
        headline: `Why Would a Whale's Flipper Need Bumps?`,
        text: `Look at the front edge of a humpback whale's flipper and you'll notice something unusual: large rounded bumps.

They are called tubercles.

For years, engineers were used to designing many wings and blades with smooth leading edges. But studies of humpback flippers showed that those bumps can influence how water flows around the surface.

Under certain conditions, tubercle-inspired designs can help a wing or blade keep working effectively at steeper angles before it loses lift.

That discovery has inspired experiments with fan blades, turbine blades and other equipment.

Humpback whales didn't evolve their flippers to teach engineers about fluid dynamics, of course. The shape helps the whales maneuver their enormous bodies through water.

But once humans noticed the design, an odd-looking row of bumps became an engineering lesson worth studying.`,
        teaser: 'Tomorrow: A termite mound offers ideas for keeping buildings comfortable.'
      },

      {
        headline: 'The Building Idea Hidden in a Termite Mound',
        text: `Termite mounds can rise dramatically above the ground, but the most interesting part may be what happens inside them.

Some mound-building termites create complicated networks of tunnels and openings that interact with changing temperatures, wind and gases inside the colony.

That natural ventilation has fascinated architects and engineers.

Buildings have been designed using passive-airflow ideas inspired in part by termite mounds, with the goal of reducing how much mechanical heating or cooling they need.

The comparison isn't as simple as copying a mound and turning it into an office building. Scientists have learned that termite nests are complicated systems, and different species manage their environments in different ways.

Still, the inspiration is powerful.

A colony of tiny insects can build a structure that manages airflow without electric fans—giving human designers another reason to study how nature solves difficult problems.`,
        teaser: 'Tomorrow: Play-Doh begins its story somewhere you would never expect—a wallpaper-cleaning business.'
      }
    ]
  },
    {
    theme: 'That Was Supposed to Be WHAT?',
    days: [
      {
        headline: 'Play-Doh Was Originally Made to Clean Wallpaper',
        text: `Before Play-Doh became a colorful toy, a very similar squishy material had a completely different job.

It was made to clean wallpaper.

In homes heated by coal, soot could collect on walls. A soft, dough-like cleaning compound could be rolled across wallpaper to lift away the grime without damaging the paper.

Then home heating changed. Cleaner fuels became common, washable wallpaper improved, and demand for wallpaper cleaner dropped.

But the strange putty found a second life.

Children were already using the material for craft projects, and the company behind it realized that was a much better market. The cleaner was reworked and sold as a children's modeling compound.

Play-Doh became a hugely popular toy.

So one of the most recognizable toys in the world began as something meant to remove dirty marks from walls.`,
        teaser: 'Tomorrow: Bubble Wrap was supposed to go on your walls.'
      },

      {
        headline: 'Bubble Wrap Was Supposed to Be Wallpaper',
        text: `Bubble Wrap seems perfectly designed for protecting packages.

That's not what its inventors originally had in mind.

In 1957, engineers Alfred Fielding and Marc Chavannes were experimenting with plastic sheets. They sealed two shower curtains together in a way that trapped bubbles of air between them.

Their idea was to sell the bubbly material as textured wallpaper.

It didn't catch on.

They later tried marketing it as greenhouse insulation, but that wasn't the big breakthrough either.

Then they realized the air-filled material was excellent for protecting fragile objects during shipping. When computers and other delicate products needed safe packaging, Bubble Wrap finally found the job it was suited for.

The bubbles didn't change much.

What changed was the question.

Instead of asking, "Who wants this on a wall?" someone eventually asked, "What is this actually good at doing?"`,
        teaser: 'Tomorrow: A disposable tissue begins with a very different beauty job.'
      },

      {
        headline: `Kleenex Wasn't Originally Meant for Blowing Your Nose`,
        text: `Today, many people use the word Kleenex almost automatically when they need a facial tissue.

But the product wasn't originally promoted for runny noses.

Kleenex tissues were introduced in the 1920s as a disposable way to remove cold cream and makeup. Advertisements focused heavily on beauty routines.

Then the company began hearing that customers were using the tissues as disposable handkerchiefs.

That was interesting enough to investigate.

Kimberly-Clark tested advertisements showing the two different uses and found that nose-blowing was the stronger idea.

The company changed its marketing, and the tissue's identity changed with it.

Nothing magical happened to the sheet of tissue itself. People simply discovered a use that turned out to be more popular than the one originally emphasized.

Sometimes customers figure out what a product is for before the company selling it does.`,
        teaser: 'Tomorrow: A familiar mouthwash starts with a much more medical purpose.'
      },

      {
        headline: `Listerine Didn't Start as Mouthwash`,
        text: `Listerine is famous as a mouthwash, but that wasn't its original purpose.

It was developed in the late 1800s as an antiseptic and named after surgeon Joseph Lister, whose work helped demonstrate the importance of controlling germs during surgery.

The product was promoted for medical and cleaning uses before mouth rinsing became its most famous role.

Later, clever advertising helped transform Listerine into a household product by focusing on bad breath.

The company even popularized the medical-sounding term "halitosis" in its advertising, making ordinary bad breath seem like a problem that urgently needed solving.

The liquid hadn't suddenly been invented for mouths. Its role had evolved.

It's a great example of how a product can survive for generations while its most familiar purpose changes completely.

What we think something was "made for" isn't always where its story actually began.`,
        teaser: 'Tomorrow: One of the world’s most famous drinks begins at a pharmacy counter.'
      },

      {
        headline: 'Coca-Cola Began at a Pharmacy',
        text: `Coca-Cola is now one of the world's most recognizable soft drinks, but its story began in a pharmacy.

In 1886, pharmacist John Pemberton created the syrup in Atlanta, Georgia.

It was taken to Jacobs' Pharmacy, where it was mixed with carbonated water and sold by the glass at the soda fountain.

At the time, pharmacy soda fountains were popular gathering places, and drinks were often advertised with claims about refreshment, energy or health.

Coca-Cola eventually grew far beyond that pharmacy counter and became a bottled beverage sold around the world.

The recipe, business and advertising changed dramatically along the way.

Today, buying a Coke from a vending machine or restaurant feels completely ordinary.

But the first customers didn't grab one from a cooler.

They went to a pharmacy and had someone mix the syrup with fizzy water for them.`,
        teaser: 'Tomorrow: The treadmill had a life long before fitness clubs.'
      },

      {
        headline: `The Treadmill Wasn't Invented for the Gym`,
        text: `Modern treadmills are associated with exercise, running shoes and fitness centers.

Earlier treadmills had a much less cheerful reputation.

For centuries, treadwheel-style machines used human or animal power to operate equipment such as mills, pumps and cranes.

In 19th-century Britain, treadmills were also used in prisons.

Prisoners could be required to spend long periods stepping on rotating machinery as punishment and, in some cases, to provide useful power.

The work was exhausting and monotonous.

Eventually, prison treadmills fell out of favor.

Much later, treadmill technology found a very different purpose in medical testing and physical fitness. Electric treadmills became exercise machines instead of punishment devices.

So when someone complains that running indoors feels like punishment, history provides an awkward little twist:

For some people in the past, a treadmill literally was.`,
        teaser: 'Tomorrow: An early ancestor of the chainsaw was made for surgery.'
      },

      {
        headline: 'An Early Chainsaw-Like Tool Was Made for Surgery',
        text: `The word "chainsaw" probably makes you picture trees and lumberjacks.

Its early history is much stranger.

In the late 1700s, doctors developed a small hand-powered cutting instrument that used a chain with tiny teeth. It was designed for surgical work involving bone.

Later versions of chain-cutting tools were also used in medicine before the idea evolved into machines built for cutting wood.

These early surgical devices were much smaller than a modern gasoline chainsaw, so imagining a lumberjack's saw in an operating room would be misleading.

But the basic idea of a toothed chain moving around a guide existed in medicine before powered chainsaws became familiar forestry tools.

Technology often travels in unexpected directions.

A mechanism can begin by solving one very specialized problem, then be adapted until its most famous use looks almost completely unrelated to where it started.`,
        teaser: 'Tomorrow: Tiny holes in crackers are doing an important job.'
      }
    ]
  },
        {
        theme: `Why Does Food Do That?`,
        days: [
          {
            headline: `Why Do Crackers Have Tiny Holes?`,
            text: `Those neat little holes in crackers are not just decoration. They are called docking holes, and they help control what happens while the dough bakes. As cracker dough heats up, water turns to steam and gases expand. Without places for some of that pressure to escape, the dough can puff into big bubbles instead of staying thin and crisp. Small pins or rollers poke holes through the dough before baking, giving steam easier paths out. The number and spacing of the holes can vary with the kind of cracker being made. So the next time you see rows of tiny dots on a cracker, you are looking at part of the baking equipment's work. Those little holes help turn soft dough into the flat, crunchy snack you expect.`,
            teaser: `Tomorrow: The holes in Swiss cheese have a completely different story.`
          },
          {
            headline: `Where Do the Holes in Swiss Cheese Come From?`,
            text: `The holes in some Swiss-style cheeses are called eyes, and they form while the cheese is aging. Certain bacteria used in making the cheese consume compounds left behind by other bacteria and release carbon dioxide gas. Because the gas cannot easily escape from the firm cheese, it collects in pockets. Those pockets become the round holes you see when the cheese is sliced. Researchers have also found that tiny particles, such as bits of hay dust in traditional milk handling, can help provide spots where gas bubbles begin forming. Modern milk processing became cleaner, and cheesemakers noticed that the eyes could become smaller or less common. So those famous holes are not missing cheese punched out later. They are bubbles that grew inside the cheese while microbes were busy changing its flavor and texture.`,
            teaser: `Tomorrow: A banana changes color even while sitting untouched on the counter.`
          },
          {
            headline: `Why Do Bananas Turn Brown?`,
            text: `A banana can go from green to yellow to spotted brown without anyone doing anything to it. That color change is part of ripening. Bananas produce ethylene, a natural plant hormone that helps trigger changes inside the fruit. Starches turn into sugars, the flesh softens, aromas develop, and the peel changes color. As the banana becomes very ripe, cell structures in the peel break down and brown pigments become more noticeable. Bruising can speed browning in damaged spots because it breaks cells open and allows chemical reactions to happen more easily. Cold temperatures can also darken a banana peel even when the fruit inside is still usable. So brown spots are not simply a countdown clock for spoilage. They are visible clues that a surprisingly busy series of chemical changes has been happening inside the fruit.`,
            teaser: `Tomorrow: Bread can become stale even when it has not simply dried out.`
          },
          {
            headline: `Why Does Bread Go Stale?`,
            text: `It seems obvious that stale bread must just be bread that lost its water. Drying matters, but the bigger story is stranger. After bread cools, starch molecules that were changed during baking gradually begin arranging themselves into more ordered structures again. This process, called starch retrogradation, helps make the crumb firmer and less pleasant to chew. Water also moves around inside the bread instead of simply disappearing. That is why bread can become stale even while sealed in a package. Refrigeration can actually speed some of these starch changes, which is one reason bread often stales faster in the refrigerator than at room temperature. Freezing works much better for longer storage. A stale slice, then, is not merely old, dry bread. Its microscopic starch structure has been quietly rearranging itself.`,
            teaser: `Tomorrow: That pale coating on chocolate may look alarming, but it has an explanation.`
          },
          {
            headline: `What Is That White Stuff on Chocolate?`,
            text: `Open an old chocolate bar and you may find a dusty white or gray coating on the surface. It can look like mold, but often it is something called chocolate bloom. Fat bloom happens when cocoa butter moves through the chocolate and forms crystals on the surface, sometimes after the chocolate gets too warm and cools again. Sugar bloom happens when moisture dissolves sugar at the surface and then evaporates, leaving tiny sugar crystals behind. Either kind can make chocolate look strange and change its texture, but bloom itself is not mold. Proper temperature control during manufacturing and storage helps prevent it. Chocolate is a carefully organized mixture of fat, sugar and cocoa solids, and when that organization changes, you can sometimes see the evidence. The pale coating is chemistry showing up where your eyes can catch it.`,
            teaser: `Tomorrow: Apples have a built-in reason they can bob in water.`
          },
          {
            headline: `Why Do Apples Float?`,
            text: `Drop an apple into water and it usually floats, which is exactly why bobbing for apples works. The reason is density. An object floats when its average density is lower than the liquid around it. Apples are not solid blocks of fruit tissue. A surprising portion of their volume is made up of tiny air spaces between cells. Those pockets lower the apple's overall density enough for water to support it. Different apple varieties can contain different amounts of air, but the basic effect is the same. This also helps explain why an apple feels fairly light for its size compared with something much denser. You cannot see most of those air spaces when you bite into one, yet they affect how the entire fruit behaves in water. An ordinary apple is partly a network of microscopic pockets.`,
            teaser: `Tomorrow: Cutting an apple starts a chemical reaction you can watch.`
          },
          {
            headline: `Why Does a Cut Apple Turn Brown?`,
            text: `Slice an apple and its pale flesh can begin turning brown within minutes. The knife did not add anything brown. Instead, cutting damaged the apple's cells and allowed substances that were previously separated to mix with oxygen from the air. An enzyme called polyphenol oxidase helps drive reactions that eventually produce brown-colored compounds. This kind of enzymatic browning also happens in foods such as bananas, pears and avocados. You can slow it by reducing oxygen or changing the conditions the enzyme likes. Lemon juice helps because its acidity interferes with the reaction, and its vitamin C can also slow oxidation. Refrigeration slows many chemical reactions too. So the browning surface of a sliced apple is not just fruit getting old. It is a visible chemical reaction that begins almost as soon as the cells are broken open.`,
            teaser: `Tomorrow: An empty stomach can make a surprisingly noisy sound.`
          }
        ]
      },
      {
        theme: `Your Body Is Weird`,
        days: [
          {
            headline: `Why Does Your Stomach Growl?`,
            text: `Your digestive tract keeps making waves of muscle contractions even when it is mostly empty. With less food to muffle the movement, gas and liquid can slosh around and make the rumbling sounds called borborygmi. Hunger can make the pattern more noticeable, but a growl does not mean your stomach is completely empty. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why Do Hiccups Make That Sound?`
          },
          {
            headline: `Why Do Hiccups Make That Sound?`,
            text: `A hiccup starts with an involuntary spasm of the diaphragm and other breathing muscles. Air rushes inward, then the opening between the vocal cords closes suddenly. That quick closure creates the familiar hic sound. Most bouts are harmless and short; the exact reason humans have the hiccup reflex is still not fully settled. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why Can’t You Tickle Yourself?`
          },
          {
            headline: `Why Can’t You Tickle Yourself?`,
            text: `Your brain predicts many of the sensations caused by your own movements. When you move a finger toward your own ribs, the brain can anticipate where and when the touch will happen, so the sensation is dampened. An unexpected touch from another person is much harder to predict, which is one reason it can feel far more ticklish. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why Does Your Foot “Fall Asleep”?`
          },
          {
            headline: `Why Does Your Foot “Fall Asleep”?`,
            text: `Sitting or leaning in one position can temporarily compress a nerve and sometimes reduce its blood supply. The nerve signals become disrupted, producing numbness, tingling, or pins and needles. Changing position usually removes the pressure and normal signaling returns, sometimes with an especially prickly burst as the nerve recovers. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: What Makes Your Stomach Feel Butterflies?`
          },
          {
            headline: `What Makes Your Stomach Feel Butterflies?`,
            text: `Stress and excitement activate the autonomic nervous system, which changes heart rate, breathing, and digestion. The gut has an enormous network of nerves and communicates constantly with the brain. When your body shifts into an alert state, those digestive changes can be felt as fluttering, tightness, or the famous butterflies. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why Do Your Joints Sometimes Crack?`
          },
          {
            headline: `Why Do Your Joints Sometimes Crack?`,
            text: `A joint contains lubricating synovial fluid with dissolved gases. When joint surfaces move apart quickly, pressure inside the joint drops and a gas-filled cavity can form suddenly, producing a pop. Other clicks can come from tendons or ligaments moving. Ordinary painless cracking is not the same thing as bones grinding together. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why Does an Eyelid Start Twitching?`
          },
          {
            headline: `Why Does an Eyelid Start Twitching?`,
            text: `A common eyelid twitch, called myokymia, is a small involuntary muscle contraction. Fatigue, stress, caffeine, and eye strain are frequent triggers. It usually disappears on its own. The strange part is how enormous the movement can feel to you even when another person may barely be able to see it. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: How Do Octopuses Disappear in Plain Sight?`
          }
        ]
      },
      {
        theme: `Animal Superpowers`,
        days: [
          {
            headline: `How Do Octopuses Disappear in Plain Sight?`,
            text: `Octopuses can change their appearance using pigment-filled skin cells called chromatophores, along with other reflective cells and tiny muscles that alter skin texture. Their nervous system can coordinate color, pattern, and bumps astonishingly quickly, helping them blend with rocks, sand, and coral even though their own color vision appears limited. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: How Can a Cat Land on Its Feet?`
          },
          {
            headline: `How Can a Cat Land on Its Feet?`,
            text: `A falling cat can use its flexible spine and inner-ear sense of balance to perform a righting reflex. It twists the front and rear parts of its body in different directions, repositions its legs, and prepares for landing. Cats still can be injured by falls, but the midair maneuver is a remarkable piece of body control. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: How Does an Electric Eel Make Electricity?`
          },
          {
            headline: `How Does an Electric Eel Make Electricity?`,
            text: `Electric eels have specialized cells called electrocytes stacked in large electric organs. Each cell produces only a small voltage, but thousands can discharge together, like tiny biological batteries connected in series. The fish uses weaker electrical signals for sensing and communication and powerful bursts for defense and stunning prey. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: The Animal With an Incredible View of Color`
          },
          {
            headline: `The Animal With an Incredible View of Color`,
            text: `Mantis shrimp have unusually complex eyes with many types of light-sensitive cells, including receptors sensitive to ultraviolet light. Their visual system is very different from ours, so it is misleading to say they simply see “more colors” exactly as humans would. What is certain is that their eyes analyze light in ways no human eye can. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why Can Geckos Run Up Walls?`
          },
          {
            headline: `Why Can Geckos Run Up Walls?`,
            text: `Millions of microscopic hairlike structures cover the pads of gecko toes. Their extremely fine branches get close enough to surfaces for weak molecular attractions called van der Waals forces to add up to a strong grip. By changing the angle of their toes, geckos can attach and release those contacts rapidly without ordinary glue. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: The Salamander That Can Regrow Body Parts`
          },
          {
            headline: `The Salamander That Can Regrow Body Parts`,
            text: `Axolotls can regenerate lost limbs and repair parts of several organs with far less scarring than humans. Cells near an injury help form a mass of regenerative tissue that rebuilds the missing structures. Scientists study axolotls because understanding that process may reveal principles useful for human regenerative medicine, although humans cannot simply copy the trick. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: The Frog That Freezes and Wakes Up Again`
          },
          {
            headline: `The Frog That Freezes and Wakes Up Again`,
            text: `Wood frogs survive northern winters by allowing much of the water outside their cells to freeze. Their bodies flood tissues with glucose and other protective substances that help limit damage while heartbeat and breathing can stop. When temperatures rise, the frog thaws and resumes activity—a survival strategy that sounds much more like science fiction. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why Do Jeans Have That Tiny Pocket?`
          }
        ]
      },
      {
        theme: `Things You Use but Never Question`,
        days: [
          {
            headline: `Why Do Jeans Have That Tiny Pocket?`,
            text: `The tiny pocket inside the front pocket of many jeans is a descendant of the watch pocket on early waist overalls. In the late 1800s, workers often carried pocket watches, and the small compartment helped protect them. Watches moved to wrists, but the little pocket survived as a design tradition long after its original job faded. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why Is There a Hole in Some Pen Caps?`
          },
          {
            headline: `Why Is There a Hole in Some Pen Caps?`,
            text: `Many modern pen caps include openings as a safety feature. If a cap is accidentally swallowed and becomes lodged in the airway, a hole may allow some air to pass. Designs differ by manufacturer, so the hole is not a guarantee of safety—but it is an example of a tiny feature most people never notice until someone explains it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why Do Some Coins Have Ridges?`
          },
          {
            headline: `Why Do Some Coins Have Ridges?`,
            text: `Milled or reeded edges became useful when coins were made from valuable metals. A person could shave tiny amounts from a smooth-edged coin and keep the metal. A patterned edge made tampering easier to spot. Modern coins are not usually worth their face value in precious metal, but the old anti-cheating feature remains. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why Do F and J Have Little Bumps?`
          },
          {
            headline: `Why Do F and J Have Little Bumps?`,
            text: `The raised marks on the F and J keys help touch typists find the home row without looking down. Place your index fingers on those bumps and the rest of your fingers naturally line up with nearby keys. It is a tiny piece of tactile navigation built into almost every standard computer keyboard. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why Does a Tape Measure Have a Loose Hook?`
          },
          {
            headline: `Why Does a Tape Measure Have a Loose Hook?`,
            text: `The metal hook at the end of many tape measures is designed to slide by about its own thickness. When you hook it over an outside edge it pulls outward; when you push it against an inside surface it slides inward. That movement compensates for the hook’s thickness so both kinds of measurements can start at zero. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why Do Sneakers Have Extra Lace Holes at the Top?`
          },
          {
            headline: `Why Do Sneakers Have Extra Lace Holes at the Top?`,
            text: `Those extra eyelets near the ankle can be used for a runner’s loop, sometimes called a heel lock. A special lacing pattern creates small loops that help hold the heel more securely without simply cranking every lace tighter. The holes look redundant until you know the alternate way they can be used. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: What Does the Little Arrow by the Fuel Pump Mean?`
          },
          {
            headline: `What Does the Little Arrow by the Fuel Pump Mean?`,
            text: `On many cars, a small triangle beside the fuel-pump icon points toward the side where the fuel door is located. It is especially handy in a rental car or any vehicle you do not drive often. One glance at the dashboard can save the awkward moment of pulling up to a gas pump on the wrong side. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Bluetooth Is Named After a Viking King`
          }
        ]
      },
      {
        theme: `How Did THAT Get Its Name?`,
        days: [
          {
            headline: `Bluetooth Is Named After a Viking King`,
            text: `Bluetooth technology takes its name from Harald “Bluetooth” Gormsson, a tenth-century Danish king associated with uniting parts of Denmark and Norway. Engineers liked the idea of a technology that could unite different devices. Even the Bluetooth logo combines runic characters representing the initials H and B. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Wi-Fi Does Not Actually Stand for “Wireless Fidelity”`
          },
          {
            headline: `Wi-Fi Does Not Actually Stand for “Wireless Fidelity”`,
            text: `Wi-Fi was created as a brand name for wireless networking, chosen because it was short and memorable. The phrase “Wireless Fidelity” appeared later in some marketing, which helped create the belief that Wi-Fi was an acronym. It is a good reminder that a familiar tech name can sound technical even when it was designed mainly to be catchy. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: LEGO’s Name Hides a Danish Phrase`
          },
          {
            headline: `LEGO’s Name Hides a Danish Phrase`,
            text: `The name LEGO comes from the Danish words “leg godt,” meaning “play well.” Carpenter Ole Kirk Kristiansen chose the name for his company in the 1930s, years before the modern plastic brick became its signature product. By coincidence, the word lego also has meanings in Latin, but that was not the source of the company name. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: How Did Google Get Its Strange Name?`
          },
          {
            headline: `How Did Google Get Its Strange Name?`,
            text: `Google’s name grew from the mathematical word “googol,” meaning the number 1 followed by 100 zeros. The huge number suited the founders’ ambition to organize enormous amounts of information. The spelling Google emerged during the naming process and stuck, turning a playful variation on a math term into an everyday verb. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: What Does ZIP in ZIP Code Mean?`
          },
          {
            headline: `What Does ZIP in ZIP Code Mean?`,
            text: `ZIP in ZIP Code stands for Zone Improvement Plan. The U.S. Postal Service introduced the five-digit system in 1963 to help sort growing volumes of mail more efficiently. The word ZIP was also perfect advertising: it suggested that mail would move quickly when senders included the new code. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why Is It Called WD-40?`
          },
          {
            headline: `Why Is It Called WD-40?`,
            text: `WD-40’s name comes from “Water Displacement, 40th formula.” The product was developed in the 1950s by a small company trying to make a compound that would prevent corrosion by displacing water. According to the company history, the successful recipe was the fortieth attempt—a laboratory notebook number that became a household brand. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why Is Canned Spam Called SPAM?`
          },
          {
            headline: `Why Is Canned Spam Called SPAM?`,
            text: `Hormel introduced SPAM in 1937. The company says the name was suggested in a contest by Kenneth Daigneau, whose brother was a Hormel executive; he won $100. Hormel has long guarded the exact meaning of the name, though “spiced ham” is a common interpretation. The mystery is part of the brand’s history. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why Can You Smell Rain Before It Arrives?`
          }
        ]
      },
      {
        theme: `Weather Gets Weird`,
        days: [
          {
            headline: `Why Can You Smell Rain Before It Arrives?`,
            text: `One famous rain smell is petrichor. Dry soil and plants leave compounds on the ground, and raindrops can trap tiny air bubbles that burst and launch microscopic droplets into the air. One compound, geosmin, has an earthy smell humans can detect at very low concentrations. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why Does Thunder Rumble Instead of Just Boom?`
          },
          {
            headline: `Why Does Thunder Rumble Instead of Just Boom?`,
            text: `Lightning heats a narrow channel of air extremely fast, making the air expand and create a shock wave. A long lightning bolt produces sound along many points at different distances from you. Those sounds arrive at slightly different times, turning one electrical event into a rolling rumble. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: How Can Fog Float?`
          },
          {
            headline: `How Can Fog Float?`,
            text: `Fog is essentially a cloud touching the ground. It consists of extremely tiny water droplets suspended in air. Each droplet falls very slowly, while tiny air movements keep droplets mixed and suspended. Fog looks like a floating blanket even though gravity is still tugging on every drop. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why Does Hail Have Layers?`
          },
          {
            headline: `Why Does Hail Have Layers?`,
            text: `Inside a thunderstorm, strong updrafts can carry small ice particles through regions containing supercooled water. Liquid droplets freeze onto the growing hailstone. Different trips through wetter or colder parts of the cloud can produce clearer or cloudier ice, leaving rings that record part of the stone’s stormy journey. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why Does Snow Sometimes Squeak?`
          },
          {
            headline: `Why Does Snow Sometimes Squeak?`,
            text: `Very cold snow can squeak under boots because its ice crystals are hard and brittle, with little liquid water coating them. Stepping compresses and breaks the crystals, producing tiny vibrations and sounds. Warmer snow has more surface melting and tends to slide and pack more quietly. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why Does Wind Come in Gusts?`
          },
          {
            headline: `Why Does Wind Come in Gusts?`,
            text: `Wind near the ground is rarely a perfectly smooth stream. Buildings, trees, hills, temperature differences, and turbulence constantly mix faster-moving air with slower air. When a faster pocket reaches you, you feel a gust. The atmosphere is more like a churning river than a giant steady fan. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why Does Lightning Seem to Flicker?`
          },
          {
            headline: `Why Does Lightning Seem to Flicker?`,
            text: `A lightning flash can contain several rapid electrical strokes traveling along the same or nearby channels. Each stroke may last only a tiny fraction of a second, but together they can make the bolt appear to pulse or flicker. A camera with a fast shutter can reveal the separate events more clearly. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why Can a Wooden Spoon Calm a Boiling Pot?`
          }
        ]
      },
      {
        theme: `The Secret Life of Your Kitchen`,
        days: [
          {
            headline: `Why Can a Wooden Spoon Calm a Boiling Pot?`,
            text: `A dry wooden spoon laid across a pot can pop some rising foam bubbles and briefly interfere with a boilover. Wood is also a poor conductor of heat, so it stays cooler than metal for a while. It is not foolproof: once the spoon gets hot and wet, the trick becomes much less effective. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why Does Pasta Stick Together?`
          },
          {
            headline: `Why Does Pasta Stick Together?`,
            text: `Freshly cooked pasta releases starch into the water and onto its surface. When pieces sit against each other—especially after draining—the sticky starch can act like paste. Plenty of boiling water and stirring early in cooking help keep pieces moving; sauce soon after draining helps too. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why Does an Egg Turn Solid When Heated?`
          },
          {
            headline: `Why Does an Egg Turn Solid When Heated?`,
            text: `Egg whites are packed with folded proteins. Heat makes many of those proteins unfold and link with one another, forming a network that traps water. The clear, slippery white becomes opaque and firm. You are watching invisible molecules rearrange into a structure strong enough to hold its shape. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why Can You See Through a Microwave Door?`
          },
          {
            headline: `Why Can You See Through a Microwave Door?`,
            text: `The dark screen in a microwave door is a metal mesh filled with tiny holes. Visible light has wavelengths small enough to pass through those openings, so you can see the food. Microwave wavelengths are much larger, so the conductive mesh helps keep that energy inside the oven. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Why Does a Pressure Cooker Cook Faster?`
          },
          {
            headline: `Why Does a Pressure Cooker Cook Faster?`,
            text: `A pressure cooker traps steam, raising the pressure inside. Higher pressure lets liquid water reach a temperature above its normal boiling point before it boils vigorously. Hotter water and steam transfer energy to food faster, which is why beans, stews, and tough cuts can cook in less time. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why Does Cast Iron Need “Seasoning”?`
          },
          {
            headline: `Why Does Cast Iron Need “Seasoning”?`,
            text: `Seasoning is not just flavor left from old meals. A very thin layer of cooking oil is heated until its molecules react and form a hard polymerized coating bonded to the iron. Repeated thin layers help protect against rust and create a smoother cooking surface. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: What Does the Crisper Drawer Actually Do?`
          },
          {
            headline: `What Does the Crisper Drawer Actually Do?`,
            text: `A refrigerator’s crisper drawer changes the little climate around produce. Adjustable vents can control how quickly moisture escapes. Leafy vegetables often last better with higher humidity, while some fruits benefit from more airflow. The drawer is not simply storage—it is a humidity-management box. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Crows Can Remember Human Faces`
          }
        ]
      },
      {
        theme: `Animals With Surprisingly Human Talents`,
        days: [
          {
            headline: `Crows Can Remember Human Faces`,
            text: `Experiments with wild crows have shown that they can learn and remember particular human faces associated with danger. Other crows can also pick up the warning socially. To a crow, the people walking through a park may not be interchangeable background scenery. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Elephants Pay Special Attention to Their Dead`
          },
          {
            headline: `Elephants Pay Special Attention to Their Dead`,
            text: `Elephants have repeatedly been observed touching, investigating, and lingering around the bodies and bones of dead elephants. Scientists are cautious about assigning human emotions to the behavior, but the attention is unusual and suggests that death has strong social importance for them. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Rats Make Ultrasonic Sounds During Play`
          },
          {
            headline: `Rats Make Ultrasonic Sounds During Play`,
            text: `Young rats produce very high-pitched ultrasonic calls during rough-and-tumble play and when tickled by familiar researchers. Humans cannot hear the calls without special equipment. Scientists often compare them with positive social vocalizations rather than claiming they are exactly the same thing as human laughter. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Some Parrots Can Use Words as Labels`
          },
          {
            headline: `Some Parrots Can Use Words as Labels`,
            text: `Parrots are excellent mimics, but research with African grey parrots has shown that some can learn to use spoken labels for colors, shapes, materials, and quantities in structured tasks. That does not mean they speak language exactly like humans, but their vocal learning can be remarkably flexible. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Orca Families Have Their Own Dialects`
          },
          {
            headline: `Orca Families Have Their Own Dialects`,
            text: `Groups of killer whales use distinctive collections of calls that can be passed through families and social groups. Researchers can sometimes identify a group from its vocal patterns. Young whales learn the sounds around them, making an orca pod partly a community with its own acoustic traditions. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Chimpanzees Have Local Tool Traditions`
          },
          {
            headline: `Chimpanzees Have Local Tool Traditions`,
            text: `Different chimpanzee communities use different tools and techniques, such as sticks for gathering termites or stones for cracking nuts. Some behaviors cannot be explained simply by what materials are available. Young chimps learn by watching others, creating traditions that can persist within a group. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Goats Can Read More of Your Face Than You Think`
          },
          {
            headline: `Goats Can Read More of Your Face Than You Think`,
            text: `Experiments suggest goats can distinguish some human facial expressions and may prefer to approach images of positive expressions in certain testing conditions. The details are still studied, but goats are socially attentive animals—not the oblivious barnyard machines people sometimes imagine. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why Did Drinking Straws Bend?`
          }
        ]
      },
      {
        theme: `Who Thought of THAT?`,
        days: [
          {
            headline: `Why Did Drinking Straws Bend?`,
            text: `Early paper drinking straws were straight. In the 1930s, Joseph Friedman watched his young daughter struggle to drink through one at a soda fountain. He inserted a screw into a straw, wrapped dental floss around the ridges, and created corrugations that allowed the straw to bend without collapsing. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: The Can Came Before the Can Opener`
          },
          {
            headline: `The Can Came Before the Can Opener`,
            text: `Food was being sealed in metal cans decades before a convenient household can opener existed. Early cans were thick and instructions could involve knives, chisels, or other tools. As cans became thinner, dedicated openers appeared. Packaging technology had outrun the simple question of how ordinary people would open it. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why Is a Paper Clip Such a Good Shape?`
          },
          {
            headline: `Why Is a Paper Clip Such a Good Shape?`,
            text: `A paper clip works because springy wire bends slightly as papers slide between its loops, then pushes back to grip them. Many clip designs have existed; the familiar Gem pattern became dominant because it is simple, cheap, reusable, and needs no moving parts. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: How Did the Zipper Learn to Zip?`
          },
          {
            headline: `How Did the Zipper Learn to Zip?`,
            text: `Early “clasp lockers” and hook systems were awkward. Engineer Gideon Sundback improved the idea in the early 1900s with interlocking teeth and a slider that joins or separates them. The word zipper became popular later, after the fastener was used on boots and other products. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why Did the Ballpoint Pen Beat the Fountain Pen?`
          },
          {
            headline: `Why Did the Ballpoint Pen Beat the Fountain Pen?`,
            text: `A ballpoint uses a tiny rolling ball at its tip. As the ball turns, it picks up thick ink from inside the pen and transfers a controlled layer to paper. László Bíró helped develop a practical version after noticing that quick-drying printing ink avoided the smudging common with fountain pens. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: The Supermarket Beep Began With Lines`
          },
          {
            headline: `The Supermarket Beep Began With Lines`,
            text: `A barcode stores information in patterns of dark bars and light spaces that a scanner can read. The familiar UPC system was adopted by U.S. grocery retailers in the 1970s, allowing checkout systems to identify products quickly and connect them with prices stored in a computer. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why Does a QR Code Have Three Big Squares?`
          },
          {
            headline: `Why Does a QR Code Have Three Big Squares?`,
            text: `The large square patterns in three corners of a QR code are position markers. They help a scanner find the code and determine its orientation quickly, even if the code is rotated. QR codes were developed in Japan for tracking automotive parts before phones turned them into everyday links. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why Are Airplane Windows Rounded?`
          }
        ]
      },
      {
        theme: `Why Is It Made That Way?`,
        days: [
          {
            headline: `Why Are Airplane Windows Rounded?`,
            text: `Early pressurized airliners helped reveal that sharp corners concentrate stress. Repeated pressurization can make cracks grow from those high-stress points. Rounded windows spread the stress more smoothly through the aircraft skin, which is why modern passenger windows have curved corners rather than square ones. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why Are Manhole Covers Usually Round?`
          },
          {
            headline: `Why Are Manhole Covers Usually Round?`,
            text: `A round cover cannot fall through a circular opening of the same size, no matter how it is turned. Round covers are also easy to roll and do not need to be aligned with corners. Other shapes exist, but the circle solves several practical problems at once. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why Is the Bottom of a Soda Can Curved Inward?`
          },
          {
            headline: `Why Is the Bottom of a Soda Can Curved Inward?`,
            text: `Carbonated drinks push outward on their containers. A flat sheet of thin aluminum would flex more easily under that pressure. The inward dome at the bottom, together with the can’s cylindrical shape, helps the lightweight container resist pressure while using surprisingly little metal. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why Do Golf Balls Have Dimples?`
          },
          {
            headline: `Why Do Golf Balls Have Dimples?`,
            text: `A smooth golf ball creates a large turbulent wake that slows it dramatically. Dimples help the thin layer of air near the ball stay attached longer, shrinking that wake and reducing pressure drag. With spin, airflow also helps create lift, letting a dimpled ball travel much farther. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why Do Tires Need Tread?`
          },
          {
            headline: `Why Do Tires Need Tread?`,
            text: `Tire grooves give water pathways to escape from beneath the tire. Without enough drainage, a layer of water can separate rubber from pavement and cause hydroplaning. Racing tires can be smooth on dry tracks for maximum contact, but ordinary road tires must handle rain and changing conditions. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why Do Bridges Have Gaps?`
          },
          {
            headline: `Why Do Bridges Have Gaps?`,
            text: `Bridge materials expand when they warm and contract when they cool. Expansion joints give sections room to move without building damaging stress. The gaps and flexible connections you cross are deliberate; a completely rigid bridge would have to fight temperature changes every day. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why Is Toilet Paper Perforated?`
          },
          {
            headline: `Why Is Toilet Paper Perforated?`,
            text: `Perforations create a controlled weak line so a sheet tears where the maker intends instead of ripping unpredictably. Tiny cuts leave enough fibers connected to keep the roll together while making separation easy. It is a simple bit of engineering repeated billions of times. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: There Are “Lakes” Under the Ocean`
          }
        ]
      },
      {
        theme: `Ocean Things That Sound Made Up`,
        days: [
          {
            headline: `There Are “Lakes” Under the Ocean`,
            text: `In some deep-sea places, extremely salty water collects in depressions on the seafloor. Because the brine is denser than surrounding seawater, it can form a distinct pool with a visible boundary, almost like an underwater lake. The chemistry can be deadly to many animals that enter it. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: A Jellyfish Can Reset Its Life Cycle`
          },
          {
            headline: `A Jellyfish Can Reset Its Life Cycle`,
            text: `The tiny jellyfish Turritopsis dohrnii can, under certain stresses, transform mature cells and return from its jellyfish stage to an earlier polyp stage. That is why it is nicknamed the “immortal jellyfish.” It can still be eaten or die from disease, so immortal is catchy rather than literal. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: The Fish With a See-Through Head`
          },
          {
            headline: `The Fish With a See-Through Head`,
            text: `The barreleye fish Macropinna microstoma has a transparent, fluid-filled shield over the top of its head. Inside are unusual tubular eyes that can rotate, helping the fish look upward for prey and then forward as it feeds. Photographs make it look like a creature designed for a science-fiction movie. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: What Happens When a Whale Sinks?`
          },
          {
            headline: `What Happens When a Whale Sinks?`,
            text: `A dead whale that reaches the deep seafloor can become a “whale fall,” feeding a succession of scavengers and microbes for years. Large animals arrive first, then smaller organisms use the enriched bones and sediments. One body can become a temporary deep-sea ecosystem. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Can There Really Be an Underwater Waterfall?`
          },
          {
            headline: `Can There Really Be an Underwater Waterfall?`,
            text: `Near Mauritius, sand and sediment are carried off a shallow ocean shelf into deeper water. Seen from above, the streaking sediment creates a spectacular illusion of a waterfall pouring beneath the sea. The water is not falling into a giant hole—the seafloor and moving sediment create the effect. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why Can Ocean Waves Glow at Night?`
          },
          {
            headline: `Why Can Ocean Waves Glow at Night?`,
            text: `Some plankton, especially dinoflagellates, produce light through chemical reactions when the water around them is disturbed. Breaking waves, a paddle, or even a hand can trigger blue flashes. Bioluminescence may help startle predators or attract larger animals that attack those predators. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why Would a Sea Cucumber Throw Out Its Own Organs?`
          },
          {
            headline: `Why Would a Sea Cucumber Throw Out Its Own Organs?`,
            text: `Some sea cucumbers can eject sticky tubes or portions of internal organs when threatened. The dramatic sacrifice may distract or entangle a predator. Even stranger, the animal can regenerate lost tissues afterward. It is an emergency defense strategy few animals could survive. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why Does Déjà Vu Feel So Convincing?`
          }
        ]
      },
      {
        theme: `Your Brain Plays Tricks on You`,
        days: [
          {
            headline: `Why Does Déjà Vu Feel So Convincing?`,
            text: `Déjà vu is the eerie feeling that a new situation has happened before. Researchers think it may involve memory and familiarity systems briefly getting out of sync, producing a strong sense of recognition without a matching memory. The feeling is real even when the “previous event” is not. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why Does a Song Get Stuck in Your Head?`
          },
          {
            headline: `Why Does a Song Get Stuck in Your Head?`,
            text: `A short piece of music that repeats in your mind is often called an involuntary musical image, or earworm. Catchy, familiar, recently heard tunes are common triggers. Trying desperately not to think about the song can sometimes keep attention locked on it; engaging with another task may work better. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why Do You Sometimes Feel a Phone Vibrate When It Didn’t?`
          },
          {
            headline: `Why Do You Sometimes Feel a Phone Vibrate When It Didn’t?`,
            text: `People who frequently expect phone alerts can occasionally interpret ordinary sensations—clothing movement, muscle twitches, pressure—as a vibration. The brain is constantly guessing what sensory signals mean, and strong expectations can tilt that guess toward “my phone buzzed.” That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why Can Years Seem to Pass Faster as You Get Older?`
          },
          {
            headline: `Why Can Years Seem to Pass Faster as You Get Older?`,
            text: `There is no single clock in the brain that explains the feeling, but novelty and attention matter. New experiences create many distinctive memories, while routine periods can leave fewer landmarks when remembered later. A busy, repetitive year can therefore seem surprisingly compressed in hindsight. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why Do You Forget What You Wanted After Walking Into a Room?`
          },
          {
            headline: `Why Do You Forget What You Wanted After Walking Into a Room?`,
            text: `Researchers call one version of this the doorway effect. Moving into a new context can cause the brain to update what it is actively keeping in mind. The effect is not absolute, but boundaries between situations can make a fragile intention easier to lose. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why Is Yawning Contagious?`
          },
          {
            headline: `Why Is Yawning Contagious?`,
            text: `Seeing, hearing, reading about, or even thinking about yawning can trigger one. Scientists have linked contagious yawning with social and attention processes, but there is no single settled explanation. The fact that this paragraph may make you yawn is part of what makes the mystery fun. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Why Does a Familiar Word Suddenly Look Wrong?`
          },
          {
            headline: `Why Does a Familiar Word Suddenly Look Wrong?`,
            text: `Repeat or stare at a word long enough and it can briefly lose its familiar feel. A related effect called semantic satiation occurs when repetition temporarily weakens the immediate connection between a word and its meaning. Nothing changed about the spelling; your processing of it did. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why forks were once controversial`
          }
        ]
      },
      {
        theme: `Hidden History at the Dinner Table`,
        days: [
          {
            headline: `Why forks were once controversial`,
            text: `Forks spread slowly through Europe. Some diners saw the small table fork as unnecessary, overly fancy, or foreign; knives, spoons, and fingers already handled most food. As dining customs changed, the fork became ordinary. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: How ketchup existed before tomato ketchup`
          },
          {
            headline: `How ketchup existed before tomato ketchup`,
            text: `The word ketchup is linked to Asian fermented sauces. Early English-language recipes used ingredients such as mushrooms, walnuts, or anchovies. Tomato ketchup became dominant later, so ketchup existed as an idea before the familiar red version. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why salt and pepper became a pair`
          },
          {
            headline: `Why salt and pepper became a pair`,
            text: `Salt has long been essential for flavor and preservation, while black pepper became a prized seasoning through ancient trade. European dining customs eventually placed the two together so often that the pairing became a table standard rather than a law of cooking. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: How restaurant menus changed dining`
          },
          {
            headline: `How restaurant menus changed dining`,
            text: `Early inns and communal tables often served whatever meal was prepared. Restaurants helped popularize choosing individual dishes from a written list, allowing diners to order different foods and prices instead of accepting one shared meal. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why Chinese takeout boxes fold the way they do`
          },
          {
            headline: `Why Chinese takeout boxes fold the way they do`,
            text: `The familiar folded paper pail used by many American Chinese restaurants was originally patented as an oyster container. Its single folded piece can hold food with few seams, and the wire handle makes it portable. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why people clink glasses`
          },
          {
            headline: `Why people clink glasses`,
            text: `The exact origin of glass-clinking is not settled. Explanations about splashing poison between cups are popular but poorly supported. What is clear is that raising and touching glasses became part of communal toasting rituals and celebration. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: How the sandwich got its name`
          },
          {
            headline: `How the sandwich got its name`,
            text: `The sandwich is named for John Montagu, the fourth Earl of Sandwich. The famous gambling-table story may be embellished, but eighteenth-century records connect his name with meat served between slices of bread. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why padlocks have tiny holes`
          }
        ]
      },
      {
        theme: `Tiny Designs With Big Jobs`,
        days: [
          {
            headline: `Why padlocks have tiny holes`,
            text: `A small hole near the bottom of many outdoor padlocks can let water drain and can provide access for lubricant. It helps a lock cope with weather, though not every padlock uses the same design. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: The sharp edge hidden on plastic-wrap boxes`
          },
          {
            headline: `The sharp edge hidden on plastic-wrap boxes`,
            text: `Many wrap and foil boxes include a serrated cutting edge so the thin sheet can be pulled tight and torn cleanly. The box itself becomes part dispenser and part cutting tool. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Why screws have different head shapes`
          },
          {
            headline: `Why screws have different head shapes`,
            text: `Screw heads are designed for different tools, torque levels, manufacturing needs, and resistance to slipping. Phillips heads were designed to work well with powered assembly; other patterns trade ease, grip, security, and cost differently. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: The tiny hole in an airplane window`
          },
          {
            headline: `The tiny hole in an airplane window`,
            text: `Passenger windows often have a tiny breather hole in the inner or middle pane. It helps manage pressure between layers and can reduce condensation, while the stronger outer pane carries the main cabin-pressure load. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why jeans have metal rivets`
          },
          {
            headline: `Why jeans have metal rivets`,
            text: `Jacob Davis used copper rivets to reinforce stress points on work pants, then partnered with Levi Strauss to patent the idea in 1873. The little metal fasteners helped pockets and seams survive hard use. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why sidewalks have bumpy warning tiles`
          },
          {
            headline: `Why sidewalks have bumpy warning tiles`,
            text: `Raised truncated domes on curb ramps and platform edges provide tactile warnings that can be felt underfoot or with a cane. They help people with low vision detect a transition toward traffic or another hazard. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why bottle caps have ridges`
          },
          {
            headline: `Why bottle caps have ridges`,
            text: `Ridges around many screw caps give fingers more edges to push against, improving grip and torque. A small texture change makes a tight cap easier to twist without making the whole cap larger. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Plants can warn neighbors with chemicals`
          }
        ]
      },
      {
        theme: `Plants Are Doing WHAT?`,
        days: [
          {
            headline: `Plants can warn neighbors with chemicals`,
            text: `When insects damage some plants, the plants release airborne chemicals. Nearby plants can detect certain compounds and change their own defenses. Scientists avoid calling it language in the human sense, but plants do respond to chemical information around them. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: A Venus flytrap can count touches`
          },
          {
            headline: `A Venus flytrap can count touches`,
            text: `A Venus flytrap does not snap shut after every tiny disturbance. Sensitive trigger hairs usually must be stimulated more than once within a short period, helping the plant avoid wasting energy on raindrops or debris. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Young sunflowers follow the Sun`
          },
          {
            headline: `Young sunflowers follow the Sun`,
            text: `Young sunflower stems grow in a daily pattern that makes the flower heads track east to west during the day and reorient east overnight. Mature flowers usually stop tracking and tend to face east. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Trees and fungi trade underground`
          },
          {
            headline: `Trees and fungi trade underground`,
            text: `Mycorrhizal fungi grow around or into plant roots and trade soil nutrients and water for sugars made by plants. Networks can connect multiple plants, though popular claims that forests operate as a single cooperative “internet” often go beyond what evidence can prove. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Some seed pods explode`
          },
          {
            headline: `Some seed pods explode`,
            text: `Plants such as touch-me-nots store elastic energy in their seed pods as tissues dry or grow under tension. A touch can trigger the pod to split and curl rapidly, flinging seeds away from the parent plant. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: How plants know which way is down`
          },
          {
            headline: `How plants know which way is down`,
            text: `Plants sense gravity using specialized cells containing dense starch-filled structures that settle toward the lower side. Roots and shoots respond differently to that signal, helping roots grow down and shoots grow up even in darkness. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Some flowers make their own heat`
          },
          {
            headline: `Some flowers make their own heat`,
            text: `A few plants, including skunk cabbage and some arums, can generate noticeable heat by running cellular respiration unusually fast. The warmth can help spread scents and may protect delicate tissues in cold conditions. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: How the Caesar salad got its name`
          }
        ]
      },
      {
        theme: `The Strange Story Behind Familiar Foods`,
        days: [
          {
            headline: `How the Caesar salad got its name`,
            text: `Caesar salad is generally credited to restaurateur Caesar Cardini in Tijuana, Mexico, in the 1920s. It was named for Caesar the restaurateur, not Julius Caesar, and early versions were prepared tableside. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Who invented nachos`
          },
          {
            headline: `Who invented nachos`,
            text: `Nachos trace to Ignacio “Nacho” Anaya in Piedras Negras, Mexico, in 1943. Faced with hungry guests and a closed kitchen, he assembled fried tortilla pieces, cheese, and jalapeños into a quick snack. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Why ice-cream cones became famous`
          },
          {
            headline: `Why ice-cream cones became famous`,
            text: `Edible cones existed before the 1904 St. Louis World’s Fair, but the fair helped popularize ice cream served in crisp rolled wafers. The tidy handheld combination was perfect for crowds and soon spread widely. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why pretzels have that shape`
          },
          {
            headline: `Why pretzels have that shape`,
            text: `Pretzels have been made in looped forms for centuries, but the exact origin of the shape is uncertain. Stories about monks and folded arms are charming but not firmly documented; the practical twisted form also creates thin, crisp sections and a recognizable silhouette. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: How cotton candy came from a dentist and a candy maker`
          },
          {
            headline: `How cotton candy came from a dentist and a candy maker`,
            text: `Dentist William Morrison and confectioner John C. Wharton patented an electric machine that spun melted sugar into fine strands. Their “fairy floss” became a sensation at the 1904 St. Louis World’s Fair. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Why Worcestershire sauce is fermented`
          },
          {
            headline: `Why Worcestershire sauce is fermented`,
            text: `Worcestershire sauce develops its complex savory flavor from ingredients that are blended and aged, traditionally including vinegar, molasses, tamarind, spices, and anchovies. Fermentation and aging transform sharp individual ingredients into a deeper sauce. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: How instant noodles changed convenience food`
          },
          {
            headline: `How instant noodles changed convenience food`,
            text: `Momofuku Ando introduced Chicken Ramen in Japan in 1958 after developing a way to dry cooked noodles so hot water could rehydrate them quickly. Cup Noodles later put the noodles and serving container into one portable package. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why fireflies flash`
          }
        ]
      },
      {
        theme: `Things That Glow`,
        days: [
          {
            headline: `Why fireflies flash`,
            text: `Fireflies make light in specialized organs using luciferin, oxygen, and enzymes. The reaction is extremely efficient and produces little heat. Flash patterns help many species find mates, with different species using different timing. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: The caves that look like starry skies`
          },
          {
            headline: `The caves that look like starry skies`,
            text: `New Zealand glowworms are fungus-gnat larvae that produce blue-green light. In dark caves, thousands hang sticky silk threads to catch small insects, turning cave ceilings into what looks like a field of stars. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why anglerfish carry lights`
          },
          {
            headline: `Why anglerfish carry lights`,
            text: `Many deep-sea anglerfish host light-producing bacteria in a lure extending from the head. In darkness where sunlight never reaches, the glowing lure can attract curious prey close enough to be swallowed. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Mushrooms that glow`
          },
          {
            headline: `Mushrooms that glow`,
            text: `Dozens of fungi produce bioluminescent light through chemical reactions. Scientists are still studying why different species glow; in some mushrooms the light may attract insects that help spread spores. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why scorpions fluoresce under UV`
          },
          {
            headline: `Why scorpions fluoresce under UV`,
            text: `Compounds in a scorpion’s hard outer cuticle fluoresce strongly under ultraviolet light, often glowing blue-green. Scientists know how useful that is for finding scorpions at night, but the biological reason scorpions evolved the fluorescence remains debated. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why plankton can make beaches sparkle`
          },
          {
            headline: `Why plankton can make beaches sparkle`,
            text: `Some dinoflagellates flash blue when water movement disturbs them. Waves, footsteps, or a paddle can trigger chemical light inside the cells, turning dark water into a field of brief sparks. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why tonic water glows under black light`
          },
          {
            headline: `Why tonic water glows under black light`,
            text: `Tonic water contains quinine. Quinine absorbs ultraviolet light and releases part of that energy as visible blue light, so tonic water can glow brightly under a black light even though it looks clear in normal light. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why arches can hold enormous weight`
          }
        ]
      },
      {
        theme: `How Does THAT Stay Up?`,
        days: [
          {
            headline: `Why arches can hold enormous weight`,
            text: `An arch redirects much of the load above it into compression along its curved blocks and outward into supports. Stone handles compression well, which is why masonry arches can carry heavy loads without a beam spanning the opening. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: How suspension bridges carry a roadway`
          },
          {
            headline: `How suspension bridges carry a roadway`,
            text: `The roadway hangs from vertical suspenders connected to huge main cables. Those cables carry tension toward towers and anchorages, while the towers carry compression downward. The structure spreads a long span’s load among parts specialized for different forces. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why skyscrapers are allowed to sway`
          },
          {
            headline: `Why skyscrapers are allowed to sway`,
            text: `Tall buildings are designed to move slightly in wind. Making them perfectly rigid would create enormous stresses. Engineers control the motion with structural bracing, tuned mass dampers, and aerodynamic shaping so movement stays within safe and comfortable limits. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why the Leaning Tower of Pisa is still standing`
          },
          {
            headline: `Why the Leaning Tower of Pisa is still standing`,
            text: `The tower began leaning because its foundation sat on soft, uneven ground. Modern stabilization work removed small amounts of soil and used counterweights and cables to reduce the tilt, leaving the famous lean while making collapse far less likely. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: How domes spread weight`
          },
          {
            headline: `How domes spread weight`,
            text: `A dome carries loads through curved compression paths around and downward toward its supports. The shape can cover a wide area without interior columns, but the base must resist the outward thrust created by the curved structure. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: How cantilevers hang out with no support underneath`
          },
          {
            headline: `How cantilevers hang out with no support underneath`,
            text: `A cantilever is anchored at one end while the other end projects outward. The fixed end resists bending and transfers forces into a larger structure, allowing balconies, signs, wings, and bridge sections to appear to hang in space. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: How dry-stone walls stand without mortar`
          },
          {
            headline: `How dry-stone walls stand without mortar`,
            text: `Carefully fitted stones rely on gravity, friction, weight, and interlocking shapes. Good builders place stones so forces move inward and downward, and the wall can flex slightly as ground shifts instead of cracking like a rigid mortared wall. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Where Devil's Kettle water really goes`
          }
        ]
      },
      {
        theme: `Minnesota Is Stranger Than You Think`,
        days: [
          {
            headline: `Where Devil's Kettle water really goes`,
            text: `At Minnesota’s Devil’s Kettle, part of the Brule River plunges into a pothole and seems to vanish. Minnesota DNR flow measurements found essentially the same amount of water downstream, showing the “missing” water rejoins the river rather than taking a secret route to Lake Superior. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Why Minnesota has so many agates`
          },
          {
            headline: `Why Minnesota has so many agates`,
            text: `Lake Superior agates formed when mineral-rich fluids filled gas pockets in ancient volcanic rock. Later glaciers broke and carried the hard agates across Minnesota, which is why the state gemstone can turn up far from Lake Superior. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why Minnesota has so many lakes`
          },
          {
            headline: `Why Minnesota has so many lakes`,
            text: `Repeated Ice Age glaciers scraped basins, moved sediment, and left buried blocks of ice. When the ice melted, depressions filled with water. Minnesota’s landscape is essentially covered with fingerprints left by glaciers. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: The enormous lake that once covered the Red River Valley`
          },
          {
            headline: `The enormous lake that once covered the Red River Valley`,
            text: `Glacial Lake Agassiz formed when melting ice was trapped along the retreating ice sheet. At times it covered an area larger than all the modern Great Lakes combined, and its flat lakebed helped create today’s remarkably level Red River Valley. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why part of Minnesota sits above the 49th parallel`
          },
          {
            headline: `Why part of Minnesota sits above the 49th parallel`,
            text: `The Northwest Angle exists because eighteenth-century treaty writers used an inaccurate understanding of Lake of the Woods. Later surveys had to honor the treaty language, leaving a piece of Minnesota that can be reached by land from the rest of the United States only through Canada. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: How Duluth connects to the Atlantic Ocean`
          },
          {
            headline: `How Duluth connects to the Atlantic Ocean`,
            text: `Ships can travel from western Lake Superior through the other Great Lakes, canals, locks, and the St. Lawrence River to the Atlantic. That makes Duluth-Superior an inland port with an ocean connection more than a thousand miles away. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why wild rice is far more than a Minnesota food`
          },
          {
            headline: `Why wild rice is far more than a Minnesota food`,
            text: `Wild rice, or manoomin, is deeply important to Ojibwe history, culture, foodways, and treaty rights. It is an aquatic grass rather than the same species as ordinary white rice, and traditional harvesting from canoes remains culturally significant. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why a seashell sounds like the ocean`
          }
        ]
      },
      {
        theme: `Sounds With Secret Stories`,
        days: [
          {
            headline: `Why a seashell sounds like the ocean`,
            text: `A shell does not store ocean sound. Its hollow shape emphasizes some frequencies from the background noise around you, including room sound and sounds produced near your ear. Similar rushing noise can be heard from other hollow objects. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why your recorded voice sounds wrong`
          },
          {
            headline: `Why your recorded voice sounds wrong`,
            text: `When you speak, you hear sound through the air and vibrations conducted through bones and tissues in your head. A recording gives you mostly the air-conducted version, so it often sounds thinner or higher than the voice you are used to hearing. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Why rubbing a balloon can squeak`
          },
          {
            headline: `Why rubbing a balloon can squeak`,
            text: `When rubber drags across skin or another surface, friction alternates between sticking and slipping. Those rapid tiny motions make the balloon vibrate and push sound waves into the air, producing a squeak. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Why chalk sometimes squeals`
          },
          {
            headline: `Why chalk sometimes squeals`,
            text: `Chalk can repeatedly stick and slip against a board as it moves. That vibration can fall in a frequency range our ears find especially sharp. Changing the angle, pressure, or chalk can stop the stick-slip cycle. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why mosquitoes buzz`
          },
          {
            headline: `Why mosquitoes buzz`,
            text: `The buzz comes mainly from rapid wingbeats. Male and female mosquitoes can detect wingbeat frequencies, and some species adjust their flight tones during courtship. The sound that annoys us is part of the mechanics—and sometimes the social life—of flying. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why humming changes when you plug your nose`
          },
          {
            headline: `Why humming changes when you plug your nose`,
            text: `Humming sends much of its sound through the nasal passages. Pinching the nose changes the resonating air spaces and blocks airflow through the nostrils, so the tone becomes muffled or changes pitch and quality. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why empty rooms echo`
          },
          {
            headline: `Why empty rooms echo`,
            text: `Hard bare surfaces reflect sound instead of absorbing much of it. In an empty room, reflected waves can reach your ears after the direct sound, creating reverberation or distinct echoes. Rugs, curtains, furniture, and people absorb and scatter more sound. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why Moon footprints can last so long`
          }
        ]
      },
      {
        theme: `Space Is Ridiculous`,
        days: [
          {
            headline: `Why Moon footprints can last so long`,
            text: `The Moon has essentially no weather like Earth’s wind or rain to erase tracks. Micrometeorite impacts slowly disturb the surface, so footprints are not literally eternal, but they can remain recognizable for an extremely long time. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why sunsets on Mars can look blue`
          },
          {
            headline: `Why sunsets on Mars can look blue`,
            text: `Fine Martian dust scatters light differently from Earth’s atmosphere. Near the Sun at sunset, the dust can leave more bluish light traveling toward an observer while the wider sky looks reddish—the opposite color arrangement from a typical Earth sunset. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Would Saturn really float?`
          },
          {
            headline: `Would Saturn really float?`,
            text: `Saturn’s average density is lower than liquid water, so in a purely imaginary ocean large enough to hold the planet, it would be buoyant. Real physics makes the scenario impossible—the required ocean and Saturn itself would not behave like ordinary objects—but the density comparison is true. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: A day on Venus is longer than its year`
          },
          {
            headline: `A day on Venus is longer than its year`,
            text: `Venus rotates extremely slowly. One rotation relative to distant stars takes about 243 Earth days, while Venus orbits the Sun in about 225 Earth days. Its rotation is also backward compared with most planets. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why astronauts get taller in space`
          },
          {
            headline: `Why astronauts get taller in space`,
            text: `Without Earth’s gravity compressing the spine in the usual way, the discs between vertebrae can expand and the spine can lengthen. Astronauts may temporarily become a few centimeters taller, then return toward normal height after coming home. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why astronauts say space has a smell`
          },
          {
            headline: `Why astronauts say space has a smell`,
            text: `Astronauts cannot sniff the vacuum directly, but after spacewalks they have described odors on suits and equipment brought into the airlock—often compared with metal, welding fumes, or burnt material. Chemical reactions on exposed surfaces may contribute. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why the Moon is slowly moving away`
          },
          {
            headline: `Why the Moon is slowly moving away`,
            text: `The Moon’s gravity raises tides on Earth. Because Earth rotates faster than the Moon orbits, tidal interactions transfer a little rotational energy to the Moon’s orbit. Laser measurements show the Moon receding by about 3.8 centimeters per year. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Where “break the ice” came from`
          }
        ]
      },
      {
        theme: `Why Do We Say That?`,
        days: [
          {
            headline: `Where “break the ice” came from`,
            text: `“Break the ice” has been used for centuries to mean making a beginning or opening a way. Literal icebreaking by ships offers an obvious image, but pinning the figurative phrase to one specific historical event is difficult. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Where “spill the beans” may have come from`
          },
          {
            headline: `Where “spill the beans” may have come from`,
            text: `“Spill the beans” means reveal a secret, but its exact origin is uncertain. A popular story about ancient voting with beans lacks strong evidence. The safer—and more interesting—fact is that familiar phrases can survive even after their beginnings are lost. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why we say “under the weather”`
          },
          {
            headline: `Why we say “under the weather”`,
            text: `The phrase has been used since at least the nineteenth century for feeling ill or unwell. Nautical origin stories are often repeated, but the documentary trail does not prove one neat explanation. Language frequently keeps the phrase while losing the original logic. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Where “bite the bullet” came from`
          },
          {
            headline: `Where “bite the bullet” came from`,
            text: `The phrase means endure something painful or difficult. Stories about patients literally biting bullets during surgery are famous, but evidence for that as the direct source is weak. Written uses of the figurative phrase appear in the nineteenth century. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why an easy task is a “piece of cake”`
          },
          {
            headline: `Why an easy task is a “piece of cake”`,
            text: `“Piece of cake” became American slang for something easy in the twentieth century. Cake already carried associations with pleasure and reward, making it a natural image for an easy or enjoyable task. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why we say “kick the bucket”`
          },
          {
            headline: `Why we say “kick the bucket”`,
            text: `“Kick the bucket” has meant die for centuries, but the exact origin is uncertain. One theory connects bucket to a beam or yoke used in slaughterhouses; other explanations compete. It is a case where the mystery is more honest than a tidy legend. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why something almost right is “close but no cigar”`
          },
          {
            headline: `Why something almost right is “close but no cigar”`,
            text: `The phrase is associated with old carnival games where cigars could be prizes. A player who nearly succeeded might be close—but receive no cigar. The expression became a colorful way to say “almost, but not quite.” The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why metal feels colder than wood`
          }
        ]
      },
      {
        theme: `Cold Does Strange Things`,
        days: [
          {
            headline: `Why metal feels colder than wood`,
            text: `Metal and wood in the same room can be at the same temperature. Metal feels colder because it conducts heat away from your skin much faster. Your temperature-sensing nerves respond strongly to that rapid heat flow. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why salt helps melt road ice`
          },
          {
            headline: `Why salt helps melt road ice`,
            text: `Salt dissolves in the thin liquid layer that exists on ice and lowers water’s freezing point. That makes it harder for liquid water to refreeze at the same temperature. Ordinary road salt becomes less effective in very severe cold. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: How frost draws patterns on windows`
          },
          {
            headline: `How frost draws patterns on windows`,
            text: `When moist air meets glass cold enough for water vapor to freeze, ice crystals grow on the surface. Tiny scratches, dust, temperature differences, and changing humidity guide the branching patterns, creating fernlike designs. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why frozen lakes boom and crack`
          },
          {
            headline: `Why frozen lakes boom and crack`,
            text: `Ice expands and contracts as temperature changes. A rapid cold snap can create stress until the ice fractures, sending vibrations across the sheet. The lake can boom, pop, or make eerie laser-like sounds even when the ice remains thick. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why you can see your breath`
          },
          {
            headline: `Why you can see your breath`,
            text: `Warm breath contains water vapor. In cold air, that vapor cools and condenses into tiny liquid droplets or ice crystals that scatter light. You are not seeing water vapor itself—you are seeing the miniature cloud it becomes. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why bridges freeze before roads`
          },
          {
            headline: `Why bridges freeze before roads`,
            text: `A bridge deck is exposed to cold air above and below, while an ordinary road receives some heat from the ground. Bridges can therefore lose heat faster and reach freezing temperature sooner. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: How snow can keep things warm`
          },
          {
            headline: `How snow can keep things warm`,
            text: `Fresh snow traps lots of air between ice crystals, and air is a poor conductor of heat. A snow layer can slow heat loss from soil, plants, and animal shelters even though the snow itself is cold. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: The woodpecker tongue that wraps around its head`
          }
        ]
      },
      {
        theme: `Built-In Animal Tools`,
        days: [
          {
            headline: `The woodpecker tongue that wraps around its head`,
            text: `Woodpecker tongue-support structures called the hyoid apparatus can extend far around the skull in some species. The unusual anatomy helps support an extremely long tongue used to reach insects deep inside holes. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: How an elephant trunk does delicate work`
          },
          {
            headline: `How an elephant trunk does delicate work`,
            text: `An elephant trunk contains tens of thousands of muscles but no bones. It can lift heavy objects, draw up water, smell, trumpet, and use the sensitive tip to pick up surprisingly small items. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: What a narwhal tusk really is`
          },
          {
            headline: `What a narwhal tusk really is`,
            text: `A narwhal tusk is an elongated tooth, usually the left canine of a male, that grows through the upper lip in a spiral. It contains sensory structures and is also used in social behavior. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why a toucan has such a giant bill`
          },
          {
            headline: `Why a toucan has such a giant bill`,
            text: `A toucan’s bill looks heavy but is built from a lightweight internal framework covered by keratin. Besides reaching food, the large bill contains blood vessels and can help the bird release excess body heat. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: How a chameleon fires its tongue`
          },
          {
            headline: `How a chameleon fires its tongue`,
            text: `A chameleon stores elastic energy in tissues around a specialized tongue structure. When released, that energy launches the tongue at prey with acceleration muscles alone could not easily produce. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: The star-nosed mole’s incredible nose`
          },
          {
            headline: `The star-nosed mole’s incredible nose`,
            text: `Twenty-two fleshy rays surround the star-nosed mole’s nostrils. Packed with touch receptors, they let the mole identify tiny prey with extraordinary speed while hunting in dark soil and water. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why flamingos eat with their heads upside down`
          },
          {
            headline: `Why flamingos eat with their heads upside down`,
            text: `A flamingo bends its neck so the bill works upside down in the water. Comb-like structures called lamellae and movements of the tongue help filter small food particles from water and mud. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: The long history of the toothbrush`
          }
        ]
      },
      {
        theme: `Everyday Things With Ancient Roots`,
        days: [
          {
            headline: `The long history of the toothbrush`,
            text: `People cleaned teeth with chew sticks and cloth long before modern brushes. Bristle toothbrushes appeared in China centuries ago, and mass-produced nylon-bristle brushes arrived in the twentieth century. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Umbrellas before rainy-day commutes`
          },
          {
            headline: `Umbrellas before rainy-day commutes`,
            text: `Umbrella-like sunshades are ancient and were often symbols of status. Protection from sun came before the folding rain umbrella became an ordinary personal accessory in many places. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Ancient socks were stranger than ours`
          },
          {
            headline: `Ancient socks were stranger than ours`,
            text: `Ancient Egyptian socks survive with a split between the big toe and the others, allowing them to be worn with sandals. The design looks unusual today but makes perfect sense with the footwear. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Locks and keys are thousands of years old`
          },
          {
            headline: `Locks and keys are thousands of years old`,
            text: `Ancient Egyptian wooden pin locks used movable pins that had to be lifted into position with a key. The materials changed, but the basic idea—moving internal parts into the right alignment—still appears in modern locks. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why dice are ancient`
          },
          {
            headline: `Why dice are ancient`,
            text: `Cube-like dice and other randomizing objects have been found at ancient sites across several civilizations. Humans have been using chance for games, divination, and decisions for thousands of years. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: What mirrors were made from before glass`
          },
          {
            headline: `What mirrors were made from before glass`,
            text: `Before silvered glass mirrors, people used polished stone and polished metals such as bronze. A smooth surface can reflect an image without being glass; modern mirrors simply make the reflection brighter and easier to produce. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: How people woke up before alarm clocks`
          },
          {
            headline: `How people woke up before alarm clocks`,
            text: `People used bells, household routines, roosters, servants, and even paid “knocker-uppers” who tapped on windows in industrial-era Britain. Mechanical alarm clocks eventually made waking on schedule a personal machine’s job. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why spider silk is remarkable`
          }
        ]
      },
      {
        theme: `How Can THAT Be So Strong?`,
        days: [
          {
            headline: `Why spider silk is remarkable`,
            text: `Spider silk combines low weight with impressive tensile strength and toughness. Different silk glands make different kinds for draglines, prey capture, egg cases, and wrapping, so “spider silk” is really a family of specialized materials. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: How an eggshell carries weight`
          },
          {
            headline: `How an eggshell carries weight`,
            text: `An eggshell is thin, but its curved shape spreads compressive forces around the shell. Pressure distributed over a broad area can be surprisingly well supported, while a sharp point concentrates stress and cracks it easily. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why honeycomb is efficient`
          },
          {
            headline: `Why honeycomb is efficient`,
            text: `Hexagonal cells tile a flat surface without gaps. For a given cell area, the geometry uses relatively little wall material while sharing walls with neighbors, helping bees build lots of storage from limited wax. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why corrugated cardboard is surprisingly strong`
          },
          {
            headline: `Why corrugated cardboard is surprisingly strong`,
            text: `A wavy fluted sheet glued between flat liners acts like a series of tiny arches and beams. The spacing gives the board thickness and stiffness without requiring a solid slab of paper. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why plywood layers run in different directions`
          },
          {
            headline: `Why plywood layers run in different directions`,
            text: `Wood is strongest along its grain and moves differently across the grain. Plywood stacks thin veneers with grain directions alternating, making the sheet more stable and strong in more than one direction. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why carbon fiber is strong for its weight`
          },
          {
            headline: `Why carbon fiber is strong for its weight`,
            text: `Carbon-fiber composites embed extremely strong, thin carbon filaments in a resin. Engineers can orient fibers along expected loads, creating parts that are stiff and strong without the weight of solid metal. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why bones are strong without being solid`
          },
          {
            headline: `Why bones are strong without being solid`,
            text: `Many bones have a dense outer shell and a lighter internal lattice called trabecular bone. The architecture places material where it handles loads efficiently, producing strength without making the skeleton impossibly heavy. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: How water can hold up a paper clip`
          }
        ]
      },
      {
        theme: `Water Breaks the Rules`,
        days: [
          {
            headline: `How water can hold up a paper clip`,
            text: `Water molecules attract one another strongly at the surface, creating surface tension. If a paper clip is placed gently enough, the surface can deform without breaking and support the clip even though steel itself is denser than water. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: How water climbs a paper towel`
          },
          {
            headline: `How water climbs a paper towel`,
            text: `Water sticks to cellulose fibers while water molecules also pull on one another. In tiny spaces between fibers, those forces draw water upward and sideways by capillary action, even against gravity. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why water drops become round`
          },
          {
            headline: `Why water drops become round`,
            text: `Surface tension pulls a free droplet toward the shape with the smallest surface area for its volume: a sphere. Gravity flattens large drops, but tiny droplets can become nearly round. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why water dances on a very hot pan`
          },
          {
            headline: `Why water dances on a very hot pan`,
            text: `On a surface far above water’s boiling point, the bottom of a droplet can vaporize so quickly that the drop rides on a cushion of its own steam. This Leidenfrost effect lets it skitter around instead of boiling away immediately. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: How supercooled water can freeze in a flash`
          },
          {
            headline: `How supercooled water can freeze in a flash`,
            text: `Very pure water can sometimes cool below its normal freezing point without forming ice because no crystal has started. A jolt or seed crystal can suddenly provide a starting point, and ice spreads rapidly through the liquid. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why flat stones skip`
          },
          {
            headline: `Why flat stones skip`,
            text: `A fast spinning stone hitting water at a shallow angle pushes water downward and receives an upward force in return. Spin helps keep the stone’s orientation stable long enough for repeated bounces. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why wet pavement looks darker`
          },
          {
            headline: `Why wet pavement looks darker`,
            text: `Water fills rough gaps on the surface and changes how light is reflected and scattered. More light can enter the material instead of bouncing diffusely toward your eyes, making the wet surface look darker and often shinier. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: The blind spot you never notice`
          }
        ]
      },
      {
        theme: `Things Your Eyes Get Wrong`,
        days: [
          {
            headline: `The blind spot you never notice`,
            text: `Where the optic nerve leaves each retina there are no light-detecting cells. Your brain usually fills in the missing patch using surrounding information, and the other eye often covers it, so you walk around with a literal hole in vision you rarely notice. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why you see colors after staring at an image`
          },
          {
            headline: `Why you see colors after staring at an image`,
            text: `Staring at a strong color adapts some cone cells more than others. When you switch to a neutral background, the less-adapted channels temporarily dominate, creating an afterimage in roughly complementary colors. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why the Moon looks huge near the horizon`
          },
          {
            headline: `Why the Moon looks huge near the horizon`,
            text: `The Moon’s image on the retina is nearly the same size at the horizon and high in the sky. The “Moon illusion” is a perception effect, probably involving how the brain judges distance and compares the Moon with familiar objects near the horizon. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why wheels can look like they spin backward`
          },
          {
            headline: `Why wheels can look like they spin backward`,
            text: `Under flashing lights, film frames, or some visual conditions, you see a rotating wheel only at separated moments. If each glimpse catches the spokes just short of their previous positions, the brain can interpret the sequence as backward motion. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: How shadows fool your judgment of brightness`
          },
          {
            headline: `How shadows fool your judgment of brightness`,
            text: `The brain judges brightness using context, not raw light alone. In classic illusions, two patches sending similar light to your eyes can look different because the brain interprets one as being in shadow. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why peripheral vision is bad at detail`
          },
          {
            headline: `Why peripheral vision is bad at detail`,
            text: `The center of the retina has a dense concentration of cone cells and receives lots of brain processing. Peripheral retina is excellent at detecting motion and broad patterns but has much lower fine-detail resolution. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why faint stars can vanish when you stare at them`
          },
          {
            headline: `Why faint stars can vanish when you stare at them`,
            text: `For very dim objects, rod cells away from the center of the retina can be more sensitive than the cone-rich center. Looking slightly to the side can place a faint star on more sensitive night-vision cells. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why water towers are so tall`
          }
        ]
      },
      {
        theme: `Small-Town Secrets Hiding in Plain Sight`,
        days: [
          {
            headline: `Why water towers are so tall`,
            text: `Height creates water pressure through gravity. A raised tank stores water and keeps pressure available even when pumps are not matching moment-to-moment demand, giving a town both storage and a pressure buffer. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why grain elevators grew beside railroads`
          },
          {
            headline: `Why grain elevators grew beside railroads`,
            text: `Elevators let farmers bring grain to a central place where it could be stored, graded, and loaded efficiently into railcars. Rail lines and grain handling reinforced each other, shaping the skylines of farming towns. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why so many towns have a Main Street`
          },
          {
            headline: `Why so many towns have a Main Street`,
            text: `Main Street often grew along the most important commercial route—near a railroad depot, river crossing, courthouse, or major road. Businesses clustered where people already passed, turning one street into the town’s shared front door. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why courthouse squares shaped towns`
          },
          {
            headline: `Why courthouse squares shaped towns`,
            text: `In many county seats, planners placed the courthouse on a central square and arranged streets and businesses around it. Government business brought regular traffic, making the square both civic center and commercial anchor. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: The faded advertisements called ghost signs`
          },
          {
            headline: `The faded advertisements called ghost signs`,
            text: `Old brick buildings often carry hand-painted advertisements from businesses or products long gone. Paint weathers while later buildings may shield parts of it, leaving “ghost signs” that act like accidental history exhibits. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why town names were once painted on roofs`
          },
          {
            headline: `Why town names were once painted on roofs`,
            text: `In the early days of aviation, pilots had few electronic navigation aids. Communities and organizations painted town names on roofs or other large surfaces so pilots could identify where they were from the air. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: How railroad tracks decided where towns grew`
          },
          {
            headline: `How railroad tracks decided where towns grew`,
            text: `Railroads needed stations, water stops, freight points, and places to load farm products. Businesses and residents clustered around those stops, while communities bypassed by a line could lose traffic and growth. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why sleep paralysis feels so strange`
          }
        ]
      },
      {
        theme: `What Happens While You Sleep?`,
        days: [
          {
            headline: `Why sleep paralysis feels so strange`,
            text: `During REM sleep, the brain normally suppresses most skeletal-muscle movement. In sleep paralysis, awareness returns before that REM muscle inhibition has fully ended, leaving a person briefly awake but unable to move; dreamlike hallucinations can accompany it. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why you sometimes jerk awake while falling asleep`
          },
          {
            headline: `Why you sometimes jerk awake while falling asleep`,
            text: `A hypnic jerk is a sudden muscle contraction during the transition into sleep. It is common and usually harmless. Stress, caffeine, or sleep deprivation may make the jolts more noticeable. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why dreams disappear so quickly`
          },
          {
            headline: `Why dreams disappear so quickly`,
            text: `Dream memories are often fragile because the brain state during sleep differs from ordinary waking memory formation. Unless you wake and rehearse the dream, new thoughts and sensory input can quickly overwrite access to it. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why body temperature falls at night`
          },
          {
            headline: `Why body temperature falls at night`,
            text: `The body’s circadian system helps lower core temperature in the evening, partly by increasing blood flow near the skin so heat can escape. The drop is linked with the biological preparation for sleep. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why your muscles go quiet during REM sleep`
          },
          {
            headline: `Why your muscles go quiet during REM sleep`,
            text: `During REM sleep, brainstem circuits strongly reduce signals to many skeletal muscles. This atonia helps keep most dream movements from being acted out, while breathing and eye muscles continue working. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Why some people talk in their sleep`
          },
          {
            headline: `Why some people talk in their sleep`,
            text: `Sleep talking can occur during different sleep stages when parts of speech and motor systems become active without full waking. The words may be clear or nonsense, and the sleeper usually has no memory of speaking. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why morning light helps set your body clock`
          },
          {
            headline: `Why morning light helps set your body clock`,
            text: `Special light-sensitive cells in the eyes send timing information to the brain’s circadian clock. Bright morning light tends to anchor the daily cycle and helps coordinate sleepiness, alertness, hormones, and body temperature. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Why paper cuts hurt so much`
          }
        ]
      },
      {
        theme: `The Secret Life of Paper`,
        days: [
          {
            headline: `Why paper cuts hurt so much`,
            text: `Paper cuts often hit fingertips, which are packed with nerve endings. The shallow slice can leave those nerves exposed and repeatedly disturbed by movement, while the cut may be too shallow to bleed enough to quickly cover the area. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why cardboard has a wavy middle`
          },
          {
            headline: `Why cardboard has a wavy middle`,
            text: `Corrugated cardboard sandwiches a fluted paper layer between flat liners. The waves create thickness and resist bending and crushing while using far less material than a solid slab of the same thickness. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Why receipts fade`
          },
          {
            headline: `Why receipts fade`,
            text: `Many receipts use thermal paper coated with chemicals that darken when heated. Over time, heat, light, oils, and friction can alter the coating, causing printed areas to fade or the background to darken. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why newspapers turn yellow`
          },
          {
            headline: `Why newspapers turn yellow`,
            text: `Paper made with lignin-rich wood pulp slowly reacts with oxygen and light. Chemical changes create compounds that absorb blue light, so the paper shifts toward yellow and brown as it ages. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why toilet paper breaks down faster than paper towels`
          },
          {
            headline: `Why toilet paper breaks down faster than paper towels`,
            text: `Toilet paper is engineered with shorter, more weakly bonded fibers so it loses strength quickly in water. Paper towels are designed to stay together while wet, which is useful for cleaning but bad for plumbing. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why money feels different from printer paper`
          },
          {
            headline: `Why money feels different from printer paper`,
            text: `U.S. paper currency is made from a cotton-and-linen blend rather than ordinary wood-pulp paper. The fibers, printing, and embedded security features give bills their distinctive feel and durability. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why folding paper makes a sharp crease`
          },
          {
            headline: `Why folding paper makes a sharp crease`,
            text: `Bending paper far enough permanently deforms and breaks some of the fiber structure along a narrow line. Once that hinge-like zone forms, the sheet prefers to bend there again. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: How monarchs reach Mexico without a map`
          }
        ]
      },
      {
        theme: `Amazing Animal Navigation`,
        days: [
          {
            headline: `How monarchs reach Mexico without a map`,
            text: `Monarch butterflies use a time-compensated Sun compass and other environmental cues during migration. The individuals flying south have never made the trip before, so the route is an inherited navigation program rather than a remembered family road trip. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: How sea turtles return toward their birth beaches`
          },
          {
            headline: `How sea turtles return toward their birth beaches`,
            text: `Sea turtles can detect features of Earth’s magnetic field and use them as navigation cues. Evidence suggests young turtles imprint on a regional magnetic signature that later helps guide adults back toward the area where they hatched. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: How homing pigeons find home`
          },
          {
            headline: `How homing pigeons find home`,
            text: `Pigeons combine several cues, including the Sun, Earth’s magnetic field, visual landmarks, and likely odors. No single compass explains every part of their ability; navigation changes as birds learn their home region. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: How salmon find their home streams`
          },
          {
            headline: `How salmon find their home streams`,
            text: `Young salmon learn the chemical signature of their home water. Years later, adults use ocean-scale navigation cues and then an extraordinary sense of smell to locate the river and stream where they began life. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: How dung beetles navigate by the Milky Way`
          },
          {
            headline: `How dung beetles navigate by the Milky Way`,
            text: `Experiments with nocturnal dung beetles showed that the broad band of the Milky Way can help them roll dung balls in a straight direction. They are not reading constellations like sailors; they use the bright pattern as a celestial orientation cue. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: How birds sense Earth’s magnetic field`
          },
          {
            headline: `How birds sense Earth’s magnetic field`,
            text: `Many migratory birds can detect Earth’s magnetic field. Evidence points to light-dependent chemical reactions in proteins called cryptochromes in the eye as part of one magnetic compass, though researchers continue investigating the full mechanism. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: How bees give directions by dancing`
          },
          {
            headline: `How bees give directions by dancing`,
            text: `A honeybee returning from food can perform a waggle dance. The angle of the waggle run encodes direction relative to the Sun, while duration helps indicate distance, allowing nestmates to fly toward a food source they have never visited. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why keyboards use QWERTY`
          }
        ]
      },
      {
        theme: `Who Decided THAT Was Standard?`,
        days: [
          {
            headline: `Why keyboards use QWERTY`,
            text: `QWERTY developed for nineteenth-century typewriters. Its exact design history is more complicated than the popular claim that it was simply meant to slow typists; letter-pair mechanics, telegraph use, and manufacturer choices all played roles. Standardization then made the layout hard to displace. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why a minute has 60 seconds`
          },
          {
            headline: `Why a minute has 60 seconds`,
            text: `Base-60 counting has ancient roots in Mesopotamia. Greek astronomers later used sexagesimal fractions, and those conventions flowed into timekeeping. Sixty is also convenient because it divides evenly by many small numbers. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why a day has 24 hours`
          },
          {
            headline: `Why a day has 24 hours`,
            text: `Ancient Egyptians divided daylight and nighttime into sets of hours, and later astronomy helped standardize 24 equal hours. The number is historical convention rather than a natural label written into the sky. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why the week has seven days`
          },
          {
            headline: `Why the week has seven days`,
            text: `Seven-day cycles have ancient Near Eastern roots and became tied to religious traditions and the seven classical “planets” visible to ancient observers: Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why traffic lights use red yellow and green`
          },
          {
            headline: `Why traffic lights use red yellow and green`,
            text: `Railroad signals helped establish color conventions before road traffic lights. Red was already associated with danger and stopping; green became go, and yellow provided a highly visible warning between the two states. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why much of the world uses A4 paper`
          },
          {
            headline: `Why much of the world uses A4 paper`,
            text: `The ISO A-series uses a rectangle whose sides have a ratio of 1 to the square root of 2. Cut an A4 sheet in half and the smaller sheets keep the same proportions, making scaling and copying convenient. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why railroad tracks are a standard width`
          },
          {
            headline: `Why railroad tracks are a standard width`,
            text: `Standard gauge is 4 feet 8½ inches between rails and became dominant through British railway practice and later international adoption. Competing gauges existed and still do; economics and network compatibility pushed many systems toward common standards. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why pineapple can make your mouth tingle`
          }
        ]
      },
      {
        theme: `Food Tricks Explained`,
        days: [
          {
            headline: `Why pineapple can make your mouth tingle`,
            text: `Pineapple contains bromelain, a group of enzymes that break proteins into smaller pieces. Fresh pineapple can irritate the mouth partly because those enzymes are active while you chew; heat used in canning largely disables them. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why mint feels cold`
          },
          {
            headline: `Why mint feels cold`,
            text: `Menthol activates TRPM8 receptors in sensory nerves—the same receptors that respond to cool temperatures. Your mouth can therefore send a “cold” signal even though the mint has not actually lowered tissue temperature much. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Why chili peppers feel hot`
          },
          {
            headline: `Why chili peppers feel hot`,
            text: `Capsaicin activates TRPV1 receptors that normally respond to damaging heat and other irritation. Your mouth is not being burned by temperature; the chemical is pressing part of the nervous system’s heat-alarm button. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why sour candy makes you pucker`
          },
          {
            headline: `Why sour candy makes you pucker`,
            text: `Acids release hydrogen ions that activate sour-sensing pathways. Strong sourness also triggers saliva and protective reflexes, producing the puckered face that seems almost impossible to suppress. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why cilantro tastes like soap to some people`
          },
          {
            headline: `Why cilantro tastes like soap to some people`,
            text: `Genetic differences in odor receptors can make some people especially sensitive to aldehydes in cilantro—compounds that can also appear in soaps and other scents. Experience and culture matter too, so genes influence the reaction without completely deciding it. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why asparagus changes some people’s urine smell`
          },
          {
            headline: `Why asparagus changes some people’s urine smell`,
            text: `Digestion of asparagus produces volatile sulfur-containing compounds that can create a distinctive odor. People differ both in how strongly they produce the odor and in their genetic ability to smell some of those compounds. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why orange juice tastes awful after toothpaste`
          },
          {
            headline: `Why orange juice tastes awful after toothpaste`,
            text: `Sodium lauryl sulfate in many toothpastes suppresses sweet taste and can make bitter flavors stand out more. Orange juice then seems less sweet and much harsher until the mouth’s normal taste balance returns. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: How earthworms reshape soil`
          }
        ]
      },
      {
        theme: `The World Under Your Feet`,
        days: [
          {
            headline: `How earthworms reshape soil`,
            text: `Earthworms swallow soil and organic material, mix layers, create burrows, and leave nutrient-rich casts. Their tunnels change aeration and water movement. Effects vary by ecosystem—some northern forests evolved without native earthworms and can be harmed by introduced species. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: What lives in a handful of healthy soil`
          },
          {
            headline: `What lives in a handful of healthy soil`,
            text: `Soil can contain bacteria, fungi, protozoa, nematodes, tiny arthropods, roots, minerals, air, and water all at once. A handful is less like inert dirt than a crowded habitat and chemical factory. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: How ant colonies build underground cities`
          },
          {
            headline: `How ant colonies build underground cities`,
            text: `Ant nests can contain branching tunnels, nurseries, food areas, waste zones, and chambers placed at different depths. Workers build without a central architect, responding to local cues and one another’s activity. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why prairie roots can reach astonishing depths`
          },
          {
            headline: `Why prairie roots can reach astonishing depths`,
            text: `Prairie grasses and wildflowers invest heavily underground. Deep, dense roots help plants reach water, survive fire and grazing, hold soil, and store carbon. Much of a prairie’s living structure is hidden below the surface. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Do underground rivers really exist?`
          },
          {
            headline: `Do underground rivers really exist?`,
            text: `True underground streams and rivers form especially well in soluble rocks such as limestone, where groundwater enlarges cracks into caves. In many other places, groundwater moves slowly through pores and fractures rather than through giant open tunnels. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: How tree roots lift pavement`
          },
          {
            headline: `How tree roots lift pavement`,
            text: `Roots usually do not seek out concrete to attack it. They grow where water, oxygen, and space are available. As roots thicken beneath an already cracked or shallow pavement, their growth can push slabs upward. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: How moles move dirt without burying themselves`
          },
          {
            headline: `How moles move dirt without burying themselves`,
            text: `Moles use powerful front limbs to loosen soil and push it aside or upward into molehills. Their cylindrical bodies and backward-angled fur help them move through tight tunnels without snagging. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: How dandelion seeds stay aloft`
          }
        ]
      },
      {
        theme: `Things That Fly Without Wings`,
        days: [
          {
            headline: `How dandelion seeds stay aloft`,
            text: `The dandelion’s parachute is a ring of fine hairs called a pappus. Air flowing through and around it creates a stable swirling vortex that helps the seed descend slowly and travel on light winds. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why maple seeds helicopter`
          },
          {
            headline: `Why maple seeds helicopter`,
            text: `A maple samara has an off-center wing. As it falls, air makes the seed autorotate, generating lift and slowing the descent. Extra time in the air gives wind more opportunity to carry it away from the parent tree. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: How spiders fly on silk`
          },
          {
            headline: `How spiders fly on silk`,
            text: `Small spiders can release silk threads that catch moving air and electrical forces in the atmosphere, lifting them into a behavior called ballooning. Some travel remarkable distances without wings. What looks like a tiny quirk is really the visible end of a much bigger process. Once the reason is clear, the everyday version becomes its own little experiment you can recognize anywhere. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: How snakes glide without wings`
          },
          {
            headline: `How snakes glide without wings`,
            text: `Flying snakes launch from branches, flatten their bodies into a curved cross-section, and undulate in the air. Their shape generates aerodynamic forces that let them glide toward another tree rather than simply fall. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why tumbleweeds tumble`
          },
          {
            headline: `Why tumbleweeds tumble`,
            text: `In several tumbleweed plants, the mature aboveground body breaks away from its roots. Wind rolls the dry plant across open ground, shaking seeds loose over a wide area as it travels. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: How volcanic ash crosses oceans`
          },
          {
            headline: `How volcanic ash crosses oceans`,
            text: `Explosive eruptions can inject tiny ash particles high into the atmosphere. Strong winds can carry the finest particles hundreds or thousands of miles, affecting aviation and producing distant hazy skies. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: How Saharan dust reaches the Americas`
          },
          {
            headline: `How Saharan dust reaches the Americas`,
            text: `Winds lift enormous amounts of fine mineral dust from North Africa and carry it west across the Atlantic. The dust can reach the Caribbean and Americas, influencing air quality and delivering minerals to ecosystems. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why stop signs have eight sides`
          }
        ]
      },
      {
        theme: `The Hidden Job of Ordinary Shapes`,
        days: [
          {
            headline: `Why stop signs have eight sides`,
            text: `The octagon makes a stop sign recognizable by shape even when the face is hard to read or seen from the back. Standardized shapes let drivers identify important signs quickly before reading every word. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why yield signs are triangles`
          },
          {
            headline: `Why yield signs are triangles`,
            text: `An inverted triangle is rare among road signs, giving yield signs a distinctive silhouette. Like the stop-sign octagon, the unique shape adds a second recognition cue beyond color and text. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why honeycomb uses hexagons`
          },
          {
            headline: `Why honeycomb uses hexagons`,
            text: `Equal hexagons tile a surface with no gaps while sharing walls efficiently. Bees begin with wax cells that can be somewhat rounded, but heat and construction forces help produce the familiar hexagonal pattern. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why eggs are shaped like eggs`
          },
          {
            headline: `Why eggs are shaped like eggs`,
            text: `Bird egg shapes vary widely. Curvature helps a shell resist loads, while shape is influenced by reproductive anatomy and evolutionary history. The popular claim that pointed eggs universally stop cliff birds from rolling away is too simple. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why many pencils are hexagonal`
          },
          {
            headline: `Why many pencils are hexagonal`,
            text: `Flat sides keep a pencil from rolling off a desk and give fingers edges to grip. Hexagonal pencils also pack efficiently and can be cut from wood slats with relatively little waste. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why free bubbles become spheres`
          },
          {
            headline: `Why free bubbles become spheres`,
            text: `Surface tension tries to minimize the area of a soap film. For a given volume, a sphere has the smallest possible surface area, so an isolated bubble naturally pulls itself toward that shape. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why stackable chips use a saddle shape`
          },
          {
            headline: `Why stackable chips use a saddle shape`,
            text: `Uniform molded potato crisps use a curved saddle-like geometry that adds stiffness and lets pieces nest efficiently in a can. The shape is formally related to a hyperbolic paraboloid. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: What “zero” means to a bee`
          }
        ]
      },
      {
        theme: `Wait—Animals Can Do Math?`,
        days: [
          {
            headline: `What “zero” means to a bee`,
            text: `Experiments show honeybees can learn that an empty set is less than sets containing one or more items, a behavior researchers describe as a zero-like numerical concept. That does not mean a bee does written arithmetic. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: How crows keep track of numbers`
          },
          {
            headline: `How crows keep track of numbers`,
            text: `Crows and related birds can distinguish quantities and perform trained number tasks. Some experiments show neurons responding selectively to different numerosities, suggesting the brain can represent “how many” without spoken number words. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Can dogs notice when one treat becomes two?`
          },
          {
            headline: `Can dogs notice when one treat becomes two?`,
            text: `Dogs can distinguish some quantity differences, especially when choices are simple or food is involved. Their performance is not human arithmetic, but it shows that judging “more versus less” is useful far beyond our species. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: How fish compare groups`
          },
          {
            headline: `How fish compare groups`,
            text: `Many fish can choose between groups based on number, which can help them join larger shoals or find more food. Accuracy usually drops as quantities become closer together. What looks like a tiny quirk is really the visible end of a much bigger process. Once the reason is clear, the everyday version becomes its own little experiment you can recognize anywhere. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: The parrot that learned number concepts`
          },
          {
            headline: `The parrot that learned number concepts`,
            text: `African grey parrot Alex, studied by Irene Pepperberg, learned spoken labels for quantities and could answer some number questions. His performance helped show that a bird brain can learn abstract concepts through intensive social training. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: How monkeys compare quantities`
          },
          {
            headline: `How monkeys compare quantities`,
            text: `Monkeys can rapidly judge which of two groups contains more items and can be trained on numerical tasks. Their errors often follow ratio patterns similar to approximate number judgments in humans. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why baby chicks may map numbers in space`
          },
          {
            headline: `Why baby chicks may map numbers in space`,
            text: `Some experiments suggest newly hatched chicks associate smaller quantities with one side of space and larger quantities with the other under specific conditions. Researchers debate how broadly this maps onto the human “mental number line.” The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: The tiny world of microbes`
          }
        ]
      },
      {
        theme: `Things We Discovered by Looking Closer`,
        days: [
          {
            headline: `The tiny world of microbes`,
            text: `Microscopes revealed bacteria, protozoa, and other organisms too small for unaided eyes. Antonie van Leeuwenhoek’s seventeenth-century observations of “animalcules” opened a living world humans had shared forever without knowing it existed. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why every fingerprint is so detailed`
          },
          {
            headline: `Why every fingerprint is so detailed`,
            text: `Friction ridges form before birth as skin grows under a mixture of genetic instructions and tiny developmental forces. Even identical twins develop different ridge details, making fingerprints highly individual. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: The hidden symmetry of snow crystals`
          },
          {
            headline: `The hidden symmetry of snow crystals`,
            text: `A snow crystal’s sixfold symmetry comes from the hexagonal arrangement of water molecules in ice. Temperature and humidity change as the crystal falls, producing branches and plates while preserving the underlying six-part structure. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: What pollen looks like under a microscope`
          },
          {
            headline: `What pollen looks like under a microscope`,
            text: `Pollen grains come in remarkable shapes with spikes, pores, grooves, and patterned walls. The tough outer coating protects the plant’s male reproductive cells and can be distinctive enough to help identify plant groups. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: How compound eyes are built`
          },
          {
            headline: `How compound eyes are built`,
            text: `An insect compound eye contains many repeating visual units called ommatidia. Each samples a small part of the scene. Together they provide wide fields of view and excellent motion detection, though not the same detailed image a human eye forms. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: The tiny hooks on a cat’s tongue`
          },
          {
            headline: `The tiny hooks on a cat’s tongue`,
            text: `A cat’s tongue is covered with backward-facing keratin spines called papillae. Many are hollow-tipped and help move saliva deep into fur during grooming while also scraping meat from surfaces. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: How microscopic structures create shimmering color`
          },
          {
            headline: `How microscopic structures create shimmering color`,
            text: `Some butterfly wings, beetle shells, and bird feathers get brilliant color not mainly from pigments but from microscopic structures that interfere with light. Change the viewing angle and the reflected wavelengths change, creating iridescence. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work.`,
            teaser: `Tomorrow: Why pipes bang`
          }
        ]
      },
      {
        theme: `Why Does My House Do That?`,
        days: [
          {
            headline: `Why pipes bang`,
            text: `A sudden valve closure can stop moving water quickly, creating a pressure wave called water hammer. The wave travels through plumbing and can make pipes jump or bang against supports. What looks like a tiny quirk is really the visible end of a much bigger process. Once the reason is clear, the everyday version becomes its own little experiment you can recognize anywhere. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why floorboards creak`
          },
          {
            headline: `Why floorboards creak`,
            text: `Wood changes slightly with humidity and load. As boards, nails, joists, or subfloor pieces rub and then slip against one another, the sudden motion creates squeaks and creaks. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why windows rattle in wind`
          },
          {
            headline: `Why windows rattle in wind`,
            text: `Wind creates changing pressure on a window. If glass, sash, trim, or hardware has a little play, those pressure changes can make parts vibrate against one another. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why doors stick in humid weather`
          },
          {
            headline: `Why doors stick in humid weather`,
            text: `Wood absorbs moisture from humid air and swells across the grain. A door that fit perfectly in dry weather can become just wide enough to rub the frame during a damp season. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why doorknobs can zap you in winter`
          },
          {
            headline: `Why doorknobs can zap you in winter`,
            text: `Walking across carpet can transfer electric charge between materials. Dry winter air lets charge remain on your body more easily. Touching a conductor such as a metal doorknob gives the charge a sudden path to equalize, creating a tiny spark. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why dust gathers under furniture`
          },
          {
            headline: `Why dust gathers under furniture`,
            text: `Air currents carry dust until particles settle. Under furniture there is less foot traffic to stir them back up, while airflow around edges can deliver lint, fibers, skin flakes, and other particles into sheltered zones. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: What causes that first furnace smell of the season`
          },
          {
            headline: `What causes that first furnace smell of the season`,
            text: `Dust can settle on heat exchangers and other warm surfaces during months of disuse. When the furnace starts, that dust heats and produces a temporary burnt-dust odor. Persistent or electrical smells are a different matter and deserve attention. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: Birds that sleep while flying`
          }
        ]
      },
      {
        theme: `The Weird Ways Animals Sleep`,
        days: [
          {
            headline: `Birds that sleep while flying`,
            text: `Great frigatebirds have been recorded sleeping briefly during long flights, sometimes with one brain hemisphere showing sleep-like activity. They sleep far less in the air than on land, showing that flight and sleep can overlap without becoming effortless. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Why sea otters raft together while resting`
          },
          {
            headline: `Why sea otters raft together while resting`,
            text: `Sea otters often gather in floating groups called rafts. They may hold paws or wrap themselves in kelp, which helps keep individuals from drifting apart while they rest on moving water. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: How horses can doze standing up`
          },
          {
            headline: `How horses can doze standing up`,
            text: `A horse’s stay apparatus lets ligaments and tendons stabilize parts of the legs with relatively little muscular effort. Horses can doze standing, though they still need to lie down for enough REM sleep. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why giraffes sleep so little`
          },
          {
            headline: `Why giraffes sleep so little`,
            text: `Wild giraffes often sleep in short bouts and spend relatively little total time asleep compared with many mammals. Remaining alert matters when lying down and getting back up makes such a tall animal vulnerable. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: Why bats hang upside down`
          },
          {
            headline: `Why bats hang upside down`,
            text: `Many bats can lock their toes around a perch using body weight and tendon mechanics, so hanging requires little effort. Dropping from a high perch also gives them room to open their wings and begin flying. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: Why sperm whales sometimes sleep upright`
          },
          {
            headline: `Why sperm whales sometimes sleep upright`,
            text: `Sperm whales have been observed resting nearly vertical near the surface in groups. Studies suggest these quiet drifting periods are sleep, creating the surreal sight of giant whales standing like pillars underwater. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: How walruses rest in the water`
          },
          {
            headline: `How walruses rest in the water`,
            text: `Walruses can sleep floating, resting on ice, or on land. Inflatable throat pouches in males can help provide buoyancy, and walruses may alternate active periods with very long rests. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why @ has so many names`
          }
        ]
      },
      {
        theme: `Where Did That Symbol Come From?`,
        days: [
          {
            headline: `Why @ has so many names`,
            text: `The @ symbol existed in commerce before email, often meaning “at the rate of.” Ray Tomlinson chose it for network email addresses in 1971 because it was uncommon in names and neatly meant user “at” host computer. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: How & became one symbol`
          },
          {
            headline: `How & became one symbol`,
            text: `The ampersand grew from a handwritten ligature joining the Latin letters e and t in “et,” meaning “and.” Centuries of fast writing turned two letters into the looping symbol we recognize today. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: How # became hashtag`
          },
          {
            headline: `How # became hashtag`,
            text: `The # symbol had older uses including number sign and pound sign. On social media, users began placing it before words to label and group conversations; Twitter’s adoption made “hashtag” a global term. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Who designed the peace symbol`
          },
          {
            headline: `Who designed the peace symbol`,
            text: `Gerald Holtom designed the nuclear-disarmament symbol in Britain in 1958. Its lines combine semaphore positions for the letters N and D inside a circle, though Holtom also described personal symbolism in the figure. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why the power button is a broken circle`
          },
          {
            headline: `Why the power button is a broken circle`,
            text: `The common power symbol combines the binary-style symbols 1 and 0, historically used to indicate on and off. The vertical line entering a broken circle became a compact international control icon. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: How the recycling symbol was created`
          },
          {
            headline: `How the recycling symbol was created`,
            text: `Gary Anderson, a college student, designed the three chasing arrows for a 1970 contest connected with recycled paperboard. The loop suggests a continuing cycle of collection, processing, and reuse. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why a heart shape looks nothing like a real heart`
          },
          {
            headline: `Why a heart shape looks nothing like a real heart`,
            text: `The familiar heart symbol developed gradually in art and manuscripts and was associated with love long before modern anatomy was understood. No single origin story is proven; its power comes from centuries of cultural repetition. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why Roman concrete can last so long`
          }
        ]
      },
      {
        theme: `Ingenious Ideas Before Electricity`,
        days: [
          {
            headline: `Why Roman concrete can last so long`,
            text: `Some Roman marine concrete used volcanic ash and lime in mixtures that reacted with seawater and formed durable minerals over time. Not every Roman structure is indestructible, but certain recipes behaved very differently from modern Portland-cement concrete. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: How aqueducts moved water without pumps`
          },
          {
            headline: `How aqueducts moved water without pumps`,
            text: `Roman aqueducts used carefully surveyed gentle slopes so gravity kept water moving. Bridges are the dramatic parts, but much of an aqueduct could run underground or along terrain with only a small drop over long distances. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: How ancient ice houses made summer cold possible`
          },
          {
            headline: `How ancient ice houses made summer cold possible`,
            text: `People in several ancient cultures stored winter ice or used evaporative and nighttime cooling in insulated structures. Thick walls, shade, drainage, and underground spaces slowed heat from reaching stored ice. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: How windmills turned wind into work`
          },
          {
            headline: `How windmills turned wind into work`,
            text: `Wind pushing blades creates rotation that can be transferred through shafts and gears. Long before electrical turbines, windmills used that motion to grind grain, pump water, and power machinery. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: How water wheels powered machines`
          },
          {
            headline: `How water wheels powered machines`,
            text: `Flowing or falling water pushes paddles or buckets on a wheel. The rotating shaft can drive millstones, hammers, saws, and other machinery, turning a river’s continuous motion into mechanical work. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: How mechanical clocks kept time`
          },
          {
            headline: `How mechanical clocks kept time`,
            text: `Early mechanical clocks used an escapement that releases a gear train in controlled steps instead of letting a weight unwind all at once. Later pendulums made the timing far more regular. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: How Romans heated floors from below`
          },
          {
            headline: `How Romans heated floors from below`,
            text: `In a hypocaust system, a raised floor stood on small supports while hot air from a furnace moved through the space underneath and sometimes through wall flues. The room was heated without a modern radiator. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: How beavers engineer wetlands`
          }
        ]
      },
      {
        theme: `Animals That Build`,
        days: [
          {
            headline: `How beavers engineer wetlands`,
            text: `Beavers pile branches, mud, and vegetation across flowing water. Their dams slow streams, raise water levels, and can create ponds and wetlands that change habitat for many other species. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: How weaverbirds knot nests`
          },
          {
            headline: `How weaverbirds knot nests`,
            text: `Weaverbirds use grass strips and plant fibers, looping and weaving them around branches and one another. Some species build remarkably complex hanging nests using only beak and feet. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why spider webs do not simply fall apart`
          },
          {
            headline: `Why spider webs do not simply fall apart`,
            text: `Orb webs combine different silks: strong frame and radial lines carry loads, while capture spirals can stretch and absorb energy. Damage often stays local because the network distributes forces through many paths. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: The pufferfish that draws giant sand circles`
          },
          {
            headline: `The pufferfish that draws giant sand circles`,
            text: `Male white-spotted pufferfish build large geometric circles on the seafloor by swimming and shaping sand into ridges. Females inspect the structures, which are part of courtship and also influence where eggs are laid. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: How prairie dogs build towns`
          },
          {
            headline: `How prairie dogs build towns`,
            text: `Prairie dog colonies can contain extensive burrow networks with multiple entrances and chambers. The mounds improve visibility and airflow, while social groups occupy neighboring territories within the larger colony. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why bowerbirds decorate`
          },
          {
            headline: `Why bowerbirds decorate`,
            text: `Male bowerbirds build and decorate display structures called bowers with colorful objects. Females inspect the construction and displays when choosing mates. The bower is a stage, not usually the nest where chicks are raised. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: How leafcutter ants farm fungus`
          },
          {
            headline: `How leafcutter ants farm fungus`,
            text: `Leafcutter ants do not mainly eat the leaves they carry. Workers cut vegetation to feed a cultivated fungus inside the nest, then eat specialized fungal growth. The colony weeds, fertilizes, and protects its underground crop. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: How pumping your legs makes a swing go higher`
          }
        ]
      },
      {
        theme: `The Science of Fun`,
        days: [
          {
            headline: `How pumping your legs makes a swing go higher`,
            text: `By changing body position at the right points in the swing cycle, you shift your center of mass and add energy to the motion. Good timing makes each pass slightly larger without anyone pushing from behind. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why roller-coaster cars stay on the track`
          },
          {
            headline: `Why roller-coaster cars stay on the track`,
            text: `Modern coaster wheel assemblies often grip the rail from above, below, and the side. Up-stop wheels help prevent the car from lifting away from the track during hills and inversions. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why a flying disc stays in the air`
          },
          {
            headline: `Why a flying disc stays in the air`,
            text: `A spinning disc meets the air at an angle and creates lift while its rotation provides gyroscopic stability. Without enough spin, small tilts grow quickly and the disc tumbles. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why a spinning top resists falling`
          },
          {
            headline: `Why a spinning top resists falling`,
            text: `A spinning top has angular momentum. Gravity still creates a torque, but instead of simply tipping over, the top’s axis often moves around in a slower motion called precession. Friction eventually drains energy and the top falls. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: How a yo-yo comes back`
          },
          {
            headline: `How a yo-yo comes back`,
            text: `A yo-yo descends as its string unwinds, converting gravitational energy into rotation. With the right axle and string setup, a tug changes the forces so the string winds back around the axle and lifts the yo-yo. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Why a hula hoop stays up`
          },
          {
            headline: `Why a hula hoop stays up`,
            text: `Your hips do not simply spin in a circle with the hoop. Timed forward-back or side-to-side pushes add energy whenever the hoop contacts your body, replacing energy lost to gravity and friction. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look.`,
            teaser: `Tomorrow: Why trampolines throw you upward`
          },
          {
            headline: `Why trampolines throw you upward`,
            text: `A trampoline mat and its springs stretch as you land, storing elastic energy. As they return toward their original shape, they push you upward. Your muscles can add even more energy by timing your body movements. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: How ancient Greeks estimated Earth’s size`
          }
        ]
      },
      {
        theme: `How Did People Figure THAT Out?`,
        days: [
          {
            headline: `How ancient Greeks estimated Earth’s size`,
            text: `Eratosthenes compared the Sun’s angle at two Egyptian cities around the summer solstice and combined the angle difference with the distance between them. From a pair of shadows, he produced a remarkably good estimate of Earth’s circumference. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: How sailors finally solved longitude`
          },
          {
            headline: `How sailors finally solved longitude`,
            text: `Latitude can be estimated from the sky, but longitude requires knowing the time difference between a reference location and local solar time. Accurate marine chronometers made it possible for ships to carry reference time across oceans. It is the kind of detail that can hide in plain sight for years. Once you know what is happening, the next ordinary encounter becomes a tiny demonstration of science or history instead of background scenery. The surprising part is not that the effect is rare—it is that we see versions of it all the time without asking what is doing the work. Knowing the reason makes an ordinary moment much more interesting.`,
            teaser: `Tomorrow: How doctors learned germs spread disease`
          },
          {
            headline: `How doctors learned germs spread disease`,
            text: `Evidence accumulated through many discoveries: Semmelweis linked handwashing with fewer childbed-fever deaths, Pasteur demonstrated microbial processes, and Koch connected particular microbes with particular diseases. Germ theory emerged from converging experiments, not one sudden revelation. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: How scientists learned Earth is ancient`
          },
          {
            headline: `How scientists learned Earth is ancient`,
            text: `Geology showed layers, erosion, and fossils requiring immense time. Radioactivity later provided clocks inside minerals: known decay rates let scientists date ancient rocks and meteorites, establishing an Earth about 4.54 billion years old. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: How people measured the speed of light`
          },
          {
            headline: `How people measured the speed of light`,
            text: `Ole Rømer noticed that eclipses of Jupiter’s moon Io appeared early or late depending on Earth’s changing distance from Jupiter. He realized light took time to cross the extra distance, providing the first quantitative evidence that light has a finite speed. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: How fingerprints became identification tools`
          },
          {
            headline: `How fingerprints became identification tools`,
            text: `Nineteenth-century researchers and police systems showed that ridge patterns are highly individual and persist through life. Classification systems made prints searchable, turning a biological detail into a practical identification method. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting. It is a reminder that useful design and natural behavior often look obvious only after we understand them. Before that, the clue can sit in front of us for years without attracting a second thought. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time.`,
            teaser: `Tomorrow: How scientists discovered continents move`
          },
          {
            headline: `How scientists discovered continents move`,
            text: `Alfred Wegener assembled evidence that continents fit together and shared fossils and geology, but he lacked a convincing mechanism. Decades later, seafloor mapping, magnetic stripes, and plate tectonics supplied the moving machinery his idea needed. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again.`,
            teaser: `Tomorrow: How tardigrades survive extreme drying`
          }
        ]
      },
      {
        theme: `Nature’s Best Survival Tricks`,
        days: [
          {
            headline: `How tardigrades survive extreme drying`,
            text: `Some tardigrades enter a dried, contracted state called a tun. Metabolism falls dramatically, and protective molecules help stabilize cells. In that state certain species can survive conditions that would quickly kill them while active. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: How camels conserve water`
          },
          {
            headline: `How camels conserve water`,
            text: `Camels tolerate large changes in body temperature, produce concentrated urine and dry feces, and have blood cells adapted to dehydration. Their humps store fat, not water; that fat is an energy reserve. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple. That gap between what we see and what is really happening is exactly where everyday curiosity gets interesting.`,
            teaser: `Tomorrow: Fish with natural antifreeze`
          },
          {
            headline: `Fish with natural antifreeze`,
            text: `Some polar fish make antifreeze proteins or glycoproteins that bind to tiny ice crystals and inhibit their growth. This lets body fluids remain liquid in seawater cold enough to freeze ordinary fish blood. Nothing about the everyday object announces all of that hidden work. That is what makes it such a good curiosity: a familiar sight turns out to have a much better story underneath it. You do not need a laboratory to spot the result; it is sitting in the ordinary world. The science or history is hidden, but once explained, the familiar thing suddenly becomes worth a second look.`,
            teaser: `Tomorrow: Beetles that drink fog`
          },
          {
            headline: `Beetles that drink fog`,
            text: `Some desert beetles collect tiny droplets from fog on their bodies and let water run toward the mouth. The exact surface mechanisms vary by species and are more complex than the famous simple “bumps collect water” story. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Plants that seem to come back from the dead`
          },
          {
            headline: `Plants that seem to come back from the dead`,
            text: `Resurrection plants can dry until they look dead, then resume normal activity after water returns. They protect membranes and proteins with sugars, antioxidants, and tightly controlled shutdown processes. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why Arctic foxes change coats`
          },
          {
            headline: `Why Arctic foxes change coats`,
            text: `Many Arctic foxes grow thick white winter fur and a thinner brown or gray summer coat. Seasonal daylight and hormones trigger molting, matching insulation and camouflage to a landscape that changes dramatically. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: How mangroves deal with salt`
          },
          {
            headline: `How mangroves deal with salt`,
            text: `Mangrove species use several strategies: roots can exclude much of the salt entering with water, leaves may excrete salt through glands, and plants can store salt in tissues that are later shed. That small detail is easy to ignore until somebody asks the right question. After that, it becomes one of those facts you may notice every time the same everyday situation appears again. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Do mirrors really reverse left and right?`
          }
        ]
      },
      {
        theme: `Seven Questions You Never Thought to Ask`,
        days: [
          {
            headline: `Do mirrors really reverse left and right?`,
            text: `A mirror reverses the direction perpendicular to its surface: front and back. It does not selectively swap left and right. We imagine turning ourselves around to face the reflected person, and that mental rotation creates the familiar left-right impression. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why doesn’t glue stick inside the bottle?`
          },
          {
            headline: `Why doesn’t glue stick inside the bottle?`,
            text: `Many glues need something from the environment before they set—water evaporating, moisture entering, or two components mixing. A closed bottle limits that trigger, so the adhesive can remain liquid until exposed during use. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why can you see the Moon in daytime?`
          },
          {
            headline: `Why can you see the Moon in daytime?`,
            text: `The Moon reflects sunlight and is above the horizon during daylight for roughly half of each month’s cycle. When its position and brightness beat the blue sky’s glare, it is perfectly visible before sunset or after sunrise. The effect feels simple because it is familiar, not because the explanation is simple.`,
            teaser: `Tomorrow: Why does a shower curtain move inward?`
          },
          {
            headline: `Why does a shower curtain move inward?`,
            text: `Moving warm air, spray-driven airflow, and pressure differences inside a shower can pull a light curtain inward. The exact airflow is complicated, but the curtain is responding to moving air—not being mysteriously attracted to water. The next time you see it, there is a little more to notice than there was before. An ordinary object or event has been quietly carrying that story the whole time. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why does a straw look bent in water?`
          },
          {
            headline: `Why does a straw look bent in water?`,
            text: `Light changes speed and direction when it passes between water and air. Rays from the submerged part of the straw are refracted before reaching your eyes, so that part appears shifted from its true position. That is a lot of hidden engineering, biology, or history packed into something most people barely notice. The familiar world gets stranger—in a good way—the closer you look. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why does a spoon reflection flip your face?`
          },
          {
            headline: `Why does a spoon reflection flip your face?`,
            text: `The inside of a spoon is a concave mirror. When your face is farther away than the mirror’s focal distance, reflected rays cross before reaching your eyes, forming an upside-down real image. Move close enough and the image becomes upright and magnified. That is a lot of hidden engineering, biology, or history packed into something most people barely notice.`,
            teaser: `Tomorrow: Why can you hear surf before you can see the ocean`
          },
          {
            headline: `Why can you hear surf before you can see the ocean`,
            text: `Sound can bend around obstacles and travel through openings more easily than visible light, which mostly travels in straight lines. Hills, dunes, or buildings may block your view while the low roar of many breaking waves still reaches you. What looks like a tiny quirk is really the visible end of a much bigger process.`,
            teaser: `Tomorrow: Why Does Popcorn Explode?`
          }
        ]
      },

];
// Daily Crumbs — 365 Word of the Day library
// Paste this block into content/daily-content.js just above module.exports.

const wordOfTheDay = [
  {
    word: "Bumfuzzle",
    pronunciation: "bum-FUZZ-ul",
    partOfSpeech: "verb",
    definition: "To confuse or bewilder.",
    example: "The self-checkout machine bumfuzzled Gary so thoroughly that he somehow paid twice and still forgot the bananas."
  },
  {
    word: "Callipygian",
    pronunciation: "kal-uh-PIJ-ee-un",
    partOfSpeech: "adjective",
    definition: "Having well-shaped or attractive buttocks.",
    example: "Calling the statue callipygian was technically accurate, though it did make the museum tour suddenly more interesting."
  },
  {
    word: "Fudgel",
    pronunciation: "FUJ-ul",
    partOfSpeech: "verb",
    definition: "To pretend to be working when you are actually doing nothing.",
    example: "Maya fudged—no, fudgelled—through the meeting by staring intensely at a spreadsheet she had not changed since Tuesday."
  },
  {
    word: "Groak",
    pronunciation: "GROHK",
    partOfSpeech: "verb",
    definition: "To stare silently at someone who is eating in hopes of being offered some.",
    example: "The dog groaked at my sandwich until guilt became the most expensive condiment on the table."
  },
  {
    word: "Apricity",
    pronunciation: "uh-PRIS-ih-tee",
    partOfSpeech: "noun",
    definition: "The warmth of the sun in winter.",
    example: "We enjoyed the apricity on the porch until the wind reminded us that winter still held the deed."
  },
  {
    word: "Quockerwodger",
    pronunciation: "KWOK-er-wod-jer",
    partOfSpeech: "noun",
    definition: "A wooden puppet; figuratively, a person controlled by another.",
    example: "After agreeing to curtains, throw pillows, and a decorative ladder with no purpose, Ben suspected he had become a quockerwodger."
  },
  {
    word: "Nudiustertian",
    pronunciation: "noo-dee-us-TER-shun",
    partOfSpeech: "adjective",
    definition: "Relating to the day before yesterday.",
    example: "My nudiustertian promise to start exercising has already been replaced by today's promise to start Monday."
  },
  {
    word: "Agelast",
    pronunciation: "AJ-uh-last",
    partOfSpeech: "noun",
    definition: "A person who never laughs.",
    example: "Our new manager may be an agelast; even the printer jamming during the efficiency seminar got nothing."
  },
  {
    word: "Biblioklept",
    pronunciation: "BIB-lee-oh-klept",
    partOfSpeech: "noun",
    definition: "A person who steals books.",
    example: "I stopped lending novels to Trevor after realizing the alleged slow reader was actually a biblioklept."
  },
  {
    word: "Crapulous",
    pronunciation: "KRAP-yuh-lus",
    partOfSpeech: "adjective",
    definition: "Feeling ill from excessive eating or drinking.",
    example: "After the buffet, I felt so crapulous that even the dessert menu seemed judgmental."
  },
  {
    word: "Amphigory",
    pronunciation: "AM-fi-gor-ee",
    partOfSpeech: "noun",
    definition: "A piece of writing or verse that is intentionally nonsensical.",
    example: "The birthday card's amphigory mentioned a moonlit turnip, three accountants, and absolutely nothing about my birthday."
  },
  {
    word: "Erinaceous",
    pronunciation: "er-ih-NAY-shus",
    partOfSpeech: "adjective",
    definition: "Relating to or resembling a hedgehog.",
    example: "My erinaceous hairstyle suggested I had either discovered a new hair product or slept through three alarms."
  },
  {
    word: "Formication",
    pronunciation: "for-mih-KAY-shun",
    partOfSpeech: "noun",
    definition: "A sensation like insects crawling on or under the skin.",
    example: "My foot woke from being asleep with enough formication to convince me it had secretly joined an ant colony."
  },
  {
    word: "Festinate",
    pronunciation: "FES-tih-nayt",
    partOfSpeech: "verb",
    definition: "To hurry or hasten.",
    example: "We had to festinate toward the gate after Dad announced that airport arrival times were merely suggestions."
  },
  {
    word: "Hircine",
    pronunciation: "HER-sine",
    partOfSpeech: "adjective",
    definition: "Goatlike, especially in smell or appearance.",
    example: "After three days of camping without a shower, our group had developed a distinctly hircine atmosphere."
  },
  {
    word: "Impignorate",
    pronunciation: "im-PIG-nuh-rayt",
    partOfSpeech: "verb",
    definition: "To pawn or pledge something as security.",
    example: "I nearly had to impignorate my toaster after seeing what the mechanic charged for a ten-minute repair."
  },
  {
    word: "Jentacular",
    pronunciation: "jen-TAK-yuh-ler",
    partOfSpeech: "adjective",
    definition: "Relating to breakfast or something eaten immediately after waking.",
    example: "My jentacular ambitions involved eggs and toast; my alarm clock reduced them to a granola bar in traffic."
  },
  {
    word: "Gardyloo",
    pronunciation: "gar-dee-LOO",
    partOfSpeech: "interjection",
    definition: "A warning cry once shouted before dirty water was thrown from an upper window.",
    example: "The historical guide yelled 'Gardyloo!' before describing the old custom, and everyone instinctively stepped away from the building."
  },
  {
    word: "Kench",
    pronunciation: "KENCH",
    partOfSpeech: "verb",
    definition: "To laugh loudly.",
    example: "Aunt Rita kenched so loudly at the wedding toast that the microphone briefly seemed unnecessary."
  },
  {
    word: "Mumpsimus",
    pronunciation: "MUMP-sih-mus",
    partOfSpeech: "noun",
    definition: "A stubborn attachment to an error or old habit despite correction.",
    example: "Grandpa's insistence that every remote control needed a firm slap was pure mumpsimus, but somehow it kept working."
  },
  {
    word: "Noctivagant",
    pronunciation: "nok-TIV-uh-gunt",
    partOfSpeech: "adjective",
    definition: "Wandering or active at night.",
    example: "My noctivagant teenager appeared in the kitchen at 2 a.m. looking for cereal and answers about the Wi-Fi."
  },
  {
    word: "Opsimath",
    pronunciation: "OP-sih-math",
    partOfSpeech: "noun",
    definition: "A person who begins learning or studying late in life.",
    example: "At seventy-two, June became an opsimath and learned guitar, mostly to annoy the neighbors with better technique."
  },
  {
    word: "Latibulate",
    pronunciation: "lah-TIB-yuh-layt",
    partOfSpeech: "verb",
    definition: "To hide oneself away, especially in a corner or secluded place.",
    example: "I latibulated behind the garage until the neighbor stopped looking for volunteers to help move a piano."
  },
  {
    word: "Quidnunc",
    pronunciation: "KWID-nunk",
    partOfSpeech: "noun",
    definition: "A person who is constantly curious about gossip or other people's affairs.",
    example: "Our office quidnunc knew about the engagement before the couple had finished deciding whether they were engaged."
  },
  {
    word: "Runcation",
    pronunciation: "run-KAY-shun",
    partOfSpeech: "noun",
    definition: "The act of weeding or clearing unwanted growth.",
    example: "My Saturday runcation lasted ten minutes before I decided the weeds deserved a chance to express themselves."
  },
  {
    word: "Sialoquent",
    pronunciation: "sy-AL-oh-kwent",
    partOfSpeech: "adjective",
    definition: "Spraying saliva while speaking.",
    example: "The front row learned quickly that the passionate lecturer was also remarkably sialoquent."
  },
  {
    word: "Tittynope",
    pronunciation: "TIT-ee-nohp",
    partOfSpeech: "noun",
    definition: "A small leftover amount of food or drink.",
    example: "There was one tittynope of coffee left in the pot, just enough to start an office feud."
  },
  {
    word: "Ultracrepidarian",
    pronunciation: "ul-truh-krep-ih-DAIR-ee-un",
    partOfSpeech: "noun",
    definition: "A person who gives opinions beyond their knowledge or expertise.",
    example: "Every family has an ultracrepidarian who can fix your taxes, diagnose your car, and coach the national team from the couch."
  },
  {
    word: "Velleity",
    pronunciation: "veh-LEE-ih-tee",
    partOfSpeech: "noun",
    definition: "A weak wish or inclination not strong enough to lead to action.",
    example: "My desire to organize the garage remains a velleity that grows strongest while I am nowhere near the garage."
  },
  {
    word: "Wamble",
    pronunciation: "WOM-bul",
    partOfSpeech: "verb",
    definition: "To feel nauseated or have the stomach churn.",
    example: "My stomach began to wamble when the roller coaster operator said, 'We think we fixed it.'"
  },
  {
    word: "Xertz",
    pronunciation: "ZERTS",
    partOfSpeech: "verb",
    definition: "To gulp something down quickly or greedily.",
    example: "I xertzed my coffee so fast that my tongue filed a formal complaint."
  },
  {
    word: "Yex",
    pronunciation: "YEKS",
    partOfSpeech: "verb",
    definition: "To hiccup or belch.",
    example: "I tried to give a dignified toast at the wedding but yexed halfway through the bride's name."
  },
  {
    word: "Zugzwang",
    pronunciation: "TSOOK-tsvahng",
    partOfSpeech: "noun",
    definition: "A situation in which every possible move makes matters worse.",
    example: "Choosing which child gets the last cookie is parental zugzwang with chocolate chips."
  },
  {
    word: "Abibliophobia",
    pronunciation: "ay-bib-lee-oh-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "The fear of running out of things to read.",
    example: "My abibliophobia explains why I packed six books for a two-day trip and only one pair of socks."
  },
  {
    word: "Accismus",
    pronunciation: "ak-SIZ-mus",
    partOfSpeech: "noun",
    definition: "Pretended indifference to something one actually wants.",
    example: "Her 'Oh, I don't need the last brownie' was pure accismus, and everyone at the table knew it."
  },
  {
    word: "Acnestis",
    pronunciation: "ak-NEE-stis",
    partOfSpeech: "noun",
    definition: "The part of the back between the shoulder blades and lower back that is hard to scratch.",
    example: "The acnestis is nature's way of making you appreciate doorframes."
  },
  {
    word: "Adoxography",
    pronunciation: "ad-ok-SOG-ruh-fee",
    partOfSpeech: "noun",
    definition: "Fine writing about a trivial or insignificant subject.",
    example: "My three-paragraph review of the office stapler was an impressive piece of adoxography."
  },
  {
    word: "Ambisinister",
    pronunciation: "am-bih-SIN-ih-ster",
    partOfSpeech: "adjective",
    definition: "Clumsy or awkward with both hands.",
    example: "I am ambisinister enough to drop the jar with my left hand and fail to catch it with my right."
  },
  {
    word: "Anatidaephobia",
    pronunciation: "an-uh-TID-ee-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "A humorous supposed fear that a duck is watching you.",
    example: "My anatidaephobia seemed silly until I noticed the same mallard outside three different coffee shops."
  },
  {
    word: "Anecdoche",
    pronunciation: "AN-ek-dohk",
    partOfSpeech: "noun",
    definition: "A conversation in which everyone talks but nobody listens.",
    example: "Thanksgiving dinner became an anecdoche the moment three people started explaining the same recipe at once."
  },
  {
    word: "Anopisthograph",
    pronunciation: "an-oh-PIS-thuh-graf",
    partOfSpeech: "noun",
    definition: "A manuscript or document written on only one side of the page.",
    example: "The printer produced an anopisthograph, which is a scholarly way of saying it ignored my duplex setting."
  },
  {
    word: "Antimacassar",
    pronunciation: "an-tih-muh-KAS-er",
    partOfSpeech: "noun",
    definition: "A protective cloth placed over the back or arms of a chair.",
    example: "Grandma's antimacassar protected the recliner from everything except Grandpa's salsa."
  },
  {
    word: "Apodyopsis",
    pronunciation: "ap-oh-dee-OP-sis",
    partOfSpeech: "noun",
    definition: "The act of mentally undressing someone.",
    example: "His attempt at subtle apodyopsis failed when he walked directly into a coat rack."
  },
  {
    word: "Batrachomyomachy",
    pronunciation: "bat-rak-oh-my-OM-uh-kee",
    partOfSpeech: "noun",
    definition: "A petty or trivial quarrel.",
    example: "The office batrachomyomachy over the thermostat ended only when someone hid the controls."
  },
  {
    word: "Borborygmus",
    pronunciation: "bor-buh-RIG-mus",
    partOfSpeech: "noun",
    definition: "A rumbling or gurgling noise made by the stomach or intestines.",
    example: "My borborygmus answered the lunch invitation before I could."
  },
  {
    word: "Brannigan",
    pronunciation: "BRAN-ih-gun",
    partOfSpeech: "noun",
    definition: "A noisy quarrel or brawl.",
    example: "A brannigan nearly erupted when the board-game rules were interpreted by someone who had clearly never read them."
  },
  {
    word: "Brontide",
    pronunciation: "BRON-tyde",
    partOfSpeech: "noun",
    definition: "A low rumbling sound like distant thunder.",
    example: "The mysterious brontide turned out not to be a storm but Uncle Ray asleep in the recliner."
  },
  {
    word: "Cachinnate",
    pronunciation: "KAK-ih-nayt",
    partOfSpeech: "verb",
    definition: "To laugh loudly or immoderately.",
    example: "She cachinnated so hard at the typo that the meeting had to pause for recovery."
  },
  {
    word: "Macilent",
    pronunciation: "MASS-ih-lent",
    partOfSpeech: "adjective",
    definition: "Very thin or lean.",
    example: "After shedding its winter fluff, the dog looked so macilent that we wondered whether half of him had been fur."
  },
  {
    word: "Chrestomathy",
    pronunciation: "kres-TOM-uh-thee",
    partOfSpeech: "noun",
    definition: "A collection of selected literary passages, often for learning a language.",
    example: "My bathroom magazine rack has accidentally become a chrestomathy of recipes, travel tips, and articles from 2019."
  },
  {
    word: "Clinomania",
    pronunciation: "kly-noh-MAY-nee-uh",
    partOfSpeech: "noun",
    definition: "An excessive desire to stay in bed.",
    example: "Monday triggered such clinomania that my alarm clock began to feel like a personal enemy."
  },
  {
    word: "Cockalorum",
    pronunciation: "kok-uh-LOR-um",
    partOfSpeech: "noun",
    definition: "A boastful, self-important little person.",
    example: "The new committee cockalorum introduced himself by listing achievements nobody had asked about."
  },
  {
    word: "Collywobbles",
    pronunciation: "KOL-ee-wob-ulz",
    partOfSpeech: "noun",
    definition: "Stomach pain or nervous butterflies.",
    example: "I got the collywobbles when the dentist said, 'Well, that's interesting.'"
  },
  {
    word: "Contumelious",
    pronunciation: "kon-too-MEE-lee-us",
    partOfSpeech: "adjective",
    definition: "Scornfully insulting or humiliating.",
    example: "The cat gave me a contumelious stare after I served the wrong flavor of food."
  },
  {
    word: "Curglaff",
    pronunciation: "KER-glaff",
    partOfSpeech: "noun",
    definition: "The shock felt when plunging into cold water.",
    example: "My cheerful cannonball became a curglaff followed by several words unsuitable for the family pool."
  },
  {
    word: "Dactylion",
    pronunciation: "dak-TIL-ee-on",
    partOfSpeech: "noun",
    definition: "The tip of the middle finger.",
    example: "I injured my dactylion opening a cereal box, which was not the heroic story I had hoped to tell."
  },
  {
    word: "Deipnosophist",
    pronunciation: "dype-NOS-uh-fist",
    partOfSpeech: "noun",
    definition: "A person skilled at dinner-table conversation.",
    example: "Our deipnosophist kept dinner lively until dessert, when everyone discovered he had also eaten the last slice of pie."
  },
  {
    word: "Doodle-sack",
    pronunciation: "DOO-dul-sak",
    partOfSpeech: "noun",
    definition: "An old informal name for the bagpipes.",
    example: "The neighbor practiced his doodle-sack at sunrise, ensuring the entire block became culturally enriched at once."
  },
  {
    word: "Dysania",
    pronunciation: "dih-SAY-nee-uh",
    partOfSpeech: "noun",
    definition: "Extreme difficulty getting out of bed in the morning.",
    example: "My dysania vanished instantly when I remembered it was Saturday."
  },
  {
    word: "Eccedentesiast",
    pronunciation: "ek-see-den-TEE-zee-ast",
    partOfSpeech: "noun",
    definition: "A person who hides pain or unhappiness behind a smile.",
    example: "The party clown was an eccedentesiast, smiling bravely while a toddler repeatedly kicked his shin."
  },
  {
    word: "Embrangle",
    pronunciation: "em-BRANG-gul",
    partOfSpeech: "verb",
    definition: "To confuse, entangle, or involve in difficulty.",
    example: "The new password rules embrangled me until my login looked like a ransom note."
  },
  {
    word: "Epibreren",
    pronunciation: "ep-ih-BREE-ren",
    partOfSpeech: "noun",
    definition: "A person who borrows an umbrella and fails to return it.",
    example: "The office epibreren has six umbrellas by his desk and somehow claims to own none of them."
  },
  {
    word: "Eructation",
    pronunciation: "ee-ruk-TAY-shun",
    partOfSpeech: "noun",
    definition: "A belch.",
    example: "His eructation arrived precisely during the moment of silence, demonstrating impeccable comic timing."
  },
  {
    word: "Exsibilation",
    pronunciation: "ek-sib-ih-LAY-shun",
    partOfSpeech: "noun",
    definition: "The act of hissing someone off a stage or showing disapproval by hissing.",
    example: "The magician's failed rabbit trick nearly earned an exsibilation from a surprisingly demanding birthday crowd."
  },
  {
    word: "Fard",
    pronunciation: "FARD",
    partOfSpeech: "verb",
    definition: "To apply cosmetics to the face.",
    example: "I watched my sister fard with professional precision while I still couldn't apply sunscreen without missing an ear."
  },
  {
    word: "Finifugal",
    pronunciation: "fy-NIF-yuh-gul",
    partOfSpeech: "adjective",
    definition: "Avoiding or disliking endings or finishing things.",
    example: "My finifugal approach to home improvement has produced seven projects that are each ninety-eight percent done."
  },
  {
    word: "Fletcherism",
    pronunciation: "FLETCH-er-iz-um",
    partOfSpeech: "noun",
    definition: "The practice of chewing food extremely thoroughly before swallowing.",
    example: "Dad's brief experiment with Fletcherism turned a sandwich into a forty-minute commitment."
  },
  {
    word: "Fribbler",
    pronunciation: "FRIB-ler",
    partOfSpeech: "noun",
    definition: "A frivolous or trifling person, especially one who avoids commitment.",
    example: "The fribbler dated three people, joined four gyms, and still couldn't decide on a pizza topping."
  },
  {
    word: "Fustilarian",
    pronunciation: "fus-tih-LAIR-ee-un",
    partOfSpeech: "noun",
    definition: "A low, slovenly, or contemptible person.",
    example: "After leaving his cart sideways across two parking spaces, the fustilarian strolled away without a backward glance."
  },
  {
    word: "Gabelle",
    pronunciation: "guh-BEL",
    partOfSpeech: "noun",
    definition: "A tax, especially the historic French tax on salt.",
    example: "When the movie theater charged extra for seasoning, I accused them of reviving the gabelle."
  },
  {
    word: "Gallimaufry",
    pronunciation: "gal-ih-MAW-free",
    partOfSpeech: "noun",
    definition: "A confused mixture or jumble of things.",
    example: "The junk drawer is a gallimaufry of batteries, coupons, mystery keys, and one tiny screwdriver nobody remembers buying."
  },
  {
    word: "Gongoozler",
    pronunciation: "gon-GOOZ-ler",
    partOfSpeech: "noun",
    definition: "A person who idly watches activity, especially on canals or waterways.",
    example: "I became a construction-site gongoozler, contributing nothing except occasional nods of expertise."
  },
  {
    word: "Griffonage",
    pronunciation: "grif-uh-NAHZH",
    partOfSpeech: "noun",
    definition: "Illegible handwriting.",
    example: "The doctor's griffonage was so advanced that the pharmacist briefly considered calling an archaeologist."
  },
  {
    word: "Hapaxanthous",
    pronunciation: "hap-ak-SAN-thus",
    partOfSpeech: "adjective",
    definition: "Flowering only once before dying.",
    example: "My hapaxanthous houseplant finally bloomed, apparently as a dramatic farewell."
  },
  {
    word: "Hebetude",
    pronunciation: "HEB-ih-tood",
    partOfSpeech: "noun",
    definition: "Mental dullness or lethargy.",
    example: "The 3 p.m. meeting produced a collective hebetude broken only by the arrival of cookies."
  },
  {
    word: "Hobbledehoy",
    pronunciation: "HOB-ul-dee-hoy",
    partOfSpeech: "noun",
    definition: "An awkward or clumsy youth.",
    example: "At fourteen I was a hobbledehoy composed mostly of elbows, sneakers, and apologies."
  },
  {
    word: "Humdudgeon",
    pronunciation: "hum-DUJ-un",
    partOfSpeech: "noun",
    definition: "An imaginary illness or needless complaint.",
    example: "His mysterious Monday humdudgeon disappeared the instant someone mentioned free concert tickets."
  },
  {
    word: "Hurkle-durkle",
    pronunciation: "HER-kul-DER-kul",
    partOfSpeech: "verb",
    definition: "To lounge in bed long after it is time to get up.",
    example: "I planned to wake early, but hurkle-durkled until breakfast became lunch."
  },
  {
    word: "Illecebrous",
    pronunciation: "il-LESS-uh-brus",
    partOfSpeech: "adjective",
    definition: "Attractive, alluring, or enticing.",
    example: "The bakery window was so illecebrous that my diet quietly crossed the street without me."
  },
  {
    word: "Inaniloquent",
    pronunciation: "in-an-IL-oh-kwent",
    partOfSpeech: "adjective",
    definition: "Speaking foolishly or saying empty things.",
    example: "After ten minutes of inaniloquent small talk, we had discussed the weather from every possible angle."
  },
  {
    word: "Jargogle",
    pronunciation: "jar-GOG-ul",
    partOfSpeech: "verb",
    definition: "To confuse or jumble.",
    example: "Trying to assemble furniture from picture-only instructions jargoggled my brain and produced a suspiciously spare screw."
  },
  {
    word: "Kenspeckle",
    pronunciation: "KEN-spek-ul",
    partOfSpeech: "adjective",
    definition: "Easily recognizable or conspicuous.",
    example: "His neon hat made him kenspeckle enough to locate from three aisles away."
  },
  {
    word: "Lalochezia",
    pronunciation: "lal-oh-KEE-zee-uh",
    partOfSpeech: "noun",
    definition: "Emotional relief gained by using vulgar language.",
    example: "Stepping barefoot on a toy produced immediate lalochezia and a vocabulary lesson for the dog."
  },
  {
    word: "Lethologica",
    pronunciation: "leth-oh-LOJ-ih-kuh",
    partOfSpeech: "noun",
    definition: "The inability to remember the particular word you want.",
    example: "I suffered lethologica while trying to explain lethologica, which felt unnecessarily personal."
  },
  {
    word: "Logomisia",
    pronunciation: "log-oh-MIZ-ee-uh",
    partOfSpeech: "noun",
    definition: "A strong dislike of a particular word.",
    example: "Her logomisia for 'moist' was so intense that even the weather forecast became dangerous."
  },
  {
    word: "Meldrop",
    pronunciation: "MEL-drop",
    partOfSpeech: "noun",
    definition: "A drop of mucus hanging from the nose.",
    example: "The toddler's meldrop remained undefeated through three tissues and one family photograph."
  },
  {
    word: "Misodoctakleidist",
    pronunciation: "miz-oh-dok-tuh-KLY-dist",
    partOfSpeech: "noun",
    definition: "A person who hates practicing the piano.",
    example: "Our little misodoctakleidist discovered that scales become much more interesting when played with one finger and maximum force."
  },
  {
    word: "Mumpsimous",
    pronunciation: "MUMP-sih-mus",
    partOfSpeech: "adjective",
    definition: "Stubbornly adhering to an old error or custom.",
    example: "His mumpsimous refusal to use GPS meant every road trip included a scenic tour of somewhere unintended."
  },
  {
    word: "Nidorosity",
    pronunciation: "ny-dor-OSS-ih-tee",
    partOfSpeech: "noun",
    definition: "A smell resembling burned or overcooked animal food.",
    example: "The kitchen's nidorosity announced the forgotten burgers before the smoke alarm did."
  },
  {
    word: "Novercal",
    pronunciation: "noh-VER-kul",
    partOfSpeech: "adjective",
    definition: "Relating to or characteristic of a stepmother.",
    example: "The fairy tale's novercal villainy seemed unfair to every perfectly nice stepmother in the audience."
  },
  {
    word: "Obelus",
    pronunciation: "OB-uh-lus",
    partOfSpeech: "noun",
    definition: "A dagger-shaped mark used in writing or printing to indicate a doubtful passage.",
    example: "I wanted an obelus beside 'serves eight' because the casserole barely served four hungry adults."
  },
  {
    word: "Octothorpe",
    pronunciation: "OK-tuh-thorp",
    partOfSpeech: "noun",
    definition: "The symbol #, commonly called the hash or pound sign.",
    example: "Grandpa called the octothorpe a pound sign, my niece called it a hashtag, and dinner somehow became a generational summit."
  },
  {
    word: "Omphaloskepsis",
    pronunciation: "om-fuh-loh-SKEP-sis",
    partOfSpeech: "noun",
    definition: "Contemplation of one's navel; excessive self-absorption.",
    example: "His annual performance review became forty minutes of omphaloskepsis and two minutes of actual reviewing."
  },
  {
    word: "Overmorrow",
    pronunciation: "oh-ver-MOR-oh",
    partOfSpeech: "noun",
    definition: "The day after tomorrow.",
    example: "I'll clean the garage overmorrow, which sounds much more responsible than saying 'not today or tomorrow.'"
  },
  {
    word: "Pandiculation",
    pronunciation: "pan-dik-yuh-LAY-shun",
    partOfSpeech: "noun",
    definition: "The act of stretching and yawning, especially after waking.",
    example: "My morning pandiculation was so dramatic the cat assumed I was attempting yoga."
  },
  {
    word: "Perendinate",
    pronunciation: "puh-REN-dih-nayt",
    partOfSpeech: "verb",
    definition: "To postpone until the day after tomorrow.",
    example: "I perendinated the dentist appointment, proving procrastination once had a much classier vocabulary."
  },
  {
    word: "Philodox",
    pronunciation: "FIL-uh-doks",
    partOfSpeech: "noun",
    definition: "A person who loves their own opinions.",
    example: "The family philodox didn't need to win the argument; he merely needed everyone else to stop talking."
  },
  {
    word: "Pogonotrophy",
    pronunciation: "poh-guh-NOT-ruh-fee",
    partOfSpeech: "noun",
    definition: "The act or practice of growing a beard.",
    example: "His winter pogonotrophy began as insulation and ended with strangers asking if he played banjo."
  },
  {
    word: "Psithurism",
    pronunciation: "SITH-yuh-riz-um",
    partOfSpeech: "noun",
    definition: "The sound of wind rustling through leaves.",
    example: "I sat outside enjoying the psithurism until a leaf landed directly in my coffee."
  },
  {
    word: "Quomodocunquize",
    pronunciation: "kwoh-moh-doh-KUN-kwyze",
    partOfSpeech: "verb",
    definition: "To make money by any possible means.",
    example: "The kids quomodocunquized all summer, charging for lemonade, dog walking, and information about where Dad hid the snacks."
  },
  {
    word: "Rantallion",
    pronunciation: "ran-TAL-ee-un",
    partOfSpeech: "noun",
    definition: "A person whose scrotum hangs lower than the penis.",
    example: "The anatomy textbook used 'rantallion' clinically; the class of twelve-year-olds did not."
  },
  {
    word: "Resistentialism",
    pronunciation: "ree-zis-TEN-shul-iz-um",
    partOfSpeech: "noun",
    definition: "The humorous belief that inanimate objects are hostile to humans.",
    example: "After the printer jammed, the zipper broke, and the cart pulled left, resistentialism began to seem less like a joke."
  },
  {
    word: "Rhinotillexomania",
    pronunciation: "ry-noh-til-ek-soh-MAY-nee-uh",
    partOfSpeech: "noun",
    definition: "A compulsive habit of picking one's nose.",
    example: "The driver's rhinotillexomania became everybody's business at the red light."
  },
  {
    word: "Scurryfunge",
    pronunciation: "SKUR-ee-funj",
    partOfSpeech: "verb",
    definition: "To rush around cleaning when unexpected guests are about to arrive.",
    example: "We scurryfunged for twelve minutes and then told our guests the laundry mountain was an art installation."
  },
  {
    word: "Slubberdegullion",
    pronunciation: "slub-er-dee-GUL-yun",
    partOfSpeech: "noun",
    definition: "A dirty, slovenly, or worthless person.",
    example: "The slubberdegullion left nacho fingerprints on the remote and denied everything."
  },
  {
    word: "Snirtle",
    pronunciation: "SNER-tul",
    partOfSpeech: "verb",
    definition: "To suppress a laugh, especially by snorting.",
    example: "I snirtled during the serious presentation when the speaker's autocorrect changed 'public relations' to 'pubic relations.'"
  },
  {
    word: "Welkin",
    pronunciation: "WEL-kin",
    partOfSpeech: "noun",
    definition: "The sky or heavens.",
    example: "The fireworks lit the welkin while the dog filed a formal complaint from beneath the bed."
  },
  {
    word: "Spanghew",
    pronunciation: "SPANG-hyoo",
    partOfSpeech: "verb",
    definition: "To throw or cause something to leap violently into the air.",
    example: "The loose rake spanghewed the garden glove over the fence with surprising athleticism."
  },
  {
    word: "Tarantism",
    pronunciation: "TAR-un-tiz-um",
    partOfSpeech: "noun",
    definition: "An uncontrollable urge to dance, historically associated with a tarantula bite.",
    example: "The wedding DJ inspired enough tarantism that even Uncle Phil abandoned his chair."
  },
  {
    word: "Taradiddle",
    pronunciation: "tar-uh-DID-ul",
    partOfSpeech: "noun",
    definition: "A petty lie or pretentious bit of nonsense.",
    example: "His claim that the fish was 'at least four feet long' was a taradiddle unsupported by both physics and the photograph."
  },
  {
    word: "Uhtceare",
    pronunciation: "oot-KEE-ar-uh",
    partOfSpeech: "noun",
    definition: "Anxiety experienced before dawn when lying awake worrying.",
    example: "At 4:17 a.m., my uhtceare covered taxes, the roof, and whether penguins have knees."
  },
  {
    word: "Unasinous",
    pronunciation: "yoo-NAS-ih-nus",
    partOfSpeech: "adjective",
    definition: "Equally stupid or foolish.",
    example: "The two unasinous plans were to fix the leak with tape or simply move the bucket forever."
  },
  {
    word: "Vagitus",
    pronunciation: "vuh-JY-tus",
    partOfSpeech: "noun",
    definition: "The cry of a newborn baby.",
    example: "The baby's vagitus announced her arrival and immediately established who would be setting the household schedule."
  },
  {
    word: "Vellichor",
    pronunciation: "VEL-ih-kor",
    partOfSpeech: "noun",
    definition: "The wistful atmosphere or appeal of old bookshops.",
    example: "The vellichor of the used bookstore convinced me I needed three novels and apparently an atlas from 1987."
  },
  {
    word: "Widdiful",
    pronunciation: "WID-ih-ful",
    partOfSpeech: "adjective",
    definition: "Deserving to be hanged; wicked or troublesome.",
    example: "The squirrel's widdiful habit of emptying the bird feeder had turned Grandma into a surprisingly committed strategist."
  },
  {
    word: "Witzelsucht",
    pronunciation: "VIT-sel-zookt",
    partOfSpeech: "noun",
    definition: "A tendency to make excessive jokes or puns.",
    example: "Dad's witzelsucht reached critical levels when the electrician arrived and he asked whether business was 'shocking.'"
  },
  {
    word: "Yarborough",
    pronunciation: "YAR-bur-oh",
    partOfSpeech: "noun",
    definition: "A bridge hand containing no card higher than a nine.",
    example: "I was dealt a yarborough, which is card-game terminology for 'enjoy watching everyone else have fun.'"
  },
  {
    word: "Zenzizenzizenzic",
    pronunciation: "zen-zee-zen-zee-ZEN-zik",
    partOfSpeech: "noun",
    definition: "The eighth power of a number.",
    example: "I learned zenzizenzizenzic and immediately became overqualified for every calculation I planned to do that day."
  },
  {
    word: "Abderian",
    pronunciation: "ab-DEER-ee-un",
    partOfSpeech: "adjective",
    definition: "Given to excessive or foolish laughter.",
    example: "My abderian response to the squeaky chair ensured nobody heard the next five minutes of the lecture."
  },
  {
    word: "Abligurition",
    pronunciation: "ab-lig-yuh-RISH-un",
    partOfSpeech: "noun",
    definition: "Lavish spending on food and drink.",
    example: "Our vacation budget survived airfare but was destroyed by three days of abligurition."
  },
  {
    word: "Absquatulate",
    pronunciation: "ab-SKWAH-chuh-layt",
    partOfSpeech: "verb",
    definition: "To leave abruptly or make off with something.",
    example: "The dog absquatulated with my sandwich and has shown absolutely no remorse."
  },
  {
    word: "Adumbrate",
    pronunciation: "AD-um-brayt",
    partOfSpeech: "verb",
    definition: "To outline faintly or foreshadow.",
    example: "The empty coffee pot adumbrated a morning of poor decisions."
  },
  {
    word: "Alabandical",
    pronunciation: "al-uh-BAN-dih-kul",
    partOfSpeech: "adjective",
    definition: "Barbarous, stupefied, or silly.",
    example: "My alabandical attempt to repair the faucet involved a wrench, duct tape, and eventually a plumber."
  },
  {
    word: "Alektorophobia",
    pronunciation: "uh-lek-tor-oh-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "An intense fear of chickens.",
    example: "His alektorophobia made the petting zoo considerably more adventurous than advertised."
  },
  {
    word: "Allodoxaphobia",
    pronunciation: "al-oh-dok-suh-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "A fear of other people's opinions.",
    example: "Social media would be a difficult career choice for anyone with allodoxaphobia."
  },
  {
    word: "Amatorculist",
    pronunciation: "am-uh-TOR-kyuh-list",
    partOfSpeech: "noun",
    definition: "A petty or insignificant lover.",
    example: "The romance novel's supposed heartthrob turned out to be an amatorculist who texted 'u up?' at midnight."
  },
  {
    word: "Anacampserote",
    pronunciation: "an-uh-kamp-SER-oh-tee",
    partOfSpeech: "noun",
    definition: "Something believed to restore lost love.",
    example: "He treated homemade lasagna as an anacampserote, and frankly his chances improved."
  },
  {
    word: "Anhedonia",
    pronunciation: "an-hee-DOH-nee-uh",
    partOfSpeech: "noun",
    definition: "An inability to feel pleasure.",
    example: "The broken ice-cream machine produced a brief and very specific anhedonia in everyone who had already ordered cones."
  },
  {
    word: "Anserine",
    pronunciation: "AN-ser-ine",
    partOfSpeech: "adjective",
    definition: "Gooselike; also foolish or silly.",
    example: "His anserine strut across the icy parking lot ended exactly as the security camera predicted."
  },
  {
    word: "Antediluvian",
    pronunciation: "an-tee-dih-LOO-vee-un",
    partOfSpeech: "adjective",
    definition: "Extremely old-fashioned or ancient.",
    example: "The motel's antediluvian alarm clock had actual bells and enough volume to wake neighboring counties."
  },
  {
    word: "Apanthropy",
    pronunciation: "uh-PAN-thruh-pee",
    partOfSpeech: "noun",
    definition: "A desire to withdraw from people and society.",
    example: "After hosting twelve relatives for a weekend, I developed a powerful apanthropy and considered befriending a cave."
  },
  {
    word: "Apopemptic",
    pronunciation: "ap-oh-PEMP-tik",
    partOfSpeech: "adjective",
    definition: "Relating to departure or farewell.",
    example: "His apopemptic speech lasted so long that two people left before he finished saying goodbye."
  },
  {
    word: "Autolatry",
    pronunciation: "aw-TOL-uh-tree",
    partOfSpeech: "noun",
    definition: "Excessive admiration or worship of oneself.",
    example: "His autolatry was obvious from a photo gallery containing eighty-seven selfies and one picture of his dog."
  },
  {
    word: "Bafflegab",
    pronunciation: "BAF-ul-gab",
    partOfSpeech: "noun",
    definition: "Confusing or pretentious language, especially official jargon.",
    example: "The insurance letter contained enough bafflegab to make 'we need your signature' occupy three pages."
  },
  {
    word: "Bedizen",
    pronunciation: "bih-DY-zun",
    partOfSpeech: "verb",
    definition: "To dress or decorate in a gaudy manner.",
    example: "We bedizened the living room for the party until even the houseplants looked embarrassed."
  },
  {
    word: "Bescumber",
    pronunciation: "bih-SKUM-ber",
    partOfSpeech: "verb",
    definition: "To spray or soil with excrement.",
    example: "The pigeon bescumbered my freshly washed car with the confidence of a professional critic."
  },
  {
    word: "Blatteroon",
    pronunciation: "BLAT-er-oon",
    partOfSpeech: "noun",
    definition: "A person who talks constantly or foolishly.",
    example: "The airplane blatteroon explained cryptocurrency to a trapped audience from takeoff to landing."
  },
  {
    word: "Emacity",
    pronunciation: "ee-MASS-ih-tee",
    partOfSpeech: "noun",
    definition: "A fondness for buying things.",
    example: "My emacity is why I entered the store for toothpaste and left with a lamp, two mugs, and no toothpaste."
  },
  {
    word: "Boustrophedon",
    pronunciation: "boo-struh-FEE-don",
    partOfSpeech: "noun",
    definition: "Writing in alternating directions from line to line.",
    example: "My grocery list accidentally became boustrophedon after I turned the paper around halfway through."
  },
  {
    word: "Famble",
    pronunciation: "FAM-bul",
    partOfSpeech: "verb",
    definition: "To fumble or handle something clumsily.",
    example: "I fambled with the hotel key card until the person inside politely explained that my room was across the hall."
  },
  {
    word: "Brabble",
    pronunciation: "BRAB-ul",
    partOfSpeech: "verb",
    definition: "To argue noisily about something trivial.",
    example: "We brabbled for ten minutes over whose turn it was to choose a movie and then watched nothing."
  },
  {
    word: "Brobdingnagian",
    pronunciation: "brob-ding-NAG-ee-un",
    partOfSpeech: "adjective",
    definition: "Enormous; gigantic.",
    example: "The restaurant served a Brobdingnagian pancake that required both syrup and a zoning permit."
  },
  {
    word: "Cacoethes",
    pronunciation: "kak-oh-EE-theez",
    partOfSpeech: "noun",
    definition: "An irresistible urge or bad habit.",
    example: "My cacoethes for checking the fridge every twenty minutes has yet to make new food appear."
  },
  {
    word: "Cacography",
    pronunciation: "kuh-KOG-ruh-fee",
    partOfSpeech: "noun",
    definition: "Bad handwriting or poor spelling.",
    example: "My grocery-list cacography turned 'beans' into something that looked like 'bears,' which changed the shopping trip considerably."
  },
  {
    word: "Cacozelia",
    pronunciation: "kak-oh-ZEE-lee-uh",
    partOfSpeech: "noun",
    definition: "Bad style caused by strained attempts to sound impressive.",
    example: "His email's cacozelia transformed 'please call me' into a paragraph involving synergistic telephonic engagement."
  },
  {
    word: "Cavil",
    pronunciation: "KAV-ul",
    partOfSpeech: "verb",
    definition: "To make petty or unnecessary objections.",
    example: "She cavilled about the table settings until someone reminded her we were eating pizza from boxes."
  },
  {
    word: "Chirotonsor",
    pronunciation: "ky-roh-TON-ser",
    partOfSpeech: "noun",
    definition: "A barber or hairdresser.",
    example: "My chirotonsor asked whether I wanted 'something bold,' and I foolishly answered before asking what bold meant."
  },
  {
    word: "Circumbendibus",
    pronunciation: "ser-kum-BEN-dih-bus",
    partOfSpeech: "noun",
    definition: "A roundabout way of speaking or doing something.",
    example: "Dad's directions took a circumbendibus through three landmarks, a childhood memory, and a gas station that closed in 1996."
  },
  {
    word: "Cockaigne",
    pronunciation: "kok-AYN",
    partOfSpeech: "noun",
    definition: "An imaginary land of luxury, idleness, and plenty.",
    example: "To a teenager, Cockaigne is apparently a house with unlimited Wi-Fi and no chores."
  },
  {
    word: "Concupiscible",
    pronunciation: "kon-KYOO-pih-suh-bul",
    partOfSpeech: "adjective",
    definition: "Desirable or capable of arousing strong desire.",
    example: "The last doughnut became intensely concupiscible the moment someone else reached for it."
  },
  {
    word: "Confusticate",
    pronunciation: "kon-FUS-tih-kayt",
    partOfSpeech: "verb",
    definition: "To confuse, perplex, or bewilder.",
    example: "The new parking app confusticated me until paying a meter felt like applying for a mortgage."
  },
  {
    word: "Coprolalia",
    pronunciation: "kop-roh-LAY-lee-uh",
    partOfSpeech: "noun",
    definition: "Involuntary or excessive use of obscene language.",
    example: "The broken garbage disposal inspired a temporary bout of coprolalia from an otherwise mild-mannered uncle."
  },
  {
    word: "Corybantic",
    pronunciation: "kor-ih-BAN-tik",
    partOfSpeech: "adjective",
    definition: "Wild, frenzied, or ecstatic.",
    example: "The kids became corybantic when someone whispered that the hotel had a pool."
  },
  {
    word: "Crambazzled",
    pronunciation: "kram-BAZ-uld",
    partOfSpeech: "adjective",
    definition: "Prematurely aged or worn out, especially by excess.",
    example: "After assembling the trampoline without instructions, I felt thoroughly crambazzled and approximately ninety-three."
  },
  {
    word: "Crapehanger",
    pronunciation: "KRAYP-hang-er",
    partOfSpeech: "noun",
    definition: "A gloomy pessimist who expects the worst.",
    example: "Our resident crapehanger brought an umbrella to the picnic and a backup umbrella in case the first umbrella failed."
  },
  {
    word: "Dactylonomy",
    pronunciation: "dak-tih-LON-uh-mee",
    partOfSpeech: "noun",
    definition: "The practice of counting on one's fingers.",
    example: "My mental arithmetic became dactylonomy the instant someone asked me to split the restaurant bill six ways."
  },
  {
    word: "Dandiprat",
    pronunciation: "DAN-dee-prat",
    partOfSpeech: "noun",
    definition: "A small or insignificant person; a young urchin.",
    example: "The dandiprat marched into the kitchen demanding a second cookie as though negotiating an international treaty."
  },
  {
    word: "Deasil",
    pronunciation: "DEE-zul",
    partOfSpeech: "adverb",
    definition: "Clockwise; in the direction of the sun's apparent course.",
    example: "Turn the lid deasil, I said, instantly making opening a pickle jar sound like ancient magic."
  },
  {
    word: "Deliquesce",
    pronunciation: "del-ih-KWESS",
    partOfSpeech: "verb",
    definition: "To dissolve or melt away by absorbing moisture.",
    example: "The cotton candy deliquesced in the humidity before the child could finish deciding which side to bite."
  },
  {
    word: "Demonomania",
    pronunciation: "dee-muh-noh-MAY-nee-uh",
    partOfSpeech: "noun",
    definition: "A delusion of being possessed by evil spirits.",
    example: "Before blaming demonomania, we unplugged the talking toy and discovered its batteries were simply dying."
  },
  {
    word: "Dipsomania",
    pronunciation: "dip-soh-MAY-nee-uh",
    partOfSpeech: "noun",
    definition: "An uncontrollable craving for alcoholic drink.",
    example: "The old medical text called it dipsomania; the bartender simply called Tuesday 'two-for-one night.'"
  },
  {
    word: "Merrythought",
    pronunciation: "MER-ee-thawt",
    partOfSpeech: "noun",
    definition: "An old-fashioned name for a bird's wishbone.",
    example: "The children fought over the merrythought as if snapping a chicken bone were a legally binding path to wealth."
  },
  {
    word: "Dorp",
    pronunciation: "DORP",
    partOfSpeech: "noun",
    definition: "A small town or village.",
    example: "We stopped in a quiet dorp where the diner knew we were visitors before we had closed the car doors."
  },
  {
    word: "Dyslogia",
    pronunciation: "dis-LOH-jee-uh",
    partOfSpeech: "noun",
    definition: "An inability to express ideas clearly in speech.",
    example: "My dyslogia peaked when I tried to explain why I had put the milk in the cupboard."
  },
  {
    word: "Eellogofusciouhipoppokunurious",
    pronunciation: "ee-loh-goh-fus-see-oh-hy-pop-oh-kyoo-NOR-ee-us",
    partOfSpeech: "adjective",
    definition: "Very good or fine; an extravagant old slang term of praise.",
    example: "The pie was so eellogofusciouhipoppokunurious that nobody objected when I took a second piece for 'quality control.'"
  },
  {
    word: "Eleutheromania",
    pronunciation: "el-yoo-ther-oh-MAY-nee-uh",
    partOfSpeech: "noun",
    definition: "An intense desire for freedom.",
    example: "The toddler's eleutheromania became obvious the moment the stroller buckle clicked."
  },
  {
    word: "Expergefactor",
    pronunciation: "eks-PER-jee-fak-ter",
    partOfSpeech: "noun",
    definition: "Something that wakes a person up.",
    example: "The smoke alarm was an extremely effective expergefactor, though its customer-service skills were terrible."
  },
  {
    word: "Ergophobia",
    pronunciation: "er-goh-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "An abnormal fear or aversion to work.",
    example: "My sudden ergophobia every Friday afternoon has never been formally diagnosed."
  },
  {
    word: "Esurient",
    pronunciation: "ih-SOOR-ee-unt",
    partOfSpeech: "adjective",
    definition: "Hungry or greedy.",
    example: "The esurient teenager opened the refrigerator five minutes after eating dinner and asked when we were having dinner."
  },
  {
    word: "Exonumia",
    pronunciation: "ek-soh-NOO-mee-uh",
    partOfSpeech: "noun",
    definition: "Collectible objects resembling coins but not used as currency, such as tokens or medals.",
    example: "Grandpa's exonumia collection included arcade tokens from places that had closed before I was born."
  },
  {
    word: "Fanfaronade",
    pronunciation: "fan-fair-uh-NAYD",
    partOfSpeech: "noun",
    definition: "Boastful talk or swaggering behavior.",
    example: "His fanfaronade about grilling ended when he asked which side of the spatula to use."
  },
  {
    word: "Ferinous",
    pronunciation: "FER-ih-nus",
    partOfSpeech: "adjective",
    definition: "Wild or untamed; resembling a wild animal.",
    example: "After three hours at the indoor playground, the children's ferinous energy had spread to the adults."
  },
  {
    word: "Floccinaucinihilipilification",
    pronunciation: "flok-sih-naw-sih-ny-hil-ih-pil-ih-fih-KAY-shun",
    partOfSpeech: "noun",
    definition: "The act of judging something to be worthless.",
    example: "My floccinaucinihilipilification of the mystery cable lasted until I discovered it powered the router."
  },
  {
    word: "Foudroyant",
    pronunciation: "foo-DROY-unt",
    partOfSpeech: "adjective",
    definition: "Sudden and overwhelming in effect; striking like lightning.",
    example: "Her foudroyant glare ended the food fight before the mashed potato completed its flight."
  },
  {
    word: "Fremdschämen",
    pronunciation: "FREMT-shay-men",
    partOfSpeech: "noun",
    definition: "Embarrassment felt on behalf of someone else.",
    example: "I experienced intense Fremdschämen while Dad explained the internet to the internet technician."
  },
  {
    word: "Funambulist",
    pronunciation: "fyoo-NAM-byuh-list",
    partOfSpeech: "noun",
    definition: "A tightrope walker.",
    example: "Carrying three coffees across an icy sidewalk turned me into an unwilling funambulist."
  },
  {
    word: "Gadabout",
    pronunciation: "GAD-uh-bowt",
    partOfSpeech: "noun",
    definition: "A person who goes from place to place seeking amusement or social activity.",
    example: "Our retired neighbor became such a gadabout that his houseplants started leaving him voicemail."
  },
  {
    word: "Gargalesthesia",
    pronunciation: "gar-gal-es-THEE-zee-uh",
    partOfSpeech: "noun",
    definition: "The sensation of being tickled.",
    example: "The toddler's gargalesthesia was so intense that putting on socks became a contact sport."
  },
  {
    word: "Gelasin",
    pronunciation: "JEL-uh-sin",
    partOfSpeech: "noun",
    definition: "A dimple in the cheek that appears when smiling.",
    example: "His gelasin was charming enough to get him forgiven for eating the last cookie, but only once."
  },
  {
    word: "Glabella",
    pronunciation: "gluh-BEL-uh",
    partOfSpeech: "noun",
    definition: "The smooth area of forehead between the eyebrows.",
    example: "I bumped my glabella on the cabinet door and immediately learned both a new word and several old ones."
  },
  {
    word: "Gleek",
    pronunciation: "GLEEK",
    partOfSpeech: "verb",
    definition: "To squirt saliva from beneath the tongue.",
    example: "The seventh-grader discovered he could gleek and instantly became the least popular person at the lunch table."
  },
  {
    word: "Gnathonic",
    pronunciation: "nuh-THON-ik",
    partOfSpeech: "adjective",
    definition: "Fawning or excessively flattering.",
    example: "His gnathonic praise of the boss's tie ended shortly after he realized it belonged to the intern."
  },
  {
    word: "Grimalkin",
    pronunciation: "grih-MAWL-kin",
    partOfSpeech: "noun",
    definition: "An old female cat; sometimes any cat.",
    example: "The household grimalkin accepted our new sofa only after covering it with enough fur to claim ownership."
  },
  {
    word: "Hippopotomonstrosesquipedaliophobia",
    pronunciation: "hip-oh-pot-oh-mon-stroh-ses-kwip-uh-day-lee-oh-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "A humorous name for the fear of long words.",
    example: "Naming the fear of long words hippopotomonstrosesquipedaliophobia feels less like medicine and more like bullying."
  },
  {
    word: "Hodiernal",
    pronunciation: "hoh-dee-ER-nul",
    partOfSpeech: "adjective",
    definition: "Relating to the present day.",
    example: "My hodiernal goals are modest: answer the emails and avoid creating any new emergencies."
  },
  {
    word: "Hyemation",
    pronunciation: "hy-eh-MAY-shun",
    partOfSpeech: "noun",
    definition: "The act of passing the winter in a particular place; wintering.",
    example: "My preferred hyemation involves a blanket, a fireplace, and no reason whatsoever to scrape a windshield."
  },
  {
    word: "Ignivomous",
    pronunciation: "ig-NIV-uh-mus",
    partOfSpeech: "adjective",
    definition: "Vomiting or spewing fire.",
    example: "The ignivomous dragon looked impressive until someone pointed out the curtains were highly flammable."
  },
  {
    word: "Impecunious",
    pronunciation: "im-pih-KYOO-nee-us",
    partOfSpeech: "adjective",
    definition: "Having little or no money.",
    example: "I became temporarily impecunious after discovering that 'market price' is restaurant code for 'don't ask.'"
  },
  {
    word: "Infracaninophile",
    pronunciation: "in-fruh-kuh-NIN-oh-file",
    partOfSpeech: "noun",
    definition: "A person who supports the underdog.",
    example: "As a lifelong infracaninophile, I picked the last-place team and immediately regretted my principles."
  },
  {
    word: "Bellytimber",
    pronunciation: "BEL-ee-tim-ber",
    partOfSpeech: "noun",
    definition: "Food; provisions for the stomach.",
    example: "After six hours on the road, the family demanded bellytimber before anyone was willing to discuss another scenic overlook."
  },
  {
    word: "Jocoserious",
    pronunciation: "joh-koh-SEER-ee-us",
    partOfSpeech: "adjective",
    definition: "Combining joking and seriousness.",
    example: "His jocoserious warning—'touch my fries and update your will'—was delivered with unsettling eye contact."
  },
  {
    word: "Kakorrhaphiophobia",
    pronunciation: "kak-or-raf-ee-oh-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "An abnormal fear of failure or defeat.",
    example: "My kakorrhaphiophobia is why I only play board games against children who cannot yet read the rules."
  },
  {
    word: "Kummerspeck",
    pronunciation: "KOOM-er-shpek",
    partOfSpeech: "noun",
    definition: "Weight gained from emotional overeating; literally 'grief bacon.'",
    example: "After breakup week, my Kummerspeck could be traced directly to three pizzas and a family-size cheesecake."
  },
  {
    word: "Elucubrate",
    pronunciation: "ee-LOO-kyuh-brayt",
    partOfSpeech: "verb",
    definition: "To work out or compose something through careful study.",
    example: "I elucubrated a twelve-point vacation budget that collapsed the moment someone suggested ice cream."
  },
  {
    word: "Lanspresado",
    pronunciation: "lanz-pruh-SAH-doh",
    partOfSpeech: "noun",
    definition: "A person who arrives with little money and expects others to pay.",
    example: "Our lanspresado ordered appetizers for the table and then discovered, with theatrical surprise, that he had forgotten his wallet."
  },
  {
    word: "Leptosome",
    pronunciation: "LEP-tuh-sohm",
    partOfSpeech: "noun",
    definition: "A person with a slender, narrow body build.",
    example: "The leptosome tried on my winter coat and disappeared so completely we nearly hung him in the closet."
  },
  {
    word: "Lickspigot",
    pronunciation: "LIK-spig-ut",
    partOfSpeech: "noun",
    definition: "A contemptible, fawning person; a sycophant.",
    example: "The office lickspigot laughed at the boss's joke three seconds before the punchline."
  },
  {
    word: "Lucubration",
    pronunciation: "loo-kyoo-BRAY-shun",
    partOfSpeech: "noun",
    definition: "Study or writing done late at night.",
    example: "My midnight lucubration produced four good paragraphs and an online order for a waffle maker."
  },
  {
    word: "Maffick",
    pronunciation: "MAF-ik",
    partOfSpeech: "verb",
    definition: "To celebrate boisterously and publicly.",
    example: "When the team finally won, the fans mafficked so loudly that even the parking meters seemed excited."
  },
  {
    word: "Maledicent",
    pronunciation: "muh-LED-ih-sent",
    partOfSpeech: "adjective",
    definition: "Speaking ill of others; slanderous.",
    example: "The maledicent parrot had learned exactly three phrases, all apparently from a very unhappy marriage."
  },
  {
    word: "Mendaciloquent",
    pronunciation: "men-DAS-ih-loh-kwent",
    partOfSpeech: "adjective",
    definition: "Speaking falsely or habitually lying.",
    example: "The mendaciloquent fisherman described a trout large enough to require its own zip code."
  },
  {
    word: "Meretricious",
    pronunciation: "mer-ih-TRISH-us",
    partOfSpeech: "adjective",
    definition: "Flashy or attractive in a cheap, false, or insincere way.",
    example: "The meretricious watch looked expensive until the second hand fell off during dinner."
  },
  {
    word: "Gobemouche",
    pronunciation: "GOB-moosh",
    partOfSpeech: "noun",
    definition: "A gullible person who readily believes what they hear.",
    example: "The office gobemouche believed the copier needed to be fed a test page every Friday for good luck."
  },
  {
    word: "Illywhacker",
    pronunciation: "IL-ee-wak-er",
    partOfSpeech: "noun",
    definition: "A trickster, swindler, or confidence artist.",
    example: "The carnival illywhacker promised the game was easy, which explained why my ten-dollar stuffed bear cost forty-eight dollars."
  },
  {
    word: "Mugwump",
    pronunciation: "MUG-wump",
    partOfSpeech: "noun",
    definition: "A person who remains aloof or independent, especially in politics or disputes.",
    example: "During the family argument over pineapple on pizza, Dad became a mugwump and quietly ate both kinds."
  },
  {
    word: "Nescience",
    pronunciation: "NESH-ee-ents",
    partOfSpeech: "noun",
    definition: "Lack of knowledge or awareness.",
    example: "My nescience about plumbing lasted until water began coming through the light fixture."
  },
  {
    word: "Ninnyhammer",
    pronunciation: "NIN-ee-ham-er",
    partOfSpeech: "noun",
    definition: "A foolish or silly person.",
    example: "I felt like a ninnyhammer after searching for my glasses while wearing them."
  },
  {
    word: "Nocent",
    pronunciation: "NOH-sent",
    partOfSpeech: "adjective",
    definition: "Harmful, guilty, or responsible for wrongdoing.",
    example: "The dog looked innocent, but the shredded cushion and feather-covered muzzle were strongly nocent evidence."
  },
  {
    word: "Nugacity",
    pronunciation: "noo-GAS-ih-tee",
    partOfSpeech: "noun",
    definition: "Triviality, foolishness, or something of little importance.",
    example: "The meeting spent forty minutes on nugacity and three minutes on the actual budget."
  },
  {
    word: "Obambulate",
    pronunciation: "oh-BAM-byuh-layt",
    partOfSpeech: "verb",
    definition: "To walk about or wander.",
    example: "I obambulated through the hardware store for half an hour before admitting I had forgotten what I came for."
  },
  {
    word: "Obdormition",
    pronunciation: "ob-dor-MISH-un",
    partOfSpeech: "noun",
    definition: "Numbness in a limb caused by pressure; a limb 'falling asleep.'",
    example: "My leg's obdormition ended with a thousand imaginary needles and one very real coffee spill."
  },
  {
    word: "Oligopsony",
    pronunciation: "ol-ih-GOP-suh-nee",
    partOfSpeech: "noun",
    definition: "A market in which there are only a few buyers.",
    example: "The farmers faced an oligopsony, while I faced one grocery store and an avocado priced like jewelry."
  },
  {
    word: "Onychophagy",
    pronunciation: "on-ih-KOF-uh-jee",
    partOfSpeech: "noun",
    definition: "The habit of biting one's fingernails.",
    example: "His onychophagy intensified during the game until halftime left him with nothing useful to chew."
  },
  {
    word: "Oscitancy",
    pronunciation: "OS-ih-tan-see",
    partOfSpeech: "noun",
    definition: "Drowsiness or the act of yawning; inattentiveness.",
    example: "The lecture produced such oscitancy that the professor began taking the yawns personally."
  },
  {
    word: "Palpebrate",
    pronunciation: "PAL-puh-brayt",
    partOfSpeech: "verb",
    definition: "To blink or wink.",
    example: "I palpebrated repeatedly at the bill, but unfortunately the total remained the same."
  },
  {
    word: "Paraprosdokian",
    pronunciation: "par-uh-proz-DOH-kee-un",
    partOfSpeech: "noun",
    definition: "A figure of speech in which the ending unexpectedly changes the meaning of the beginning.",
    example: "He loved paraprosdokians: 'I had a wonderful evening, but this wasn't it.'"
  },
  {
    word: "Jobbernowl",
    pronunciation: "JOB-er-nowl",
    partOfSpeech: "noun",
    definition: "A foolish or stupid person.",
    example: "I felt like a complete jobbernowl after searching for my glasses while they were sitting on my face."
  },
  {
    word: "Lucubrate",
    pronunciation: "LOO-kyuh-brayt",
    partOfSpeech: "verb",
    definition: "To study or write late into the night.",
    example: "She lucubrated until 2 a.m., fueled by coffee and the increasingly unrealistic belief that tomorrow would be productive."
  },
  {
    word: "Peristeronic",
    pronunciation: "per-is-ter-ON-ik",
    partOfSpeech: "adjective",
    definition: "Relating to pigeons.",
    example: "The park bench developed a peristeronic problem the moment I opened a bag of chips."
  },
  {
    word: "Philoprogenitive",
    pronunciation: "fil-oh-proh-JEN-ih-tiv",
    partOfSpeech: "adjective",
    definition: "Having or expressing great affection for children or offspring.",
    example: "The philoprogenitive duck marched twelve ducklings across the road while traffic collectively accepted defeat."
  },
  {
    word: "Phosphenes",
    pronunciation: "FOS-feenz",
    partOfSpeech: "noun",
    definition: "Spots or flashes of light seen without light actually entering the eye.",
    example: "Rubbing my eyes produced phosphenes and the realization that adulthood has very cheap special effects."
  },
  {
    word: "Pilgarlic",
    pronunciation: "pil-GAR-lik",
    partOfSpeech: "noun",
    definition: "A bald-headed or pitiable person.",
    example: "After the barber's enthusiastic mistake, I emerged a temporary pilgarlic with a very breezy scalp."
  },
  {
    word: "Pluviophile",
    pronunciation: "PLOO-vee-oh-file",
    partOfSpeech: "noun",
    definition: "A person who loves rain or rainy weather.",
    example: "The pluviophile opened the curtains with delight while everyone else searched for the umbrella."
  },
  {
    word: "Numbles",
    pronunciation: "NUM-bulz",
    partOfSpeech: "noun",
    definition: "The edible internal organs of an animal, especially a deer.",
    example: "Grandpa called the numbles a delicacy, which did not improve their approval rating among the grandchildren."
  },
  {
    word: "Proditomania",
    pronunciation: "proh-dit-oh-MAY-nee-uh",
    partOfSpeech: "noun",
    definition: "The belief or fear that everyone around you is a traitor.",
    example: "Board-game night triggered proditomania when my own spouse traded properties with the enemy."
  },
  {
    word: "Prosopagnosia",
    pronunciation: "pros-oh-pag-NOH-zee-uh",
    partOfSpeech: "noun",
    definition: "Difficulty recognizing familiar faces.",
    example: "My mild social confusion felt like prosopagnosia when three coworkers arrived wearing identical holiday sweaters."
  },
  {
    word: "Pusillanimous",
    pronunciation: "pyoo-sih-LAN-ih-mus",
    partOfSpeech: "adjective",
    definition: "Showing a lack of courage; timid.",
    example: "My pusillanimous approach to the spider involved a bowl, a magazine, and calling someone from another room."
  },
  {
    word: "Quaquaversal",
    pronunciation: "kway-kwuh-VER-sul",
    partOfSpeech: "adjective",
    definition: "Sloping downward in every direction from a central point.",
    example: "The quaquaversal frosting slid off the cake so evenly that failure almost looked intentional."
  },
  {
    word: "Quincunx",
    pronunciation: "KWIN-kunks",
    partOfSpeech: "noun",
    definition: "An arrangement of five objects with four at the corners and one in the center.",
    example: "The cookies formed a perfect quincunx until I ate the middle one for geometric research."
  },
  {
    word: "Quocker",
    pronunciation: "KWOK-er",
    partOfSpeech: "noun",
    definition: "A person who makes a noise like a duck; an odd or foolish person.",
    example: "The office quocker discovered one convincing duck impression and refused to retire it."
  },
  {
    word: "Ramekin",
    pronunciation: "RAM-ih-kin",
    partOfSpeech: "noun",
    definition: "A small dish used for baking or serving individual portions.",
    example: "The waiter called it a ramekin; I called it a suspiciously tiny container for macaroni and cheese."
  },
  {
    word: "Ratoon",
    pronunciation: "ruh-TOON",
    partOfSpeech: "noun",
    definition: "A new shoot growing from the base or roots of a harvested plant.",
    example: "The stubborn ratoon returned after mowing, proving the plant had a stronger five-year plan than I did."
  },
  {
    word: "Rhabarbarate",
    pronunciation: "ruh-BAR-buh-rayt",
    partOfSpeech: "verb",
    definition: "To make a low indistinct murmuring sound, like a crowd.",
    example: "The audience rhabarbarated while the microphone failed and the speaker tapped it with increasing optimism."
  },
  {
    word: "Opsigamy",
    pronunciation: "op-SIG-uh-mee",
    partOfSpeech: "noun",
    definition: "Marriage late in life.",
    example: "Their opsigamy proved romance has no expiration date, although both agreed the wedding registry did not need another toaster."
  },
  {
    word: "Roorback",
    pronunciation: "ROOR-bak",
    partOfSpeech: "noun",
    definition: "A false or defamatory story spread for political purposes.",
    example: "The neighborhood roorback claimed the new bakery was secretly replacing butter with mashed potatoes; sales increased anyway."
  },
  {
    word: "Salmagundi",
    pronunciation: "sal-muh-GUN-dee",
    partOfSpeech: "noun",
    definition: "A miscellaneous mixture or collection of things.",
    example: "Dinner became a salmagundi of leftovers after nobody could agree what counted as a complete meal."
  },
  {
    word: "Sciamachy",
    pronunciation: "sy-AM-uh-kee",
    partOfSpeech: "noun",
    definition: "A fight with an imaginary enemy; argument against a phantom opponent.",
    example: "My shower sciamachy produced a devastating rebuttal to an argument nobody had actually made."
  },
  {
    word: "Sesquipedalian",
    pronunciation: "ses-kwih-puh-DAY-lee-un",
    partOfSpeech: "adjective",
    definition: "Given to using long words; characterized by long words.",
    example: "His sesquipedalian apology took so long that we forgot what he had done."
  },
  {
    word: "Shivviness",
    pronunciation: "SHIV-ee-ness",
    partOfSpeech: "noun",
    definition: "The uncomfortable feeling of wearing new underwear.",
    example: "My shivviness made the first hour in the new suit considerably less dignified than the photos suggest."
  },
  {
    word: "Skeuomorph",
    pronunciation: "SKYOO-uh-morf",
    partOfSpeech: "noun",
    definition: "A design feature that imitates the appearance of an older, familiar object.",
    example: "The fake stitching on the calendar app is a skeuomorph reminding us that software once wanted to dress like stationery."
  },
  {
    word: "Quagswag",
    pronunciation: "KWAG-swag",
    partOfSpeech: "verb",
    definition: "To shake or move back and forth.",
    example: "The overloaded washing machine quagswagged across the laundry room like it had somewhere important to be."
  },
  {
    word: "Smellfungus",
    pronunciation: "SMEL-fung-us",
    partOfSpeech: "noun",
    definition: "A habitual faultfinder or gloomy complainer.",
    example: "The vacation smellfungus disliked the beach because it was sandy, the ocean because it was wet, and lunch because it arrived."
  },
  {
    word: "Snickersnee",
    pronunciation: "SNIK-er-snee",
    partOfSpeech: "noun",
    definition: "A large knife; historically, a fight with knives.",
    example: "The chef called it a snickersnee, which made chopping onions sound unnecessarily adventurous."
  },
  {
    word: "Sphallolalia",
    pronunciation: "sfal-oh-LAY-lee-uh",
    partOfSpeech: "noun",
    definition: "Flirtatious talk that leads nowhere or is misleading.",
    example: "His sphallolalia promised moonlight dinners but somehow never survived past 'we should hang out sometime.'"
  },
  {
    word: "Steatopygous",
    pronunciation: "stee-at-oh-PY-gus",
    partOfSpeech: "adjective",
    definition: "Having prominent buttocks.",
    example: "The steatopygous cartoon bear required a surprisingly wide chair at the animation studio."
  },
  {
    word: "Struthious",
    pronunciation: "STROO-thee-us",
    partOfSpeech: "adjective",
    definition: "Relating to or resembling an ostrich.",
    example: "His struthious approach to bad news consisted of ignoring every email marked 'urgent.'"
  },
  {
    word: "Tatterdemalion",
    pronunciation: "tat-er-dee-MAY-lee-un",
    partOfSpeech: "noun",
    definition: "A person dressed in ragged or shabby clothes.",
    example: "After painting the garage, I looked like a tatterdemalion who had lost a fight with a bucket of beige."
  },
  {
    word: "Thalassophile",
    pronunciation: "thuh-LAS-oh-file",
    partOfSpeech: "noun",
    definition: "A person who loves the sea.",
    example: "The thalassophile booked an ocean-view room and spent most of the vacation staring happily at water."
  },
  {
    word: "Tintinnabulation",
    pronunciation: "tin-tin-ab-yuh-LAY-shun",
    partOfSpeech: "noun",
    definition: "A ringing or tinkling sound, especially of bells.",
    example: "The cat's collar produced enough tintinnabulation at 3 a.m. to suggest a tiny parade was crossing the bedroom."
  },
  {
    word: "Rakefire",
    pronunciation: "RAYK-fire",
    partOfSpeech: "noun",
    definition: "A guest who stays so late that the host must rake the fire to keep it going.",
    example: "By midnight, our rakefire was still telling vacation stories while we silently began putting the chairs on the tables."
  },
  {
    word: "Ulotrichous",
    pronunciation: "yoo-LOT-rih-kus",
    partOfSpeech: "adjective",
    definition: "Having tightly curled or woolly hair.",
    example: "Humidity made my hair so ulotrichous that it entered the room several seconds before I did."
  },
  {
    word: "Umbriferous",
    pronunciation: "um-BRIF-er-us",
    partOfSpeech: "adjective",
    definition: "Providing or bearing shade.",
    example: "We claimed the most umbriferous tree in the park and defended it like beachfront property."
  },
  {
    word: "Vilipend",
    pronunciation: "VIL-ih-pend",
    partOfSpeech: "verb",
    definition: "To regard or treat as worthless or contemptible.",
    example: "Do not vilipend the junk drawer; one day that mystery screw will become critically important."
  },
  {
    word: "Widdershins",
    pronunciation: "WID-er-shinz",
    partOfSpeech: "adverb",
    definition: "In a counterclockwise direction.",
    example: "I turned the lid widdershins and opened the jar, which sounded far more magical than 'lefty-loosey.'"
  },
  {
    word: "Winklepicker",
    pronunciation: "WINK-ul-pik-er",
    partOfSpeech: "noun",
    definition: "A shoe or boot with a very long pointed toe.",
    example: "His winklepickers entered the elevator a full second before the rest of him."
  },
  {
    word: "Woofits",
    pronunciation: "WOO-fits",
    partOfSpeech: "noun",
    definition: "A feeling of unwellness or depression, especially after excess.",
    example: "Sunday morning brought a severe case of the woofits and a solemn promise never to order the extra-spicy wings again."
  },
  {
    word: "Xenodochy",
    pronunciation: "zen-OD-uh-kee",
    partOfSpeech: "noun",
    definition: "Hospitality or kindness toward strangers.",
    example: "Our host's xenodochy included fresh towels, homemade pie, and a Wi-Fi password printed in fourteen-point type."
  },
  {
    word: "Yclept",
    pronunciation: "ee-KLEPT",
    partOfSpeech: "adjective",
    definition: "Named or called.",
    example: "A sandwich yclept 'The Inferno' should have been enough warning, but apparently I enjoy learning through pain."
  },
  {
    word: "Zarf",
    pronunciation: "ZARF",
    partOfSpeech: "noun",
    definition: "A holder or sleeve for a cup without a handle.",
    example: "I forgot the zarf and spent the next five minutes passing my coffee from hand to hand like a tiny furnace."
  },
  {
    word: "Verjuice",
    pronunciation: "VER-joos",
    partOfSpeech: "noun",
    definition: "A sour juice made from unripe grapes or other acidic fruit and used in cooking.",
    example: "The chef added verjuice to the sauce; I tasted it straight and discovered why nobody serves it by the glass."
  },
  {
    word: "Abecedarian",
    pronunciation: "ay-bee-see-DAIR-ee-un",
    partOfSpeech: "noun",
    definition: "A beginner learning the alphabet or basic elements of a subject.",
    example: "As an abecedarian gardener, I planted six herbs and confidently identified two of them."
  },
  {
    word: "Aegrotat",
    pronunciation: "EE-groh-tat",
    partOfSpeech: "noun",
    definition: "A certificate excusing a student from an examination because of illness.",
    example: "My teenage self would have regarded an aegrotat as the golden ticket of academic paperwork."
  },
  {
    word: "Agastopia",
    pronunciation: "ag-uh-STOH-pee-uh",
    partOfSpeech: "noun",
    definition: "Admiration or fascination with a particular part of someone's body.",
    example: "His agastopia for dimples made every toothpaste commercial unexpectedly compelling."
  },
  {
    word: "Agerasia",
    pronunciation: "aj-er-AY-zee-uh",
    partOfSpeech: "noun",
    definition: "The quality of appearing younger than one's age.",
    example: "Her agerasia was impressive until she revealed that the secret was excellent lighting and refusing to discuss birthdays."
  },
  {
    word: "Ailurophile",
    pronunciation: "eye-LOOR-oh-file",
    partOfSpeech: "noun",
    definition: "A person who loves cats.",
    example: "The ailurophile went to the shelter for 'just a look' and came home needing three new litter boxes."
  },
  {
    word: "Altiloquent",
    pronunciation: "al-TIL-oh-kwent",
    partOfSpeech: "adjective",
    definition: "Speaking in a lofty, pompous, or grand style.",
    example: "The altiloquent waiter described ketchup as 'a tomato reduction,' and somehow I paid extra for it."
  },
  {
    word: "Anemophilous",
    pronunciation: "an-uh-MOF-ih-lus",
    partOfSpeech: "adjective",
    definition: "Pollinated by wind.",
    example: "The anemophilous trees began spring reproduction, and my sinuses filed an immediate objection."
  },
  {
    word: "Anfractuous",
    pronunciation: "an-FRAK-choo-us",
    partOfSpeech: "adjective",
    definition: "Full of twists and turns; winding.",
    example: "The anfractuous road was scenic, beautiful, and a terrible place to discover the child gets carsick."
  },
  {
    word: "Apricate",
    pronunciation: "AP-rih-kayt",
    partOfSpeech: "verb",
    definition: "To bask in the sun.",
    example: "The cat apricated in the window with the smug confidence of someone who has never paid a heating bill."
  },
  {
    word: "Borborygmic",
    pronunciation: "bor-buh-RIG-mik",
    partOfSpeech: "adjective",
    definition: "Relating to stomach rumbling.",
    example: "The silence before lunch became awkwardly borborygmic when my stomach contributed percussion."
  },
  {
    word: "Cacodemomania",
    pronunciation: "kak-oh-dee-moh-MAY-nee-uh",
    partOfSpeech: "noun",
    definition: "The delusion that one is possessed by an evil spirit.",
    example: "My laptop's behavior suggested cacodemomania, though the technician insisted it was just thirty-seven browser tabs."
  },
  {
    word: "Cenosillicaphobia",
    pronunciation: "sen-oh-sil-ih-kuh-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "A humorous supposed fear of an empty glass.",
    example: "At the reunion, Uncle Dave displayed acute cenosillicaphobia and kept his lemonade under constant supervision."
  },
  {
    word: "Chionophile",
    pronunciation: "KY-oh-noh-file",
    partOfSpeech: "noun",
    definition: "A person or organism that thrives in or loves snow.",
    example: "The chionophile saw twelve inches in the forecast and reacted the way normal people react to winning concert tickets."
  },
  {
    word: "Chrematophobia",
    pronunciation: "kreh-mat-oh-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "An abnormal fear of money or spending it.",
    example: "His chrematophobia vanished mysteriously whenever someone else offered to pay."
  },
  {
    word: "Dromomania",
    pronunciation: "droh-moh-MAY-nee-uh",
    partOfSpeech: "noun",
    definition: "An uncontrollable urge to wander or travel.",
    example: "Her dromomania turned a quick weekend getaway into a spreadsheet containing seventeen possible airports."
  },
  {
    word: "Epeolatry",
    pronunciation: "ep-ee-OL-uh-tree",
    partOfSpeech: "noun",
    definition: "The worship or intense admiration of words.",
    example: "Word of the Day may cause mild epeolatry, but at least it takes up less shelf space than collecting encyclopedias."
  },
  {
    word: "Ergasiomania",
    pronunciation: "er-gay-see-oh-MAY-nee-uh",
    partOfSpeech: "noun",
    definition: "An excessive desire to work; workaholism.",
    example: "His ergasiomania was so severe that he answered emails during the surprise party thrown to make him stop answering emails."
  },
  {
    word: "Facinorous",
    pronunciation: "fuh-SIN-er-us",
    partOfSpeech: "adjective",
    definition: "Extremely wicked or villainous.",
    example: "Whoever microwaved fish in the office kitchen committed a facinorous act against lunchtime civilization."
  },
  {
    word: "Famelicose",
    pronunciation: "fuh-MEL-ih-kohs",
    partOfSpeech: "adjective",
    definition: "Constantly or ravenously hungry.",
    example: "The famelicose teenager treated a fully stocked refrigerator as a light appetizer."
  },
  {
    word: "Gongorism",
    pronunciation: "GON-guh-riz-um",
    partOfSpeech: "noun",
    definition: "An elaborate, ornate, and affected style of writing or speech.",
    example: "The restaurant menu's gongorism described fries as 'golden batons of hand-cut potato.'"
  },
  {
    word: "Gulosity",
    pronunciation: "gyoo-LOSS-ih-tee",
    partOfSpeech: "noun",
    definition: "Excessive appetite or gluttony.",
    example: "My gulosity convinced me the appetizer sampler was technically a single appetizer."
  },
  {
    word: "Hippocras",
    pronunciation: "HIP-uh-kras",
    partOfSpeech: "noun",
    definition: "A spiced wine drink popular in medieval Europe.",
    example: "We served hippocras at the costume party and immediately learned that medieval people were serious about cinnamon."
  },
  {
    word: "Hylomania",
    pronunciation: "hy-loh-MAY-nee-uh",
    partOfSpeech: "noun",
    definition: "An excessive tendency toward materialism or acquiring possessions.",
    example: "My hylomania is limited mostly to kitchen gadgets that promise to solve problems I did not previously have."
  },
  {
    word: "Iatrophobia",
    pronunciation: "eye-at-roh-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "An abnormal fear of doctors or medical care.",
    example: "My iatrophobia improves dramatically when the appointment ends with 'everything looks fine.'"
  },
  {
    word: "Jumentous",
    pronunciation: "joo-MEN-tus",
    partOfSpeech: "adjective",
    definition: "Smelling like a horse or stable.",
    example: "After mowing in August heat, I returned home distinctly jumentous and was greeted from a safe distance."
  },
  {
    word: "Kalon",
    pronunciation: "KAL-on",
    partOfSpeech: "noun",
    definition: "Ideal beauty that is more than merely physical; beauty of moral worth.",
    example: "Her kalon was evident when she returned the lost wallet before noticing it contained concert tickets."
  },
  {
    word: "Lachanophobia",
    pronunciation: "lak-an-oh-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "An abnormal fear of vegetables.",
    example: "The child's sudden lachanophobia appeared precisely when broccoli arrived and vanished when dessert did."
  },
  {
    word: "Myrmecophilous",
    pronunciation: "mer-muh-KOF-ih-lus",
    partOfSpeech: "adjective",
    definition: "Living in association with or attracted to ants.",
    example: "The picnic became accidentally myrmecophilous after someone dropped an entire cupcake beside the blanket."
  },
  {
    word: "Nebbish",
    pronunciation: "NEB-ish",
    partOfSpeech: "noun",
    definition: "A timid, ineffectual, or insignificant person.",
    example: "The office nebbish finally complained about the broken chair, then apologized to the chair."
  },
  {
    word: "Nychthemeron",
    pronunciation: "nik-THEM-er-on",
    partOfSpeech: "noun",
    definition: "A full period of twenty-four consecutive hours.",
    example: "The baby managed to sleep for four hours in an entire nychthemeron and considered this generous."
  },
  {
    word: "Obganiate",
    pronunciation: "ob-GAN-ee-ayt",
    partOfSpeech: "verb",
    definition: "To irritate by constantly repeating the same request or complaint.",
    example: "The children obganiated me about ice cream until resistance became more exhausting than surrender."
  },
  {
    word: "Oneirodynia",
    pronunciation: "oh-ny-roh-DIN-ee-uh",
    partOfSpeech: "noun",
    definition: "Disturbed or unpleasant dreaming; nightmares.",
    example: "My oneirodynia involved arriving at work without pants and somehow still being late for a meeting."
  },
  {
    word: "Ophryon",
    pronunciation: "OF-ree-on",
    partOfSpeech: "noun",
    definition: "The point between the eyebrows just above the bridge of the nose.",
    example: "I smacked my ophryon on the cupboard and briefly saw both stars and the value of closing cabinet doors."
  },
  {
    word: "Paralian",
    pronunciation: "puh-RAY-lee-un",
    partOfSpeech: "noun",
    definition: "A person who lives by or near the sea.",
    example: "The paralian considered our inland lake 'cute,' which nearly ended the friendship."
  },
  {
    word: "Pentheraphobia",
    pronunciation: "pen-ther-uh-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "An abnormal fear or dislike of one's mother-in-law.",
    example: "His alleged pentheraphobia disappeared whenever his mother-in-law arrived carrying homemade pie."
  },
  {
    word: "Philocalist",
    pronunciation: "fil-OK-uh-list",
    partOfSpeech: "noun",
    definition: "A lover of beauty or beautiful things.",
    example: "The philocalist spent twenty minutes arranging flowers and thirty seconds hiding the junk mail behind them."
  },
  {
    word: "Pogonophobia",
    pronunciation: "poh-gon-oh-FOH-bee-uh",
    partOfSpeech: "noun",
    definition: "An abnormal fear of beards.",
    example: "The mall Santa triggered unexpected pogonophobia in a toddler who had been enthusiastic until the beard moved."
  },
  {
    word: "Qualtagh",
    pronunciation: "KWAL-tahg",
    partOfSpeech: "noun",
    definition: "The first person one meets after leaving home, especially on New Year's Day.",
    example: "My New Year's qualtagh was the neighbor taking out trash in slippers, which felt appropriately realistic."
  },
  {
    word: "Xenial",
    pronunciation: "ZEE-nee-ul",
    partOfSpeech: "adjective",
    definition: "Hospitable or friendly toward guests or strangers.",
    example: "Our xenial host offered snacks, slippers, and the Wi-Fi password before we had even taken off our coats."
  },
  {
    word: "Recumbentibus",
    pronunciation: "ree-kum-BEN-tih-bus",
    partOfSpeech: "noun",
    definition: "A knockout blow or decisive argument.",
    example: "Her recumbentibus in the thermostat debate was simply showing everyone the electric bill."
  },
  {
    word: "Rhopalic",
    pronunciation: "roh-PAL-ik",
    partOfSpeech: "adjective",
    definition: "Having each successive word or unit longer than the one before.",
    example: "My rhopalic grocery reminder grew from 'eggs' to 'please remember the extra-large dishwasher tablets.'"
  },
  {
    word: "Scaramouch",
    pronunciation: "SKAIR-uh-moosh",
    partOfSpeech: "noun",
    definition: "A boastful but cowardly person; a stock comic rogue.",
    example: "The playground scaramouch bragged about climbing the tallest slide, then requested an adult escort down."
  },
  {
    word: "Scripturient",
    pronunciation: "SKRIP-choor-ee-unt",
    partOfSpeech: "adjective",
    definition: "Having a strong desire to write.",
    example: "I became scripturient at midnight, which is why my best ideas live in notes titled things like 'sandwich business???'"
  },
  {
    word: "Solivagant",
    pronunciation: "soh-LIV-uh-gunt",
    partOfSpeech: "adjective",
    definition: "Wandering alone.",
    example: "The solivagant traveler enjoyed the quiet until realizing nobody else could take the photo."
  },
  {
    word: "Soporose",
    pronunciation: "SOP-uh-rohs",
    partOfSpeech: "adjective",
    definition: "Sleepy or drowsy.",
    example: "The warm conference room made everyone soporose enough to regard the fire drill as a refreshing activity."
  },
  {
    word: "Spuddle",
    pronunciation: "SPUD-ul",
    partOfSpeech: "verb",
    definition: "To work ineffectively or fuss about without accomplishing much.",
    example: "I spuddled in the garage all afternoon and proudly relocated the same box three times."
  },
  {
    word: "Squiz",
    pronunciation: "SKWIZ",
    partOfSpeech: "noun",
    definition: "A quick look or glance.",
    example: "Take a squiz at the instructions before we discover another creative use for the leftover bolts."
  },
  {
    word: "Stelify",
    pronunciation: "STEL-ih-fy",
    partOfSpeech: "verb",
    definition: "To turn into or place among the stars; to glorify as stellar.",
    example: "My grandmother stelified every drawing I made, including one that was clearly just a brown scribble."
  },
  {
    word: "Tergiversate",
    pronunciation: "ter-JIV-er-sayt",
    partOfSpeech: "verb",
    definition: "To evade, equivocate, or repeatedly change one's position.",
    example: "Asked who ate the cake, the children tergiversated until frosting evidence appeared on a cheek."
  },
  {
    word: "Throttlebottom",
    pronunciation: "THROT-ul-bot-um",
    partOfSpeech: "noun",
    definition: "A harmless, inept, or insignificant person in public office or authority.",
    example: "The committee's throttlebottom misplaced the agenda, forgot the vote, and still adjourned with impressive confidence."
  },
  {
    word: "Zizz",
    pronunciation: "ZIZ",
    partOfSpeech: "noun",
    definition: "A short sleep or nap.",
    example: "I planned a ten-minute zizz on the couch and woke up two hours later under a blanket with no idea what year it was."
  },
  {
    word: "Ultroneous",
    pronunciation: "ul-TROH-nee-us",
    partOfSpeech: "adjective",
    definition: "Done voluntarily or spontaneously.",
    example: "My ultroneous offer to wash the dishes shocked the family enough that they checked whether I needed money."
  },
  {
    word: "Vapulation",
    pronunciation: "vap-yuh-LAY-shun",
    partOfSpeech: "noun",
    definition: "A beating or flogging; a severe verbal attack.",
    example: "My fantasy football team received such vapulation that even the app's projected score seemed embarrassed."
  },
  {
    word: "Verbigerate",
    pronunciation: "ver-BIJ-er-ayt",
    partOfSpeech: "verb",
    definition: "To repeat the same word or phrase over and over.",
    example: "The toddler verbigerated 'why' until philosophy itself asked for a break."
  },
  {
    word: "Wamblecropt",
    pronunciation: "WOM-bul-kropt",
    partOfSpeech: "adjective",
    definition: "Sick at the stomach; nauseated.",
    example: "One spin on the carnival ride left me wamblecropt and deeply respectful of stationary benches."
  },
  {
    word: "Weltschmerz",
    pronunciation: "VELT-shmerts",
    partOfSpeech: "noun",
    definition: "Melancholy caused by the gap between how the world is and how one wishes it were.",
    example: "My Weltschmerz peaked when the 'easy-open' package required scissors, pliers, and emotional support."
  },
  {
    word: "Xanthodont",
    pronunciation: "ZAN-thuh-dont",
    partOfSpeech: "adjective",
    definition: "Having yellow teeth.",
    example: "The cartoon pirate's xanthodont grin suggested flossing was not part of life at sea."
  },
  {
    word: "Yonderly",
    pronunciation: "YON-der-lee",
    partOfSpeech: "adjective",
    definition: "Mentally or emotionally distant; absent-minded.",
    example: "I was so yonderly that I put the cereal in the refrigerator and spent ten minutes looking for my phone while holding it."
  },
  {
    word: "Zoilist",
    pronunciation: "ZOH-ih-list",
    partOfSpeech: "noun",
    definition: "A harsh or envious critic.",
    example: "The neighborhood zoilist reviewed the children's lemonade stand as though Michelin stars were at stake."
  },
  {
    word: "Abditory",
    pronunciation: "AB-dih-tor-ee",
    partOfSpeech: "noun",
    definition: "A hiding place or concealed storage space.",
    example: "My secret snack abditory remained secure until the children learned to read."
  },
  {
    word: "Advesperate",
    pronunciation: "ad-VES-per-ayt",
    partOfSpeech: "verb",
    definition: "To become evening or grow dark.",
    example: "As the sky advesperated, the mosquitoes clocked in for the night shift."
  },
  {
    word: "Fopdoodle",
    pronunciation: "FOP-doo-dul",
    partOfSpeech: "noun",
    definition: "A foolish or insignificant person.",
    example: "The fopdoodle spent twenty minutes explaining how to load the dishwasher, then put the wooden cutting board on the bottom rack."
  },
  {
    word: "Aposiopesis",
    pronunciation: "ap-oh-sy-oh-PEE-sis",
    partOfSpeech: "noun",
    definition: "A sudden breaking off in speech, as if unable or unwilling to continue.",
    example: "Mom's aposiopesis—'If you bring one more frog into this house, I swear...'—was more effective than a complete sentence."
  },
  {
    word: "Atrabilious",
    pronunciation: "at-ruh-BIL-ee-us",
    partOfSpeech: "adjective",
    definition: "Gloomy, irritable, or bad-tempered.",
    example: "The atrabilious cashier softened immediately when a toddler handed her a sticker."
  },
  {
    word: "Borborygm",
    pronunciation: "bor-buh-RIG-um",
    partOfSpeech: "noun",
    definition: "A rumbling noise from the stomach or intestines.",
    example: "My borborygm interrupted the meditation session with the confidence of a tuba solo."
  },
  {
    word: "Cacafuego",
    pronunciation: "kak-uh-FWAY-goh",
    partOfSpeech: "noun",
    definition: "A swaggering braggart or boastful person.",
    example: "The office cacafuego claimed he could fix any computer, then asked where the power button was."
  },
  {
    word: "Celerity",
    pronunciation: "suh-LAIR-ih-tee",
    partOfSpeech: "noun",
    definition: "Swiftness or speed.",
    example: "I moved with remarkable celerity when someone shouted that the ice-cream truck was leaving."
  },
  {
    word: "Chrysophilist",
    pronunciation: "kris-OF-ih-list",
    partOfSpeech: "noun",
    definition: "A lover of gold.",
    example: "The chrysophilist chose a phone case so shiny that nearby drivers could use it as a signal mirror."
  },
  {
    word: "Matutolypea",
    pronunciation: "mat-yoo-toh-LIP-ee-uh",
    partOfSpeech: "noun",
    definition: "A bad mood or irritability experienced in the morning.",
    example: "My matutolypea lasts exactly until the first sip of coffee, after which I become legally approachable."
  },
  {
    word: "Eutrapely",
    pronunciation: "yoo-TRAP-uh-lee",
    partOfSpeech: "noun",
    definition: "Pleasantness in conversation; witty and appropriate humor.",
    example: "Her eutrapely saved the awkward dinner by turning the burned roast into the evening's best joke."
  },
  {
    word: "Famelic",
    pronunciation: "fuh-MEL-ik",
    partOfSpeech: "adjective",
    definition: "Hungry; famished.",
    example: "By noon I was famelic enough to consider the emergency granola bar under the car seat."
  },
  {
    word: "Gorgonize",
    pronunciation: "GOR-guh-nyze",
    partOfSpeech: "verb",
    definition: "To petrify, stun, or overwhelm with a look.",
    example: "One gorgonizing glance from the teacher returned thirty noisy students to complete silence."
  },
  {
    word: "Hippocrepiform",
    pronunciation: "hip-oh-KREP-ih-form",
    partOfSpeech: "adjective",
    definition: "Shaped like a horseshoe.",
    example: "The baker called the pastry hippocrepiform; I called it conveniently shaped for holding extra icing."
  },
  {
    word: "Ignoscency",
    pronunciation: "ig-NOS-en-see",
    partOfSpeech: "noun",
    definition: "Forgiveness or pardon.",
    example: "I requested ignoscency after shrinking the sweater, but the evidence was now wearing the dog."
  },
  {
    word: "Jactitation",
    pronunciation: "jak-tih-TAY-shun",
    partOfSpeech: "noun",
    definition: "Restless tossing or bodily movement.",
    example: "My nighttime jactitation turned the fitted sheet into modern sculpture by morning."
  },
  {
    word: "Kakopygous",
    pronunciation: "kak-oh-PY-gus",
    partOfSpeech: "adjective",
    definition: "Having unattractive buttocks.",
    example: "The ancient sculptor was brutally honest enough to make even the villain kakopygous."
  },
  {
    word: "Lentiginous",
    pronunciation: "len-TIJ-ih-nus",
    partOfSpeech: "adjective",
    definition: "Freckled or marked with small spots.",
    example: "After summer vacation, my lentiginous nose looked like someone had sprinkled cinnamon across it."
  },
  {
    word: "Mucid",
    pronunciation: "MYOO-sid",
    partOfSpeech: "adjective",
    definition: "Moldy, musty, or slimy.",
    example: "The forgotten container in the back of the fridge had become so mucid that nobody volunteered to identify its original contents."
  },
  {
    word: "Nephelococcygia",
    pronunciation: "nef-uh-loh-kok-SIJ-ee-uh",
    partOfSpeech: "noun",
    definition: "Cloud-cuckoo-land; fanciful dreaming or an imaginary ideal place.",
    example: "My plan to retire at forty with a beach house and no bills currently resides in nephelococcygia."
  },
  {
    word: "Obnubilate",
    pronunciation: "ob-NOO-bih-layt",
    partOfSpeech: "verb",
    definition: "To cloud, obscure, or darken.",
    example: "The steam obnubilated the bathroom mirror just as I was deciding whether the haircut was a mistake."
  },
  {
    word: "Pauciloquent",
    pronunciation: "paw-SIL-oh-kwent",
    partOfSpeech: "adjective",
    definition: "Using few words; brief in speech.",
    example: "The pauciloquent mechanic examined the engine, said 'bad,' and somehow communicated everything I feared."
  },
  {
    word: "Quiddity",
    pronunciation: "KWID-ih-tee",
    partOfSpeech: "noun",
    definition: "The essential nature of a thing; also a subtle distinction or quibble.",
    example: "The quiddity of camping is apparently spending money to live temporarily without plumbing."
  },
  {
    word: "Kakidrosis",
    pronunciation: "kak-ih-DROH-sis",
    partOfSpeech: "noun",
    definition: "Unpleasant-smelling perspiration.",
    example: "After mowing the lawn in August, my kakidrosis entered the room several seconds before I did."
  },
  {
    word: "Sardoodledom",
    pronunciation: "sar-DOO-dul-dum",
    partOfSpeech: "noun",
    definition: "Drama that is mechanically contrived or excessively melodramatic.",
    example: "The soap opera reached peak sardoodledom when the missing twin returned during a wedding held in a hospital."
  },
  {
    word: "Snudge",
    pronunciation: "SNUJ",
    partOfSpeech: "verb",
    definition: "To move about in a miserly or furtive way; to lie snug and quiet.",
    example: "I snudged past the sleeping dog with the last cookie, but the wrapper betrayed me."
  },
  {
    word: "Tachyphagia",
    pronunciation: "tak-ih-FAY-jee-uh",
    partOfSpeech: "noun",
    definition: "Abnormally rapid eating.",
    example: "My tachyphagia at lunch was impressive until the hiccups demanded a rematch."
  },
  {
    word: "Ucalegon",
    pronunciation: "yoo-KAL-ih-gon",
    partOfSpeech: "noun",
    definition: "A neighbor whose house is on fire; by extension, a nearby danger.",
    example: "The smoke alarm made me check for an ucalegon before discovering the real threat was my own toast."
  },
  {
    word: "Vilipendency",
    pronunciation: "vil-ih-PEN-den-see",
    partOfSpeech: "noun",
    definition: "The act or habit of treating something with contempt.",
    example: "My vilipendency toward decorative pillows ended when I discovered they make excellent nap equipment."
  },
  {
    word: "Whiffler",
    pronunciation: "WIF-ler",
    partOfSpeech: "noun",
    definition: "A person who changes opinions or shifts direction frequently.",
    example: "The committee whiffler supported the plan, opposed it, and then praised the compromise he had voted against."
  },
  {
    word: "Xylophagous",
    pronunciation: "zy-LOF-uh-gus",
    partOfSpeech: "adjective",
    definition: "Feeding on or eating wood.",
    example: "The xylophagous termites treated our porch like an all-you-can-eat buffet."
  },
  {
    word: "Yestreen",
    pronunciation: "yes-TREEN",
    partOfSpeech: "noun/adverb",
    definition: "Last evening or last night.",
    example: "Yestreen I promised to go to bed early, then watched six videos about restoring antique toasters."
  },
  {
    word: "Zetetic",
    pronunciation: "zeh-TET-ik",
    partOfSpeech: "adjective",
    definition: "Proceeding by inquiry or investigation; skeptical and searching.",
    example: "My zetetic approach to the missing cookies involved crumbs, fingerprints, and one suspiciously quiet child."
  },
  {
    word: "Niddering",
    pronunciation: "NID-er-ing",
    partOfSpeech: "noun",
    definition: "A coward or contemptible person.",
    example: "The niddering volunteered everyone else to investigate the strange noise in the basement while he guarded the couch."
  },
  {
    word: "Brumous",
    pronunciation: "BROO-mus",
    partOfSpeech: "adjective",
    definition: "Foggy, misty, or wintry.",
    example: "The brumous morning made the neighborhood look mysterious until the garbage truck backed up with its usual enthusiasm."
  },
  {
    word: "Crapulence",
    pronunciation: "KRAP-yuh-lents",
    partOfSpeech: "noun",
    definition: "Sickness or discomfort caused by excessive eating or drinking.",
    example: "Holiday crapulence arrived right after I said, 'It's only one more slice of pie.'"
  },
  {
    word: "Deliquium",
    pronunciation: "dih-LIK-wee-um",
    partOfSpeech: "noun",
    definition: "A fainting fit or loss of consciousness; also a melting away.",
    example: "The price of the concert tickets nearly induced a deliquium before the service fees finished the job."
  },
  {
    word: "Ecdysiast",
    pronunciation: "ek-DIZ-ee-ast",
    partOfSpeech: "noun",
    definition: "A striptease performer.",
    example: "The crossword clue was 'ecdysiast,' which made Grandma's breakfast puzzle unexpectedly educational."
  },
  {
    word: "Flapdoodle",
    pronunciation: "FLAP-doo-dul",
    partOfSpeech: "noun",
    definition: "Nonsense; foolish talk.",
    example: "The salesman's promise that the gadget would 'change breakfast forever' was flapdoodle, but I bought it anyway."
  },
  {
    word: "Gobbemouche",
    pronunciation: "GOB-muh-moosh",
    partOfSpeech: "noun",
    definition: "A gullible person who believes everything they hear.",
    example: "The family gobbemouche forwarded a message claiming onions could charge a cell phone."
  },
  {
    word: "Heterophemize",
    pronunciation: "het-er-oh-FEE-myze",
    partOfSpeech: "verb",
    definition: "To say something different from what one intended to say.",
    example: "I heterophemized during the toast and congratulated the couple on their 'long and exhausting marriage.'"
  },
  {
    word: "Ipsedixitism",
    pronunciation: "ip-see-DIK-sih-tiz-um",
    partOfSpeech: "noun",
    definition: "The habit of making unsupported assertions simply on one's own authority.",
    example: "Dad's ipsedixitism peaked with 'because I said so,' still undefeated in household debate."
  },
  {
    word: "Jabbernowl",
    pronunciation: "JAB-er-nowl",
    partOfSpeech: "noun",
    definition: "A foolish or stupid person.",
    example: "I felt like a jabbernowl after spending ten minutes pushing a door clearly marked PULL."
  },
  {
    word: "Kleptoparasite",
    pronunciation: "klep-toh-PAR-uh-site",
    partOfSpeech: "noun",
    definition: "An animal that steals food or prey from another.",
    example: "My dog became a kleptoparasite the instant the toddler dropped half a grilled cheese."
  },
  {
    word: "Ludibrious",
    pronunciation: "loo-DIB-ree-us",
    partOfSpeech: "adjective",
    definition: "Mocking, scornful, or derisive.",
    example: "The cat's ludibrious expression suggested my attempt at assembling the bookshelf had not impressed her."
  },
  {
    word: "Mulligrubs",
    pronunciation: "MUL-ih-grubz",
    partOfSpeech: "noun",
    definition: "A fit of low spirits, sulkiness, or vague discomfort.",
    example: "I had the mulligrubs all afternoon until someone mentioned tacos, which remain an underfunded branch of medicine."
  },
];

module.exports = {
  jokes,
  facts,
  questions,
  riddles,
  dailyTips,
  quizzes,
  curiosityWeeks,
  curiosityPreview,
  wouldYouRather,
  wordOfTheDay
};
