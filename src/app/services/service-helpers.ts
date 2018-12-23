import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

export class ServiceHelpers {
  /**
   * Takes an observable and pipes it so that it's emitted value(s) will be mapped to the provided modelType
   * Returns the piped observable
   *
   * @param observable the observable to pipe
   * @param modelType the model type to map to
   */
  static pipeJsonToModel<T>(
    observable: Observable<T>,
    modelType
  ): Observable<T> {
    return observable.pipe(
      map(emitted => ServiceHelpers.convertJsonToModel(emitted, modelType))
    );
  }

  /**
   * Takes an emitted json object (or array objects) and maps it/them to the provided modelType
   * Returns the mapped object(s)
   *
   * @param emitted the json object (or array of objects) emmited by an observable
   * @param modelType the model type that the emitted object(s) should be mapped to
   */
  static convertJsonToModel(emitted, modelType) {
    if (!Array.isArray(emitted)) {
      return new modelType(emitted);
    } else {
      return emitted.map(item => {
        return new modelType(item);
      });
    }
  }
}
