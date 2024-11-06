# If you want to pass data to all templates or views, you can create a custom middleware.

class globalContextMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Add global context variables to the request object
        request.global_context = {
            'site_name': 'My Awesome Site',
            'some_other_var': 'another_value',
        }
        response = self.get_response(request)
        return response


# context_processors.py

def global_context(request):
    return {
        'site_name': 'My Awesome Site',
        'some_other_var': 'another_value',
    }
