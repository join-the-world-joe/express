class Header {
  constructor() {
    this.major = ""
    this.minor = ""
  }
  SetMajor(major) {
    this.major = major
  }
  GetMajor() {
    return this.major
  }
  SetMinor(minor) {
    this.minor = minor
  }
  GetMinor() {
    return this.minor
  }
  // ToJson() {
  //   var json = null
  //   try{
  //     json = JSON.stringify({"major":this._major, "minor":this._minor})
  //   }catch(e) {
  //     console.log('Header.ToJson failure, err: ', e)
  //   }
  //   finally {
  //     if (json == null) {
  //       return "{}"
  //     }
  //     return json
  //   }
  // }
  FromJson(json) {
    try {
      this.major = json.major
      this.minor = json.minor
    } catch(e) {
      console.log('Header.FromJson failure, err: ', e)
    } finally {
      return this
    }
  }
}

function CreateInstance() {
  return new Header()
}

module.exports = {
  CreateInstance
}