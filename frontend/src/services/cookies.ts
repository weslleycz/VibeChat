import { Preferences } from "@capacitor/preferences";

export class Cookies {
  public async set(value: any, expirationDate: Date) {
    const valueJSON = JSON.stringify({
      value,
      expirationDate,
    });
    await Preferences.set({
      key: "token",
      value: valueJSON,
    });
  }

  public async get() {
    const { value } = await Preferences.get({ key: "token" });
    if (value) {
      const valueJSON = JSON.parse(value);
      const data = new Date(valueJSON.expirationDate);
      const dataAtual = new Date();
      if (data < dataAtual) {
        await Preferences.remove({ key: "token" });
        return null;
      } else {
        return valueJSON.value;
      }
    } else {
      return null;
    }
  }

  public async remove() {
    await Preferences.remove({ key: "token" });
  }
}
