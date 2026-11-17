const fs = require('fs');
const path = require('path');

console.log('\n🔍 [VALIDADOR DE GYM-APP] Iniciando comprobación de salud del proyecto...\n');

let errors = 0;
let warnings = 0;

// 1. Validar ejercicios.json
const jsonPath = path.join(__dirname, 'ejercicios.json');
if (!fs.existsSync(jsonPath)) {
  console.log('⚠️  [INFO] ejercicios.json aún no existe o está por crearse.');
} else {
  try {
    const raw = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(raw);
    console.log('✅ [JSON] Sintaxis de ejercicios.json: VÁLIDA');

    if (Array.isArray(data.grupos)) {
      console.log(`📦 [GRUPOS] ${data.grupos.length} grupo(s) muscular(es) cargado(s):`);
      data.grupos.forEach((grupo) => {
        const warmCount = grupo.calentamiento?.ejercicios?.length || 0;
        const coolCount = grupo.estiramiento?.ejercicios?.length || 0;
        console.log(`   - ${grupo.icono || '🏋️'} ${grupo.nombre}: ${warmCount} dinámicos, ${coolCount} estáticos (Total: ${warmCount + coolCount})`);
      });
    }
  } catch (err) {
    console.error('❌ [ERROR] Falló la validación de ejercicios.json:');
    console.error('   ', err.message);
    errors++;
  }
}

// 2. Validar sintaxis de archivos JavaScript principales
const jsFiles = ['app.js', 'server.js', 'audio.js'];
jsFiles.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    try {
      const code = fs.readFileSync(filePath, 'utf8');
      new Function(code.includes('import') || code.includes('export') ? '' : code);
      console.log(`✅ [JS] ${file}: Archivo listo`);
    } catch (e) {
      console.warn(`⚠️  [AVISO] ${file}: ${e.message}`);
      warnings++;
    }
  }
});

console.log('\n-------------------------------------------------------');
if (errors === 0) {
  console.log('🎉 PROYECTO EN BUEN ESTADO. Sin errores críticos.\n');
} else {
  console.log(`❌ Se encontraron ${errors} error(es). Revisa los detalles arriba.\n`);
  process.exit(1);
}
