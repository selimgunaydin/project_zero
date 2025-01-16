import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';


export async function validateReactCode(code: string): Promise<{ isValid: boolean; error?: string }> {
  try {
    // JSX'i destekleyen bir AST oluştur
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });


    let jsxDepth = 0;
    const jsxOpenElements: Array<{ name: string; loc: { line: number; column: number } }> = [];
    let hasJSXElement = false;

    traverse(ast, {

      JSXOpeningElement(path) {
        hasJSXElement = true;
        jsxDepth++;
        if (t.isJSXIdentifier(path.node.name)) {
          jsxOpenElements.push({
            name: path.node.name.name,
            loc: {
              line: path.node.loc?.start.line || 0,
              column: path.node.loc?.start.column || 0
            }
          });
        }
      },
      JSXClosingElement(path) {
        jsxDepth--;
        if (t.isJSXIdentifier(path.node.name)) {
          const elementName = path.node.name.name;
          const lastOpenElement = jsxOpenElements[jsxOpenElements.length - 1];
          
          if (!lastOpenElement) {
            throw new Error(`Fazladan kapanış etiketi: </${elementName}>`);
          }
          
          if (elementName === lastOpenElement.name) {
            jsxOpenElements.pop();
          } else {
            throw new Error(
              `Kapanış etiketi eşleşmiyor: satır ${lastOpenElement.loc.line}'de açılan <${lastOpenElement.name}> için ` +
              `satır ${path.node.loc?.start.line || 0}'de </${elementName}> bulundu`
            );
          }
        }
      },
      JSXElement: {
        exit(path) {
          // Her JSX elementi tamamlandığında, içindeki tüm elementlerin kapandığından emin ol
          if (path.node.openingElement && !path.node.closingElement) {
            const name = (path.node.openingElement.name as t.JSXIdentifier).name;
            const line = path.node.loc?.start.line || 0;
            throw new Error(`Self-closing olmayan element <${name}> (satır ${line}) için kapanış etiketi bulunamadı`);
          }
        }
      }
    });



    if (!hasJSXElement) {
      return { isValid: false, error: 'Bileşen en az bir JSX elementi içermeli' };
    }

    if (jsxDepth !== 0 || jsxOpenElements.length > 0) {
      const unclosedElements = jsxOpenElements
        .map(el => `<${el.name}> (satır ${el.loc.line})`)
        .join(', ');
      return { 
        isValid: false, 
        error: `Kapanmamış JSX elementleri bulundu: ${unclosedElements}` 
      };
    }

    return { isValid: true };
  } catch (error: any) {
    return { 
      isValid: false, 
      error: `Syntax hatası: ${error.message}` 
    };
  }
}