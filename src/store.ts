import { createSlice, configureStore, createSelector, combineReducers } from '@reduxjs/toolkit';

type Recipe = {
    id: string;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    isFavorite: boolean;
    image?: string;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        error: null,
    },
    reducers: {
        signUp: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        signIn: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        signOut: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        authError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { signUp, signIn, signOut, authError } = authSlice.actions;

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [
            {
                id: 'i6I_-1jRvgFC5uDHhF3iy',
                title: 'Lasagna',
                description: 'A type of pasta, possibly one of the oldest types, made of very wide, flat sheets',
                ingredients: 'Wheat, ground meat, cheese',
                instructions: `Preheat oven to 375°F (190°C). 
                Cook lasagna noodles according to package instructions and set aside. 
                Brown ground beef/sausage with onion and garlic. 
                Drain excess grease.Add crushed tomatoes, tomato paste, basil, oregano, salt, and pepper to the meat. 
                Simmer for 10 minutes. Mix shredded mozzarella, grated Parmesan, and ricotta cheese in a separate bowl. 
                Layer meat sauce, noodles, and cheese mixture in a 9x13-inch baking dish, repeating until ingredients are used up. 
                Cover with foil and bake for 25 minutes. Remove foil and bake for another 10-15 minutes until cheese is melted and bubbly.`,
                isFavorite: true,
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Lasagne_-_stonesoup.jpg/1024px-Lasagne_-_stonesoup.jpg'
            },
            {
                id: 'hZefdfZJkNU8pFIuNLwX',
                title: 'Schnitzel',
                description: 'A thin slice of meat',
                ingredients: 'Meat',
                instructions: `Pound the meat thin. Set up a breading station with flour, beaten eggs, and breadcrumbs. 
                Coat the meat in flour, dip in beaten eggs, and coat with breadcrumbs. 
                Heat oil in a skillet. 
                Fry the breaded meat until golden brown and cooked through. Drain on paper towels.`,
                isFavorite: false,
                image: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG/1920px-Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG`
            }
        ] as Recipe[]
    },
    reducers: {
        addRecipe: (state, action: { payload: Recipe }) => {
            state.recipes.push(action.payload);
        },
        toggleRecipe: (state, action) => {
            const index = state.recipes.findIndex((recipe) => recipe.id === action.payload);
            state.recipes[index] = {
                ...state.recipes[index],
                isFavorite: !state.recipes[index].isFavorite
            };
        },
        editRecipe: (state, action) => {
            const index = state.recipes.findIndex((recipe) => recipe.id === action.payload.id);
            state.recipes[index] = {
                ...state.recipes[index],
                title: action.payload.title,
                description: action.payload.description,
                ingredients: action.payload.ingredients,
                instructions: action.payload.instructions,
                image: action.payload.image,
                isFavorite: action.payload.isFavorite
            };
        },
        removeRecipe: (state, action) => {
            state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
        }
    }
});

export const { addRecipe, toggleRecipe, editRecipe, removeRecipe } = recipesSlice.actions;

const selectSelf = (state: { recipes: Recipe[] }) => state;

export const selectRecipes = createSelector(
    selectSelf,
    (state) => state.recipes || []
);

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    recipes: recipesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default store;
