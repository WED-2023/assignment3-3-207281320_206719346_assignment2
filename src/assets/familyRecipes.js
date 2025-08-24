const familyRecipes = [
  {
    recipe_id: "family_001",
    title: "Grandma's Chicken Kiev",
    readyInMinutes: 60,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=300&fit=crop",
    popularity: 156,
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    owner: "mom",
    cookedAt: "shabat dinner",
    ingredients: [
      { amount: 0.33, name: "cup butter" },
      { amount: 0.5, name: "teaspoon ground black pepper" },
      { amount: 1, name: "teaspoon garlic powder" },
      { amount: 2, name: "pounds skinless, boneless chicken breast halves" },
      { amount: 2, name: "eggs" },
      { amount: 3, name: "tablespoons water" },
      { amount: 0.25, name: "teaspoon ground black pepper" },
      { amount: 0.5, name: "teaspoon garlic powder" },
      { amount: 1, name: "teaspoon dried dill weed" },
      { amount: 0.75, name: "cup all-purpose flour" },
      { amount: 0.75, name: "cup dry bread crumbs" },
      { amount: 2, name: "cups vegetable oil for frying" },
      { amount: 0.5, name: "lemon, sliced" },
      { amount: 0.25, name: "cup chopped fresh parsley" },
    ],
    analyzedInstructions: [
      {
        name: "Prepare Butter Mixture",
        steps: [
          {
            step: "Combine 1/3 cup butter, 1/2 teaspoon pepper and 1 teaspoon garlic powder. On a 6x6 inch piece of aluminum foil, spread mixture to about 2x3 inches. Place this mixture in the coldest section of your freezer and freeze until firm. This can be done ahead of time.",
          },
        ],
      },
      {
        name: "Prepare Chicken",
        steps: [
          {
            step: "Remove all fat from the chicken breast. If using whole chicken breasts, cut them in half. Place each chicken breast half between 2 pieces of waxed paper and using a mallet, pound carefully to about 1/4 inch thickness or less.",
          },
        ],
      },
      {
        name: "Stuff and Roll Chicken",
        steps: [
          {
            step: "When butter mixture is firm, remove from freezer and cut into 6 equal pieces. Place one piece of butter on each chicken breast. Fold in edges of chicken and then roll to encase the butter completely. Secure the chicken roll with small skewers or toothpicks.",
          },
        ],
      },
      {
        name: "Prepare Coating",
        steps: [
          {
            step: "In a mixing bowl, beat eggs with water until fluffy. In a separate bowl, mix together 1/4 teaspoon black pepper, 1/2 teaspoon garlic powder, dill weed and flour. Coat the chicken well with the seasoned flour. Dip the floured chicken in the egg mixture and then roll in the bread crumbs. Place coated chicken on a shallow tray and chill in refrigerator for 30 minutes.",
          },
        ],
      },
      {
        name: "Fry Chicken",
        steps: [
          {
            step: "In a medium size deep frying pan, heat vegetable oil to medium-high. Fry chicken for about 5 minutes then turn over and fry for 5 minutes longer or until the chicken is golden brown. To test for doneness, cut into one of the rolled chicken breasts to make sure it doesn't have a pink interior.",
          },
        ],
      },
      {
        name: "Serve",
        steps: [
          {
            step: "Serve immediately, garnished with a sliced lemon twist and a sprinkling of parsley.",
          },
        ],
      },
    ],
    summary:
      "A classic family recipe for Chicken Kiev featuring tender chicken breasts stuffed with herbed butter, breaded and fried to golden perfection. This elegant dish has been a family favorite for special occasions.",
  },
  {
    recipe_id: "family_002",
    title: "Grandma's Traditional Borscht",
    readyInMinutes: 60,
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=300&fit=crop",
    popularity: 89,
    vegan: false,
    vegetarian: true,
    glutenFree: true,
    owner: "mom",
    cookedAt: "shabat dinner",
    ingredients: [
      { amount: 6, name: "cups water" },
      { amount: 0.75, name: "tablespoon salt" },
      { amount: 0.5, name: "cup finely chopped carrots" },
      { amount: 0.25, name: "cup chopped green bell pepper, divided" },
      { amount: 0.5, name: "stalk celery, chopped" },
      { amount: 1, name: "medium beet" },
      { amount: 0.5, name: "cup canned peeled and diced tomatoes" },
      { amount: 3, name: "potatoes, quartered" },
      { amount: 0.33, name: "cup butter" },
      { amount: 0.5, name: "cup chopped onion" },
      { amount: 1.5, name: "cups canned tomatoes" },
      { amount: 3, name: "cups finely shredded cabbage, divided" },
      { amount: 0.25, name: "cup heavy cream" },
      { amount: 0.75, name: "cup diced potatoes" },
      { amount: 1, name: "tablespoon dried dill weed" },
      { amount: 0.25, name: "teaspoon ground black pepper to taste" },
      { amount: 1, name: "tablespoon butter" },
    ],
    analyzedInstructions: [
      {
        name: "Prepare Stock",
        steps: [
          {
            step: "Place water, salt, carrots, 1/2 of the bell pepper, celery, beet, tomatoes, and quartered potatoes in a large stock pot over high heat. Bring to a boil.",
          },
        ],
      },
      {
        name: "Make Tomato Sauce",
        steps: [
          {
            step: "Melt 1/3 cup butter in a separate skillet over medium heat. Saute onions in butter until tender, approximately 5 minutes. Stir in tomatoes, reduce heat to medium low, and simmer for 15 minutes. Remove 1/2 cup of sauce from skillet, and set aside. Stir half of the cabbage into the skillet with remaining sauce, and continue simmering 5 minutes more, or until tender.",
          },
        ],
      },
      {
        name: "Prepare Mashed Potatoes",
        steps: [
          {
            step: "Remove beet from boiling liquid and discard. Remove potatoes with a slotted spoon or tongs, and place in a bowl with remaining 1 tablespoon of butter and the cream. Mash together until smooth.",
          },
        ],
      },
      {
        name: "Combine Ingredients",
        steps: [
          {
            step: "Return the 1/2 cup of reserved onion-tomato sauce to the stock pot. Stir in diced potatoes, and simmer until just tender but still firm, approximately 5 minutes. Increase heat to a low boil, and stir in remaining cabbage, tomato sauce, and mashed potatoes. Reduce heat and simmer a few minutes more. Stir in remaining bell pepper, season with black pepper, and serve.",
          },
        ],
      },
    ],
    summary:
      "A hearty and traditional borscht soup recipe passed down through generations, featuring beets, cabbage, potatoes, and a rich tomato base. This comforting soup is perfect for cold winter days.",
  },
  {
    recipe_id: "family_003",
    title: "Grandma's Traditional Pirozhki",
    readyInMinutes: 120,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=300&fit=crop",
    popularity: 203,
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    owner: "mom",
    cookedAt: "shabat dinner",
    ingredients: [
      { amount: 1, name: "cup warm milk (110 degrees F/45 degrees C)" },
      { amount: 1, name: "(.25 ounce) package active dry yeast" },
      { amount: 3, name: "cups all-purpose flour, or as needed" },
      { amount: 1, name: "large egg, beaten" },
      { amount: 2, name: "tablespoons unsalted butter, melted" },
      { amount: 2, name: "teaspoons white sugar" },
      { amount: 1, name: "teaspoon kosher salt" },
      { amount: 0.5, name: "teaspoon oil, or as needed" },
      { amount: 1, name: "tablespoon olive oil" },
      { amount: 1, name: "tablespoon unsalted butter" },
      { amount: 2, name: "pounds ground beef" },
      { amount: 1, name: "large onion, finely diced" },
      { amount: 4, name: "cloves garlic, minced" },
      { amount: 2, name: "teaspoons kosher salt, or more to taste" },
      { amount: 0.5, name: "teaspoon freshly ground black pepper" },
      { amount: 2, name: "teaspoons dried dill" },
      { amount: 0.33, name: "cup chicken broth" },
      { amount: 0.25, name: "cup shredded sharp Cheddar cheese (Optional)" },
      { amount: 2, name: "tablespoons grated Parmesan cheese (Optional)" },
      { amount: 1, name: "vegetable oil for frying" },
    ],
    analyzedInstructions: [
      {
        name: "Prepare Dough",
        steps: [
          {
            step: "Combine 1 scant cup warm milk and yeast in the bowl of a stand mixer fitted with the dough hook. Let sit until foamy and bubbly, about 10 minutes. Add 3 scant cups flour (holding back a small amount in case dough gets too dry), 2 tablespoons melted butter, egg, sugar, and 1 teaspoon kosher salt. Knead in the mixer until dough is soft and supple.",
          },
        ],
      },
      {
        name: "Let Dough Rise",
        steps: [
          {
            step: "Turn dough out onto your work surface. Grease the bowl with about 1/2 teaspoon oil; place dough back in bowl. Cover bowl; let rise in a warm place until doubled in volume, about 1 hour.",
          },
        ],
      },
      {
        name: "Prepare Beef Filling",
        steps: [
          {
            step: "Meanwhile, heat 1 tablespoon olive oil and 1 tablespoon butter in a pot over medium-high heat. Add ground beef, onion, and garlic; season with 2 teaspoons kosher salt and black pepper. Cook, breaking apart beef with a wooden spoon, until no longer pink, 5 to 7 minutes; continue cooking, stirring occasionally, until evenly browned, about 2 minutes more. Remove from heat.",
          },
        ],
      },
      {
        name: "Complete Filling",
        steps: [
          {
            step: "Stir dill into beef mixture. Add chicken broth; stir, scraping up the browned bits from the bottom of the pot. Cool mixture for 10 minutes; stir in Cheddar cheese and Parmesan cheese. Cool filling completely.",
          },
        ],
      },
      {
        name: "Form Pirozhki",
        steps: [
          {
            step: "Transfer dough to a work surface; punch down dough to release air bubbles. Pinch off a piece of dough; form into a ball, then press into a disk. Lightly dust with flour; roll into a circle about 1/8-inch thick and 5- to 6-inches in diameter. Dampen edges of dough circle with water using your fingers.",
          },
        ],
      },
      {
        name: "Fill and Seal",
        steps: [
          {
            step: "Place dough circle in one hand; add about 3 tablespoons beef filling. Pinch dough edges together to seal. Place pirozhki on the work surface, seam-side up; pinch off any excess dough. Moisten center of seam with water. Fold 2 ends inward and flip pirozhki over, seam-side down; press down lightly.",
          },
        ],
      },
      {
        name: "Rest and Fry",
        steps: [
          {
            step: "Form remaining pirozhki using remaining dough and filling; rest until dough rises slightly, 15 to 20 minutes. Heat oil in a deep fryer or large saucepan to 375 degrees F (190 degrees C). Fry pirozhki in batches, seam-sides down, until golden brown, about 90 seconds. Flip and fry until browned on the other side, about 90 seconds more. Drain on paper towels. Cool for about 3 minutes.",
          },
        ],
      },
    ],
    summary:
      "Traditional Russian pirozhki featuring tender yeast dough filled with savory ground beef and aromatic herbs. These golden-fried dumplings have been a family favorite for generations, perfect for special occasions and family gatherings.",
  },
];

export default familyRecipes;
