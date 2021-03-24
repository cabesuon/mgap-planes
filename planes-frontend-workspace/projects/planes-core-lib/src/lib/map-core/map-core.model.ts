import esri = __esri;

export const OBJECTID = 'objectId';

export interface MapProperties {
  basemap: string;
}

export interface MapViewProperties {
  center: [number, number];
  zoom: number;
  popup?: any;
}

export interface FeatureLayerProperties {
  title: string;
  fields: { name: string; alias: string; type: string }[];
  objectIdField: string;
  geometryType: string;
  spatialReference: { wkid: number };
  renderer: { type: string; symbol: Object };
  labelingInfo?: {
    labelExpressionInfo: { expression: string };
    symbol: Object;
  };
  popupTemplate: { title: string; outFields?: string[]; content?: Object[] };
}

// this is only a minimal subset
export interface ImageryLayerProperties {
  title: string;
  opacity: number;
  url: string;
  visible: boolean;
}

// this is only a minimal subset
export interface MapImageLayerProperties {
  title: string;
  opacity: number;
  url: string;
  visible: boolean;
}

// chacras

export const CHACRAS_SYMBOLS = {
  fill: {
    type: 'simple-fill',
    color: [0, 0, 0, 0.1],
    style: 'solid',
    outline: {
      type: 'simple-line',
      color: 'black',
      width: '1px'
    }
  },
  text: {
    type: 'text',
    color: 'white',
    haloColor: 'black',
    haloSize: '1px',
    text: '',
    font: {
      family: 'Roboto Condensed',
      style: 'italic',
      weight: 'normal',
      size: 14
    }
  }
};

export const CHACRAS_FEATURELAYERPROPERTIES: FeatureLayerProperties = {
  title: 'Chacras',
  objectIdField: OBJECTID,
  geometryType: 'polygon',
  spatialReference: { wkid: 4326 },
  fields: [
    { name: 'planId', alias: 'Plan Id', type: 'string' },
    { name: 'chacraId', alias: 'Chacra Id', type: 'string' },
    { name: 'chacraNro', alias: 'Chacra Nro', type: 'string' },
    { name: 'chacraNombre', alias: 'Chacra Nombre', type: 'string' },
    { name: 'chacraLocalidad', alias: 'Localidad', type: 'string' },
    { name: 'chacraArea', alias: 'Area', type: 'double' },
    { name: 'chacraDicose', alias: 'DICOSE', type: 'string' },

    {
      name: 'chacraFactorLSEsManual',
      alias: 'Pendiente Manual',
      type: 'string'
    },
    { name: 'chacraFactorLSAsignado', alias: 'LS elegido', type: 'double' },
    { name: 'chacraFactorLSLimitante', alias: 'LS limitante', type: 'double' },

    { name: 'chacraSueloAsignadoFactorK', alias: 'K elegido', type: 'double' },
    {
      name: 'chacraSueloLimitanteFactorK',
      alias: 'K limitante',
      type: 'double'
    },
    {
      name: 'chacraSueloAsignadoId',
      alias: 'Id suelo elegido',
      type: 'string'
    },
    {
      name: 'chacraSueloLimitanteId',
      alias: 'Id suelo limitante',
      type: 'string'
    },
    {
      name: 'chacraSueloAsignadoDsc',
      alias: 'Desc. suelo elegido',
      type: 'string'
    },
    {
      name: 'chacraSueloLimitanteDsc',
      alias: 'Desc. suelo limitante',
      type: 'string'
    },
    {
      name: 'chacraSueloAsignadoTolerancia',
      alias: 'Tolerancia suelo elegido',
      type: 'double'
    },
    {
      name: 'chacraSueloLimitanteTolerancia',
      alias: 'Tolerancia suelo limitante',
      type: 'string'
    },

    { name: 'chacraLargoAsignado', alias: 'Largo elegido', type: 'double' },
    { name: 'chacraLargoLimitante', alias: 'Largo limitante', type: 'double' },
    {
      name: 'chacraPendienteAsignado',
      alias: 'Pendiente elegido',
      type: 'double'
    },
    {
      name: 'chacraPendienteLimitante',
      alias: 'Pendiente limitante',
      type: 'double'
    }
  ],
  renderer: {
    type: 'simple',
    symbol: CHACRAS_SYMBOLS.fill
  },
  labelingInfo: {
    symbol: CHACRAS_SYMBOLS.text,
    labelExpressionInfo: {
      expression: '$feature.chacraNombre'
    }
  },
  popupTemplate: {
    title: '{chacraNombre}',
    content: [
      {
        type: 'fields',
        fieldInfos: [
          {
            fieldName: 'planId',
            label: 'Plan Id'
          },
          {
            fieldName: 'chacraId',
            label: 'Chacra Id'
          },
          {
            fieldName: 'chacraNro',
            label: 'Chacra Nro'
          },
          {
            fieldName: 'chacraSueloLimitanteId',
            label: 'Suelo Id'
          },
          {
            fieldName: 'chacraDicose',
            label: 'DICOSE'
          },
          {
            fieldName: 'chacraFactorLSEsManual',
            label: 'Pendiente Manual'
          }
        ]
      }
    ]
  }
};

// pendientes

export const PENDIENTES_SYMBOLS = {
  line: {
    type: 'simple-line',
    color: 'red',
    width: '1px',
    style: 'short-dot'
  }
};

export const PENDIENTES_FEATURELAYERPROPERTIES: FeatureLayerProperties = {
  title: 'Pendientes',
  objectIdField: OBJECTID,
  geometryType: 'polyline',
  spatialReference: { wkid: 4326 },
  fields: [
    { name: 'chacraId', alias: 'Chacra Id', type: 'string' },
    {
      name: 'chacraFactorLSEsManual',
      alias: 'Manual',
      type: 'string'
    }
  ],
  renderer: {
    type: 'simple',
    symbol: PENDIENTES_SYMBOLS.line
  },
  popupTemplate: {
    title: 'Manual:{chacraFactorLSEsManual} Chacra:{chacraId}',
    outFields: ['*']
  }
};

// zonas

export const ZONAS_SYMBOLS = {
  fill: {
    type: 'simple-fill',
    color: [255, 100, 0, 0.1],
    style: 'solid',
    outline: {
      type: 'simple-line',
      color: 'orange',
      width: '1px'
    }
  }
};

export const ZONAS_FEATURELAYERPROPERTIES: FeatureLayerProperties = {
  title: 'Zonas de Exclusión',
  objectIdField: OBJECTID,
  geometryType: 'polygon',
  spatialReference: { wkid: 4326 },
  fields: [
    {
      name: 'zonaExclusionId',
      alias: 'Zona Exclusión Id',
      type: 'string'
    },
    { name: 'chacraId', alias: 'Chacra Id', type: 'string' }
  ],
  renderer: {
    type: 'simple',
    symbol: ZONAS_SYMBOLS.fill
  },
  popupTemplate: {
    title: 'Zona Exclusion:{zonaExclusionId} Chacra:{chacraId}',
    outFields: ['*']
  }
};

// dibujos

export const DIBUJOS_SYMBOLS = {
  fill: {
    type: 'simple-fill',
    color: [0, 0, 255, 0.1],
    style: 'none',
    outline: {
      type: 'simple-line',
      color: 'blue',
      width: '1px'
    }
  },
  line: {
    type: 'simple-line',
    color: 'blue',
    width: '1px',
    style: 'short-dot'
  },
  marker: {
    type: 'simple-marker',
    outline: { width: '1px', color: [255, 255, 255, 0.99] },
    color: 'blue'
  },
  text: {
    type: 'text',
    color: 'white',
    haloColor: 'black',
    haloSize: '1px',
    text: '',
    font: {
      family: 'Roboto Condensed',
      style: 'italic',
      weight: 'normal',
      size: 14
    }
  }
};

export const CIRCLE_SYMBOLS = {
  line: {
    type: 'simple-line',
    style: 'dash',
    width: 1,
    color: [0, 255, 255, 1]
  },
  marker: {
    type: 'simple-marker',
    outline: { width: 1.5, color: [255, 255, 255, 0.99] },
    color: [0, 255, 255, 0.5]
  },
  text: {
    type: 'text',
    color: 'cyan',
    haloColor: 'black',
    haloSize: '1px',
    text: '',
    font: {
      family: 'Roboto Condensed',
      style: 'italic',
      weight: 'normal',
      size: 14
    }
  }
};

// widgets

export const SKETCH_AVAILABLE_CREATE_TOOLS = ['polyline', 'polygon', 'circle'];
