const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const server = http.createServer(app);

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('home', {
		locals: {
			path: req.path,
			build: 'buildRecipe',
			search: 'recipeSearch',
			aboutus: 'aboutUs'
		},
		partials: {
			navbar: '/partials/navbar'
		}
	});
})

app.get('/buildRecipe', (req, res) => {
	res.render('build', {
		locals: {
			path: req.path,
			build: 'buildRecipe',
			search: 'recipeSearch',
			aboutus: 'aboutUs'
		},
		partials: {
			navbar: '/partials/navbar'
		}
	});

})

app.get('/recipeSearch', (req, res) => {
	res.render('search', {
		locals: {
			path: req.path,
			build: 'buildRecipe',
			search: 'recipeSearch',
			aboutus: 'aboutUs'
		},
		partials: {
			navbar: '/partials/navbar'
		}
	});
})

app.get('/aboutUs', (req, res) => {
	res.render('aboutus', {
		locals: {
			path: req.path,
			build: 'buildRecipe',
			search: 'recipeSearch',
			aboutus: 'aboutUs'
		},
		partials: {
			navbar: '/partials/navbar'
		}
	});
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
