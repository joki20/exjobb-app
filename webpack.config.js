// Här används ES5 Syntax för att webpack inte stödjer ES2015
module.exports = {
    // Webpack behöver veta var den ska börja, och det blir din applikations "main"-fil. 
    //Den kollar på dina import-statements och samlar in allt som applikationen behöver för att köras...
    entry: "./App.tsx",
    output: {
        // ... och stoppar det I en output-fil, som vi definierar här.
        filename: "/build/bundle.js"
    },
    module: {
        loaders: [{
            // Detta är ett reguljärt uttryck som identifierar alla dina .js-filer
            test: /^(?!.*\.d\.tsx?$).*\.[tj]sx?$/g, 
            // Vi vill inte kolla i node_modules, så vi exkluderar den mappen.
            exclude: /node_modules/,
            // Vi lägger till vår babel-loader...
            loader: "babel",
            // ... och berättar för den vilka presets vi vill använda.
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
};


