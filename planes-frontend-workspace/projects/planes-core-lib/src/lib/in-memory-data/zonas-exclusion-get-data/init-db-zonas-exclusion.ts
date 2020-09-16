import { GetData } from '../get-data';
import {
  ZonaExclusionCore,
  createBaseGeomZonaExclusionCore,
  createBaseZonaExclusionCore
} from '../../zonas-exclusion-core/zonas-exclusion-core.model';

export class InitDbZonasExclusion implements GetData {
  getData(payload: any, db?: any): any {
    const zb = createBaseZonaExclusionCore();
    const zgb = createBaseGeomZonaExclusionCore();
    const D = 0.03;
    const initialDbZonasExclusion: ZonaExclusionCore[] = [
      // chacraId 1
      Object.assign({}, zb, {
        ZonaExclusionId: 1,
        ChacraId: 1,
        ZonaExclusionGeometria: JSON.stringify(zgb)
      }),
      // chacraId 2
      Object.assign({}, zb, {
        ZonaExclusionId: 2,
        ChacraId: 2,
        ZonaExclusionGeometria: JSON.stringify(
          Object.assign({}, zgb, {
            rings: [zgb.rings[0].map(v => [v[0] + D, v[1] + D])]
          })
        )
      }),
      // chacraId 3
      Object.assign({}, zb, {
        ZonaExclusionId: 3,
        ChacraId: 3,
        ZonaExclusionGeometria: JSON.stringify(
          Object.assign({}, zgb, {
            rings: [zgb.rings[0].map(v => [v[0] + 2 * D, v[1] + 2 * D])]
          })
        )
      })
    ];
    return initialDbZonasExclusion;
  }
}
