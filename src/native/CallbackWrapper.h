#include <mutex>
#include "napi.h"

using TSFN_t = Napi::ThreadSafeFunction;

std::mutex licenseCallbacksMutex;

inline auto callback = []( Napi::Env env, Napi::Function jsCallback, uint32_t* status ) {
    if(env != nullptr)
    {
        jsCallback.Call( {Napi::Number::New( env, *status )} );
    }
    delete status;
};