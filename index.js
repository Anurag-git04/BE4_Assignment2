const express = require('express')
const app = express()
app.use(express.json())


const Recipe = require('./models/recipe.models')

const connectdb = require('./db/connectdb')

connectdb()

const createRecipe = async(newRecipe) => {
    try{
        const recipe = new Recipe(newRecipe)
        const savedRecipe = await recipe.save()
        console.log(savedRecipe)
        return savedRecipe
    }catch(error){
        throw error
    }
}

app.post('/recipe', async(req,res)=>{
    try{
        const savedRecipe = await createRecipe(req.body)
        if(savedRecipe){
            res.status(200).json({message:"Recipe is Saved Successfully",savedRecipe})
        }else{
            res.status(404).json({message:"No Recipe"})
        }
    }catch(error){
        res.status(500).json({error:"Error while saving data"})
    }
})

const readAllRecipe = async()=>{
    try{
        const recipes = await Recipe.find()
        console.log(recipes)
        return recipes
    }catch(error){
        throw error
    }
}

app.get('/recipes',async(req,res)=>{
    try{
        const recipes = await readAllRecipe()
        if(recipes.length > 0){
            res.status(200).json({message:"All recipes are :",recipes})
        }else{
            res.status(404).json({message:"No Recipe Found"})
        }
    }catch(error){
        res.status(500).json({message:"Error while fetching recipes"})
    }
})

const readrecipebytitle = async(title)=>{
    try{
        const recipes = await Recipe.find({title:title})
        console.log(recipes)
        return recipes
    }catch(error){
        throw error
    }
}

app.get('/recipes/:title', async(req,res)=>{
    try{
        const recipes = await readrecipebytitle(req.params.title)
        if(recipes){
            res.status(200).json({message:"All recipes are :",recipes})
        }else{
            res.status(404).json({message:"No Recipe Found"})
        }
    }catch(error){
        res.status(500).json({message:"Error while fetching recipes"})
    }
})

const readrecipebyauthor = async(author)=>{
    try{
        const recipes = await Recipe.find({author:author})
        console.log(recipes)
        return recipes
    }catch(error){
        throw error
    }
}

app.get('/recipes/author/:author', async(req,res)=>{
    try{
        const recipes = await readrecipebyauthor(req.params.author)
        if(recipes){
            res.status(200).json({message:"All recipes are :",recipes})
        }else{
            res.status(404).json({message:"No Recipe Found"})
        }
    }catch(error){
        res.status(500).json({message:"Error while fetching recipes"})
    }
})

const readrecipebydificulty = async(level)=>{
    try{
        const recipes = await Recipe.find({difficulty:level})
        console.log(recipes)
        return recipes
    }catch(error){
        throw error
    }
}

app.get('/recipes/level/:level', async(req,res)=>{
    try{
        const recipes = await readrecipebydificulty(req.params.level)
        if(recipes){
            res.status(200).json({message:"All recipes are :",recipes})
        }else{
            res.status(404).json({message:"No Recipe Found"})
        }
    }catch(error){
        res.status(500).json({message:"Error while fetching recipes"})
    }
})

const readandupdatebyId = async(recipeId,parameter)=>{
    try{
        const updatedrecipe = await Recipe.findByIdAndUpdate(recipeId,parameter,{new:true})
        console.log(updatedrecipe)
        return updatedrecipe
    }catch(error){
        throw error
    }
}

app.post('/recipes/update/:recipeId', async(req,res)=>{
    try{
        const recipes = await readandupdatebyId(req.params.recipeId,req.body)
        if(recipes){
            res.status(200).json({message:"All recipes are updated :",recipes})
        }else{
            res.status(404).json({message:"No Recipe Found"})
        }
    }catch(error){
        res.status(500).json({message:"Error while fetching recipes"})
    }
})

const deleteById = async(recipeId)=>{
    try{
        const recipe = await Recipe.findByIdAndDelete(recipeId)
        console.log(recipe)
        return recipe
    }catch(error){
        throw error
    }
}

app.delete('/recipe/delete/:recipeId', async(req,res)=>{
    try{
        const recipes = await deleteById(req.params.recipeId)
        if(recipes){
            res.status(200).json({message:"Recipe is deleted succesfully :",recipes})
        }else{
            res.status(404).json({message:"No Recipe Found"})
        }
    }catch(error){
        res.status(500).json({message:"Error while fetching recipes"})
    }
})

const PORT = 3000
app.listen(PORT ,()=>{
    console.log("Server is running on port :", PORT)
})