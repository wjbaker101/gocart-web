import { IResponseEntity } from '../../common/interface/IResponseEntity';

class ResponseEntity {

    public create = (result: any): IResponseEntity => {
        return {
            result,
            timestamp: Date.now(),
        }
    }
}

export default new ResponseEntity();
