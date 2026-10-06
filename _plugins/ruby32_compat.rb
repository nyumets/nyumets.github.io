class Object
  unless method_defined?(:tainted?)
    def tainted?
      false
    end
  end
end

class String
  unless method_defined?(:tainted?)
    def tainted?
      false
    end
  end
end

