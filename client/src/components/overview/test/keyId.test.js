import keyId from '../../common/keyId';


global.IS_REACT_ACT_ENVIRONMENT = true

describe('KeyId Tests', () => {
  it('Should return a string', () => {
    const r = keyId()
    expect(r).not.toBe('undefined')
    expect(typeof(r)).toEqual('string');
  })
  it('Should return a 6 character string', () => {
    const r = keyId()
    expect(r.length).toEqual(6);
  })
  it('Should return a new string evertime it is called', () => {
    const r1 = keyId();
    const r2 = keyId();
    expect(r1).not.toEqual(r2);
  })
})
