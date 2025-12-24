#ifndef CALLBACK_WRAPPER_H
#define CALLBACK_WRAPPER_H
#include "napi.h"

struct CallbackData
{
    uint32_t status;

    CallbackData(uint32_t status) : status(status) {}
    virtual ~CallbackData() = default;
};

class CallbackWrapper
{
public:
    CallbackWrapper(Napi::Env env, Napi::Function callback)
    {
        tsfn = Napi::ThreadSafeFunction::New(
            env,
            callback,
            "LexFloatClientCallback",
            0,  // Unlimited queue
            1   // Initial thread count
        );
    }

    ~CallbackWrapper()
    {
        tsfn.Abort();
        tsfn.Release();
    }

    void Call(uint32_t status)
    {
        auto *data = new CallbackData(status);
        napi_status napiStatus = tsfn.NonBlockingCall(data, InvokeCallback);
        if (napiStatus != napi_ok)
        {
            delete data;
        }
    }

private:
    Napi::ThreadSafeFunction tsfn;

    static void InvokeCallback(Napi::Env env, Napi::Function jsCallback, CallbackData *data)
    {
        if (env != nullptr && jsCallback != nullptr && data != nullptr)
        {
            Napi::HandleScope scope(env);
            jsCallback.Call({Napi::Number::New(env, data->status)});
        }
        delete data;
    }
};
#endif
