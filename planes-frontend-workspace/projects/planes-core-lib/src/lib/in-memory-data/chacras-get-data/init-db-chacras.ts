import { GetData } from '../get-data';
import {
  ChacraCore,
  createBaseChacraCore,
  createBaseGeomChacraCore,
  createBaseGeomPendienteChacraCore
} from '../../chacras-core/chacras-core.model';

export class InitDbChacras implements GetData {
  getData(payload: any, db?: any): any {
    const cgb = createBaseGeomChacraCore();
    const pgb = createBaseGeomPendienteChacraCore();
    const initialDbChacras: ChacraCore[] = [];
    const chacrasPlanId = ['1', '1', '2', '3', '3', '4', '4', '4', '1'];
    const D = 0.03;
    for (let i = 0; i < 9; i++) {
      initialDbChacras.push(
        createBaseChacraCore(
          `${i + 1}`,
          chacrasPlanId[i],
          JSON.stringify(
            Object.assign({}, cgb, {
              rings: [cgb.rings[0].map(v => [v[0] + i * D, v[1] + i * D])]
            })
          ),
          JSON.stringify(
            Object.assign({}, pgb, {
              paths: [pgb.paths[0].map(v => [v[0] + i * D, v[1] + i * D])]
            })
          ),
          JSON.stringify(
            Object.assign({}, pgb, {
              paths: [pgb.paths[0].map(v => [v[0] + i * D, v[1] + i * D])]
            })
          )
        )
      );
    }
    return initialDbChacras;
  }
}
