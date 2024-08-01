#include "LexFloatClient.h"
#include "CallbackWrapper.h"
#include <string>
#include <locale>
#include <map>

using namespace ::std;

#ifdef _WIN32
#include <codecvt>
typedef wchar_t CHARTYPE;
typedef wstring STRING;
#else
typedef char CHARTYPE;
typedef string STRING;
#endif

const char *MISSING_ARGUMENTS = "Wrong number of arguments";
const char *INVALID_ARGUMENT_TYPE = "Invalid argument type";
const char *MISSING_PRODUCT_ID = "Product id not set";

STRING HostProductId;

map<STRING, CallbackWrapper*> LicenseCallbacks;

STRING toEncodedString(Napi::String input)
{
#ifdef _WIN32
    u16string s = input.Utf16Value();
    wstring_convert<codecvt_utf16<wchar_t, 0x10ffff, little_endian>,wchar_t> converter;
    return converter.from_bytes(reinterpret_cast<const char*> (&s[0]), reinterpret_cast<const char*> (&s[0] + s.size()));
#else
    return input;
#endif
}

void floatingLicenseCallback(uint32_t status)
{
    LicenseCallbacks[HostProductId]->status = status;
    LicenseCallbacks[HostProductId]->Queue();
}

Napi::Value setHostProductId(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    STRING arg0 = toEncodedString(info[0].As<Napi::String>());
    HostProductId = arg0;
    return Napi::Number::New(env, SetHostProductId(arg0.c_str()));
}

Napi::Value setHostUrl(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    STRING arg0 = toEncodedString(info[0].As<Napi::String>());
    return Napi::Number::New(env, SetHostUrl(arg0.c_str()));
}

Napi::Value setFloatingLicenseCallback(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsFunction())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    Napi::Function callback = info[0].As<Napi::Function>();
    if(HostProductId.empty())
    {
        Napi::Error::New(env, MISSING_PRODUCT_ID).ThrowAsJavaScriptException();
        return env.Null();
    }
    LicenseCallbacks[HostProductId] = new CallbackWrapper(callback);
    LicenseCallbacks[HostProductId]->SuppressDestruct();
    return Napi::Number::New(env, SetFloatingLicenseCallback(floatingLicenseCallback));
}

Napi::Value setFloatingClientMetadata(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 2)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[1].IsString())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    STRING arg0 = toEncodedString(info[0].As<Napi::String>());
    STRING arg1 = toEncodedString(info[1].As<Napi::String>());
    return Napi::Number::New(env, SetFloatingClientMetadata(arg0.c_str(), arg1.c_str()));
}

Napi::Value getHostProductVersionName(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsTypedArray())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    Napi::Uint8Array array = info[0].As<Napi::Uint8Array>();
    size_t length = array.ElementLength();
    CHARTYPE *arg0 = reinterpret_cast<CHARTYPE *>(array.ArrayBuffer().Data());
    return Napi::Number::New(env, GetHostProductVersionName(arg0, length));
}

Napi::Value getHostProductVersionDisplayName(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsTypedArray())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    Napi::Uint8Array array = info[0].As<Napi::Uint8Array>();
    size_t length = array.ElementLength();
    CHARTYPE *arg0 = reinterpret_cast<CHARTYPE *>(array.ArrayBuffer().Data());
    return Napi::Number::New(env, GetHostProductVersionDisplayName(arg0, length));
}

Napi::Value getHostProductVersionFeatureFlag(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();
    if (info.Length() < 3)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[1].IsTypedArray())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[2].IsTypedArray())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    STRING arg0 = toEncodedString(info[0].As<Napi::String>());
    Napi::Uint32Array array1 = info[1].As<Napi::Uint32Array>();
    uint32_t *arg1 = reinterpret_cast<uint32_t *>(array1.ArrayBuffer().Data());
    Napi::Uint8Array array2 = info[2].As<Napi::Uint8Array>();
    CHARTYPE *arg2 = reinterpret_cast<CHARTYPE *>(array2.ArrayBuffer().Data());
    size_t length = array2.ElementLength();
    return Napi::Number::New(env, GetHostProductVersionFeatureFlag(arg0.c_str(), arg1, arg2, length));
}

Napi::Value getHostLicenseMetadata(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 2)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[1].IsTypedArray())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    STRING arg0 = toEncodedString(info[0].As<Napi::String>());
    Napi::Uint8Array array = info[1].As<Napi::Uint8Array>();
    size_t length = array.ElementLength();
    CHARTYPE *arg1 = reinterpret_cast<CHARTYPE *>(array.ArrayBuffer().Data());
    return Napi::Number::New(env, GetHostLicenseMetadata(arg0.c_str(), arg1, length));
}

Napi::Value getHostLicenseMeterAttribute(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 4)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[1].IsTypedArray())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[2].IsTypedArray())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[3].IsTypedArray())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    STRING arg0 = toEncodedString(info[0].As<Napi::String>());
    Napi::Uint32Array array1 = info[1].As<Napi::Uint32Array>();
    uint32_t *arg1 = reinterpret_cast<uint32_t *>(array1.ArrayBuffer().Data());
    Napi::Uint32Array array2 = info[2].As<Napi::Uint32Array>();
    uint32_t *arg2 = reinterpret_cast<uint32_t *>(array2.ArrayBuffer().Data());
    Napi::Uint32Array array3 = info[3].As<Napi::Uint32Array>();
    uint32_t *arg3 = reinterpret_cast<uint32_t *>(array3.ArrayBuffer().Data());
    return Napi::Number::New(env, GetHostLicenseMeterAttribute(arg0.c_str(), arg1, arg2, arg3));
}

Napi::Value getHostLicenseExpiryDate(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsTypedArray())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    Napi::Uint32Array array = info[0].As<Napi::Uint32Array>();
    uint32_t *arg0 = reinterpret_cast<uint32_t *>(array.ArrayBuffer().Data());
    return Napi::Number::New(env, GetHostLicenseExpiryDate(arg0));
}

Napi::Value getFloatingClientMeterAttributeUses(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 2)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[1].IsTypedArray())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    STRING arg0 = toEncodedString(info[0].As<Napi::String>());
    Napi::Uint32Array array = info[1].As<Napi::Uint32Array>();
    uint32_t *arg1 = reinterpret_cast<uint32_t *>(array.ArrayBuffer().Data());
    return Napi::Number::New(env, GetFloatingClientMeterAttributeUses(arg0.c_str(), arg1));
}

Napi::Value getFloatingClientMetadata(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 2)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[1].IsTypedArray())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    STRING arg0 = toEncodedString(info[0].As<Napi::String>());
    Napi::Uint8Array array = info[1].As<Napi::Uint8Array>();
    size_t length = array.ElementLength();
    CHARTYPE *arg1 = reinterpret_cast<CHARTYPE *>(array.ArrayBuffer().Data());
    return Napi::Number::New(env, GetFloatingClientMetadata(arg0.c_str(), arg1, length));
}

Napi::Value getFloatingClientLibraryVersion(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsTypedArray())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    Napi::Uint8Array array = info[0].As<Napi::Uint8Array>();
    size_t length = array.ElementLength();
    CHARTYPE *arg0 = reinterpret_cast<CHARTYPE *>(array.ArrayBuffer().Data());
    return Napi::Number::New(env, GetFloatingClientLibraryVersion(arg0, length));
}

Napi::Value requestFloatingLicense(const Napi::CallbackInfo &info)
{
    return Napi::Number::New(info.Env(), RequestFloatingLicense());
}

Napi::Value dropFloatingLicense(const Napi::CallbackInfo &info)
{
    return Napi::Number::New(info.Env(), DropFloatingLicense());
}

Napi::Value hasFloatingLicense(const Napi::CallbackInfo &info)
{
    return Napi::Number::New(info.Env(), HasFloatingLicense());
}

Napi::Value incrementFloatingClientMeterAttributeUses(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 2)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[1].IsNumber())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    STRING arg0 = toEncodedString(info[0].As<Napi::String>());
    uint32_t arg1 = info[1].As<Napi::Number>().Uint32Value();
    return Napi::Number::New(env, IncrementFloatingClientMeterAttributeUses(arg0.c_str(), arg1));
}

Napi::Value decrementFloatingClientMeterAttributeUses(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 2)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[1].IsNumber())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    STRING arg0 = toEncodedString(info[0].As<Napi::String>());
    uint32_t arg1 = info[1].As<Napi::Number>().Uint32Value();
    return Napi::Number::New(env, DecrementFloatingClientMeterAttributeUses(arg0.c_str(), arg1));
}

Napi::Value resetFloatingClientMeterAttributeUses(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, MISSING_ARGUMENTS).ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, INVALID_ARGUMENT_TYPE).ThrowAsJavaScriptException();
        return env.Null();
    }
    STRING arg0 = toEncodedString(info[0].As<Napi::String>());
    return Napi::Number::New(env, ResetFloatingClientMeterAttributeUses(arg0.c_str()));
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports["SetHostProductId"] = Napi::Function::New(env, setHostProductId);
    exports["SetHostUrl"] = Napi::Function::New(env, setHostUrl);
    exports["SetFloatingLicenseCallback"] = Napi::Function::New(env, setFloatingLicenseCallback);
    exports["SetFloatingClientMetadata"] = Napi::Function::New(env, setFloatingClientMetadata);
    exports["GetHostProductVersionName"] = Napi::Function::New(env, getHostProductVersionName);
    exports["GetHostProductVersionDisplayName"] = Napi::Function::New(env, getHostProductVersionDisplayName);
    exports["GetHostProductVersionFeatureFlag"] = Napi::Function::New(env, getHostProductVersionFeatureFlag);
    exports["GetHostLicenseMetadata"] = Napi::Function::New(env, getHostLicenseMetadata);
    exports["GetHostLicenseMeterAttribute"] = Napi::Function::New(env, getHostLicenseMeterAttribute);
    exports["GetHostLicenseExpiryDate"] = Napi::Function::New(env, getHostLicenseExpiryDate);
    exports["GetFloatingClientMeterAttributeUses"] = Napi::Function::New(env, getFloatingClientMeterAttributeUses);
    exports["GetFloatingClientMetadata"] = Napi::Function::New(env, getFloatingClientMetadata);
    exports["GetFloatingClientLibraryVersion"] = Napi::Function::New(env, getFloatingClientLibraryVersion);
    exports["RequestFloatingLicense"] = Napi::Function::New(env, requestFloatingLicense);
    exports["DropFloatingLicense"] = Napi::Function::New(env, dropFloatingLicense);
    exports["HasFloatingLicense"] = Napi::Function::New(env, hasFloatingLicense);
    exports["IncrementFloatingClientMeterAttributeUses"] = Napi::Function::New(env, incrementFloatingClientMeterAttributeUses);
    exports["DecrementFloatingClientMeterAttributeUses"] = Napi::Function::New(env, decrementFloatingClientMeterAttributeUses);
    exports["ResetFloatingClientMeterAttributeUses"] = Napi::Function::New(env, resetFloatingClientMeterAttributeUses);
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)