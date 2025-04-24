
        import Polygon from './core/shape/Polygon.js'; // Caminho para o arquivo da sua classe Polygon
        import Vector from '../../util/vector.js'; // Certifique-se de que o Vector está importado corretamente

        const canvas = document.querySelector('canvas');
        canvas.width = innerWidth
        canvas.height = innerHeight
        
        const context = canvas.getContext('2d');

        // Criando um polígono
        const polygon = new Polygon(100, 3); // Polígono com 5 lados e raio 100
        
        polygon.centerX = canvas.width / 2
        polygon.centerY = canvas.height / 2
        
        polygon.rotationAngle = 90

        // Testando o método getDrawingPath
        const path = polygon.getDrawingPath();

        // Desenhando o polígono
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.stroke(path);
        
        // Adicionando logs
        console.log('Local Corners:', polygon.getLocalCorners());
        console.log('Rotated Corners:', polygon.getRotatedCorners());
        console.log('Global Corners:', polygon.getGlobalCorners());
        console.log('Global Edges:', polygon.getGlobalEdges());
        console.log('Global Axes:', polygon.getGlobalAxes());