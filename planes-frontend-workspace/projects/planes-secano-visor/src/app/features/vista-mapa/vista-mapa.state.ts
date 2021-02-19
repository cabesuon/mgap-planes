import { ChacraSecano } from 'planes-secano-lib';

export interface VistaMapaState {
  isLoading: boolean;
}

function formatValue(type: string, value: any): string {
  if (!value) {
    return '-';
  }
  switch (type) {
    case 'float':
      return parseFloat(value).toFixed(2);
    case 'integer':
      return parseInt(value).toString();
    default:
      return value.toString();
  }
}

export function chacraSecanoPopupTemplate(c: ChacraSecano) {
  let e = '';
  // if (c.errors && c.errors.length > 0) {
  //   e = `
  //   <div class="error">
  //     Errores
  //     <ul>
  //       ${c.errors.map(ee => '<li>'+ee.description+'</li>')}
  //     </ul>
  //   </div>`;
  // }
  let w = '';
  // if (c.warnings && c.warnings.length > 0) {
  //   w = `
  //   <div class="warning">
  //     Advertencias
  //     <ul>
  //       ${c.warnings.map(ww => '<li>'+ww.description+'</li>')}
  //     </ul>
  //   </div>`;
  // }
  return `
  <div class="secano-popup-template">

    <div>
      <h2>Administrativo</h2>
      <table>
        <tr><th>Localidad</th><td>${formatValue(
          'string',
          c.chacraLocalidad
        )}</td></tr>
        <tr><th>Área (ha)</th><td>${formatValue(
          'float',
          c.chacraArea
        )}</td></tr>
        <tr><th>DICOSE</th><td>${formatValue(
          'string',
          c.chacraDicose
        )}</td></tr>
      </table>
    </div>
    <div>
      <h2>Padrones</h2>
      <table class="popup-template-table">
        <tr><th>Departamento</th><th>Número</th><th>Área</th></tr>
      ${c.padrones
        .filter(p => p.padronFueSeleccionado)
        .map(
          p => `<tr>
          <td>${formatValue('string', p.departamentoNombre)}</td>
          <td>${formatValue('integer', p.padronId)}</td>
          <td>${formatValue('float', p.padronArea)}</td>
        </tr>`
        )
        .reduce((c: string, a: string) => (a += c), '')}
      </table>
    </div>
    <div>
      <h2>Suelo</h2>
      <table class="popup-template-table">
      <tr><th>Descripción</th><td>${formatValue(
        'string',
        c.chacraSueloAsignadoDsc
      )}</td></tr>
      <tr><th>K</th><td>${formatValue(
        'float',
        c.chacraSueloAsignadoFactorK
      )}</td></tr>
      <tr><th>T</th><td>${formatValue(
        'float',
        c.chacraSueloAsignadoTolerancia
      )}</td></tr>
      </table>
    </div>
    <div>
      <h2>Factores Limitantes</h2>
      <table class="popup-template-table">
      <tr><th></th><th>Elegido</th><th>Sugerido</th></tr>
      <tr>
        <th>A</th>
        <td>${formatValue('float', c.chacraFactorAAsignado)}</td>
        <td>${formatValue('float', c.chacraFactorALimitante)}</td>
      </tr>
      <tr>
        <th>R</th>
        <td>${formatValue('float', c.chacraFactorRAsignado)}</td>
        <td>${formatValue('float', c.chacraFactorRAutomatico)}</td>
      </tr>
      <tr>
        <th>K</th>
        <td>${formatValue('float', c.chacraSueloAsignadoFactorK)}</td>
        <td>${formatValue('float', c.chacraSueloLimitanteFactorK)}</td>
      </tr>
      <tr>
        <th>LS</th>
        <td>${formatValue('float', c.chacraFactorLSAsignado)}</td>
        <td>${formatValue('float', c.chacraFactorLSLimitante)}</td>
      </tr>
      <tr><th>P</th><td>${formatValue(
        'float',
        c.chacraFactorP
      )}</td><td></td></tr>
      <tr><th>C</th><td>${formatValue(
        'float',
        c.chacraFactorC
      )}</td><td></td></tr>
      <tr><th>L</th><td>${formatValue(
        'float',
        c.chacraFactorLAsignado
      )}</td><td></td></tr>
      <tr>
        <th>S</th>
        <td>${formatValue('float', c.chacraFactorSAsignado)}</td>
        <td>${formatValue('float', c.chacraFactorSLimitante)}</td></tr>
      <tr>
        <th>Largo (m)</th>
        <td>${formatValue('float', c.chacraLargoAsignado)}</td>
        <td>${formatValue('float', c.chacraLargoLimitante)}</td>
      </tr>
      <tr>
        <th>Pendiente (%)</th>
        <td>${formatValue('float', c.chacraPendienteAsignado)}</td>
        <td>${formatValue('float', c.chacraPendienteLimitante)}</td>
      </tr>
      </table>
    </div>
    ${e}
    ${w}
  </div>
  `;
}
